import { useEffect, useState } from 'react'
import { getAllPrograms } from '../Services/programsApi'
import CTAButton from '../Common/Button/CTAButton'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const DashboardProgram = () => {
  const [programData, setProgramData] = useState([])
  const [loading, setLoading] = useState(true)

  // const userType = useSelector((state) => state.auth.userType)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getAllPrograms()
        setProgramData(data)
        console.log('dada', data)
      } catch (error) {
        console.error('Failed to fetch programs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  if (loading) return <div className="text-white p-4">Loading...</div>

  return (
    <section className="h-full bg-[#111827] p-6">
      <div className="grid grid-cols-1 gap-6">
        {programData.slice(2).map((item, index) => (
          <div
            key={index}
            className="bg-[#1f2937] text-white p-6 rounded-xl shadow-md border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={item?.company?.image}
                  alt={item?.company?.name || 'Company'}
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-400">{item?.company?.name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-purple-200 text-purple-800 px-3 py-1 text-xs rounded-full">
                  invite-only
                </span>
                <span className="bg-green-200 text-green-800 px-3 py-1 text-xs rounded-full">
                  active
                </span>
              </div>
            </div>

            <p className="mt-4 text-gray-300 text-sm">
              focus on description {item.description}
            </p>

            <div className="flex flex-wrap justify-between items-center mt-4 text-sm text-gray-400 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-green-500">$</span>
                <span className="text-white font-medium">
                  {item.bountyRange.low} - {item.bountyRange.high}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>👥 Participants:</span>
                <span className="text-white font-medium">
                  {item.participants}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱ Avg Response:</span>
                <span className="text-white font-medium">
                  {item.avgTime} days
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Total Paid:{' '}
                {/* <span className="text-green-400 font-medium">
                  ${item.totalPaid || '89,000'}
                </span> */}
              </span>
              <CTAButton
                text="View Details"
                linkto={`/hacker/programs/${item._id}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DashboardProgram
