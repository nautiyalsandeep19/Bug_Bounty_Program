import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getAllPrograms, getPrivatePrograms } from '../Services/programsApi'
import ProgramCard from '../CompanyComponents/Programs/ProgramDetails/ProgramCard'
import { useSelector } from 'react-redux'
import Loader from '../Common/Loader'

const ProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('allPrograms')
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const token = useSelector((state) => state.auth.token)
  const userType = useSelector((state) => state.auth.userType)

  const fetchPrograms = async (type) => {
    setLoading(true)
    try {
      let data = null
      if (type === 'allPrograms') {
        data = await getAllPrograms()
        console.log('Data from all programs:  ', data)
      } else if (type === 'privatePrograms' && token) {
        data = await getPrivatePrograms()
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
        {token && userType === 'hacker' ? (
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
        ) : (
          ''
        )}
      </div>

      {/* Cards Grid */}
      {loading ? (
        <Loader />
      ) : programs.length === 0 ? (
        <div className="flex mx-auto justify-center items-center">
          No Program Assigned To You
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProgramsPage
