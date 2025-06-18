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
    <div className="space-y-6">
      {reports.map((report) => (
        <div
          key={report._id}
          className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          {/* Top: Title & Badges */}
          <div className="flex justify-between items-start flex-wrap">
            <div>
              <h4 className="text-2xl font-bold text-white">{report.title || 'Unnamed Report'}</h4>
            </div>

            <div className="flex items-center gap-3 mt-2 sm:mt-0 flex-wrap">
              {/* Severity badge */}
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                {report.severity || 'N/A'}
              </span>

              {/* Status badge */}
              <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize
                ${
                  report.status === "submitted" ? "bg-blue-600 text-white" :
                  report.status === "under review" ? "bg-orange-600 text-white" :
                  report.status === "triage" ? "bg-yellow-300 text-black" :
                  report.status === "completed" ? "bg-green-500 text-white" :
                  report.status === "spam" ? "bg-gray-400 text-black" :
                  report.status === "rejected" ? "bg-red-500 text-white" :
                  "bg-gray-600 text-white"
                }`}
              >
                {report.status || "Unknown"}
              </span>
            </div>
          </div>

          {/* Middle: Description */}
          <p className="text-lg text-white font-medium mt-6 mb-4">
            {report.summary || 'No description provided.'}
          </p>

          {/* Bottom: Date + Button */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            <p className="text-sm text-zinc-400">
             Submitted: {new Date(report.createdAt).toLocaleDateString('en-GB')}
            </p>

            <CTAButton
              text="🔍 View Report"
              onClick={() => navigate(`/chat/${report?._id}`)}
            />
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
