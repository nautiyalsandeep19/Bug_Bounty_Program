import { Button } from '@headlessui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import CTAButton from '../Common/Button/CTAButton'
import { useSelector } from 'react-redux'

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
    return <div className="text-center text-white">Loading...</div>
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
      <h2 className="text-2xl font-bold text-white mb-4">Hacker All Reports</h2>
      {reports.length > 0 ? (
        <div className="space-y-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-2 flex-wrap gap-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  📋 {report.title || 'Unnamed Report'}
                </h3>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-zinc-400 border px-2 py-1 rounded-lg">
                    Severity: {report.severity || 'N/A'}
                  </span>
                  <CTAButton
                    text="View Report"
                    onClick={() => navigate(`/${userType}/chat/${report?._id}`)}
                  />
                </div>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Vulnerability: {report.vulnerabilityType || 'Unknown'}
              </p>
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
