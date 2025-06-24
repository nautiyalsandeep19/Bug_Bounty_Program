import { Button } from '@headlessui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import CTAButton from '../Common/Button/CTAButton'
import { useSelector } from 'react-redux'
import Loader from '../Common/Loader'

const HackerAllReports = () => {
  const { reportId } = useParams()
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const userType = useSelector((state) => state.auth.userType)
  useEffect(() => {
    const abortController = new AbortController()
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/reports/reportByHackerId',
          { withCredentials: true }
        )

        console.log('Fetched reports:', response.data)

        // Handle both single report and list of reports
        const fetchedReports = reportId
          ? Array.isArray(response.data.report)
            ? response.data.report
            : [response.data.report]
          : response.data.reports || []
        setReports(fetchedReports)
        setLoading(false)
      } catch (error) {
        if (error.name === 'CanceledError') return
        console.error(
          'Failed to fetch reports:',
          error.response?.status,
          error.message
        )
        setError('Failed to load reports. Please try again.')
        setLoading(false)
      }
    }

    fetchReports()
    return () => abortController.abort()
  }, [reportId])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        {error}
        <Button
          className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-full mx-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-6">📝 Hacker All Reports</h2>

      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-[#202128] p-6 rounded-xl border border-[#1e293b] hover:opacity-85 transition-colors duration-300"
            >
              {/* Top: Title & Program */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{report.title || 'Unnamed Report'}</h3>
                <div className='flex justify-between gap-3'>
              <span className={`text-sm  px-4 py-1 rounded-full
                   ${
    report.severity === "Low" ? "bg-blue-500" :
    report.severity === "Moderate" ? "bg-orange-800" :
    report.severity === "Critical" ? "bg-yellow-500 text-black" :
    report.severity === "High" ? "bg-green-500" :
    report.severity === "Informational" ? "bg-gray-500 text-black" :
    "bg-gray-700 text-black"
  }
                  `}>
                 {report.severity}
                 </span>


                <span className={`text-sm  text-blue-200 px-2 py-1 rounded `}>
                 {report.status.toUpperCase()}
                </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4">
                {report.summary || 'No description provided.'}
              </p>

              {/* Bottom: Date & Bounty */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Submitted: {new Date(report.createdAt).toLocaleDateString('en-GB')}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-green-400">$Bounty Amount</span>
                  <CTAButton
                    text="View Report"
                    onClick={() => navigate(`/chat/${report?._id}`)}
                    className="px-4 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">No reports found.</p>
      )}
    </div>
  )
}

export default HackerAllReports