import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getAllPrograms, getPrivatePrograms } from '../Services/programsApi'
import ProgramCards from '../Components/Common/ProgramCards'

const ProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('allPrograms')
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPrograms = async (type) => {
    setLoading(true)
    try {
      let data = null
      if (type === 'allPrograms') {
        data = await getAllPrograms()
        console.log('Data from all programs: ', data)
      } else if (type === 'privatePrograms') {
        data = await getPrivatePrograms()
        console.log('Data from private programs: ', data)
      }

      if (data) {
        setPrograms(data)
      } else {
        setPrograms([])
      }
    } catch (err) {
      console.error('Error fetching programs:', err)
      toast.error('Failed to fetch programs')
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms(activeTab)
  }, [activeTab])

  const renderTag = (type) => {
    switch (type) {
      case 'Bug Bounty':
        return (
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
            Bug Bounty
          </span>
        )
      case 'Vulnerability Disclosure':
        return (
          <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
            Vulnerability Disclosure
          </span>
        )
      default:
        return (
          <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
            {type}
          </span>
        )
    }
  }

  console.log('ProgramDetails', programs)
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-semibold mb-2">Programs</h2>
      <p className="mb-6 text-sm text-gray-400">
        Discover opportunities in live programs and contribute to security
        initiatives.
      </p>

      {/* Tabs */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setActiveTab('allPrograms')}
          className={`pb-2 border-b-2 cursor-pointer ${
            activeTab === 'allPrograms'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent'
          }`}
        >
          Programs
        </button>
        <button
          onClick={() => setActiveTab('privatePrograms')}
          className={`pb-2 border-b-2 cursor-pointer ${
            activeTab === 'privatePrograms'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent'
          }`}
        >
          Private Programs
        </button>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program) => (
            <ProgramCards
              key={program._id}
              title={program.title}
              companyName={program.company?.name}
              companyImage={program.company?.image}
              bountyRange={program.bountyRange}
              type={program.type}
            />
          ))}
        </div>
      )}

      {/* <ProgramCards title={"Hello"} company={programs?.company} type={"BugBounty"}/> */}
    </div>
  )
}

export default ProgramsPage
