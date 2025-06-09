import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import CTAButton from '../Common/Button/CTAButton'

const TrigerReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/reports/allReports`, {
          withCredentials: true,
        })
        setReports(response.data?.reports || [])
      } catch (err) {
        setError('Failed to fetch reports')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [BASE_URL])

  if (loading) return <div>Loading Reports...</div>
  if (error) return <div>{error}</div>
  if (reports.length === 0) return <div>No Reports found</div>

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-4 border-b pb-2 text-sm text-gray-400 font-semibold">
        <div>Reported By</div>
        <div>Reported For</div>
        <div>Description</div>
        <div>Severity</div>
        <div>Status</div>
        <div>Reported At</div>
        <div>Open Chat</div>
      </div>

      {reports.map((report, index) => (
        <div
          key={index}
          className="grid grid-cols-7 gap-4 py-2 border-b items-center text-white text-sm"
        >
          <div className="flex items-center gap-2">
            <img
              src={report?.hackerId?.image}
              alt="hacker"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{report?.hackerId?.name || 'Unknown'}</span>
          </div>

          <div>{report?.programId?.title || 'Unknown Program'}</div>
          <div className="truncate">{report.summary}</div>
          <div>{report.severity}</div>
          <div>{report.status}</div>
          <div>{new Date(report?.submitDate).toISOString().slice(0, 10)}</div>

          <Link to={`/report/chat/${report?._id}`}>
            <CTAButton text="View Chat" />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default TrigerReports
