import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import '../Common/Editor/TiptapEditor.css'
import Loader from '../Common/Loader'
import { TriangleAlert } from 'lucide-react'

const ReportData = ({ reportId }) => {
  const [report, setReport] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const BASE_URL =
    import.meta.env.VITE_BACKEND_HOST_URL || 'http://localhost:8000'
  const userType = useSelector((state) => state.auth.userType)

  const statusOptions = [
    'submitted',
    'underreview',
    'triage',
    'completed',
    'rejected',
    'spam',
  ]

  const severityOptions = [
    'Critical',
    'High',
    'Moderate',
    'Low',
    'Informational',
  ]

  const fetchReportDetails = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('No authentication token found')
        return
      }

      const res = await axios.get(`${BASE_URL}/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      console.log('repdata', res)
      if (res.data.success) {
        setReport(res.data.report)
      } else {
        toast.error(res.data.message || 'Failed to load report')
      }
    } catch (error) {
      console.error('Error fetching report:', error)
      if (error.response?.status === 401) {
        toast.error('Please login again')
      } else {
        toast.error(error.response?.data?.message || 'Error loading report')
      }
    }
  }

  useEffect(() => {
    if (reportId) fetchReportDetails()
  }, [reportId])

  const handleStatusUpdate = async (newStatus) => {
    if (!reportId || !newStatus || isUpdating) return

    setIsUpdating(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${BASE_URL}/api/reports/updateStatus/${reportId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setReport((prev) => ({ ...prev, status: newStatus }))
      } else {
        toast(response.data.message, { icon: 'ℹ️' })
      }
    } catch (error) {
      console.error('Status update error:', error)
      toast.error(error.response?.data?.message || 'Failed to update status')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSeverityUpdate = async (newSeverity) => {
    if (!reportId || !newSeverity || isUpdating) return

    setIsUpdating(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${BASE_URL}/api/reports/updateSeverity/${reportId}`,
        { severity: newSeverity },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setReport((prev) => ({ ...prev, severity: newSeverity }))
      } else {
        toast(response.data.message || 'Update failed', { icon: 'ℹ️' })
      }
    } catch (error) {
      console.error('Severity update error:', error)
      toast.error(error.response?.data?.message || 'Failed to update severity')
    } finally {
      setIsUpdating(false)
    }
  }

  if (!report) {
    return <Loader />
  }

  const severityColors = {
    Critical: 'bg-red-600',
    High: 'bg-red-500',
    Moderate: 'bg-yellow-500',
    Low: 'bg-blue-500',
    Informational: 'bg-gray-500',
  }

  const statusColors = {
    submitted: 'bg-blue-100 text-blue-800',
    underreview: 'bg-purple-100 text-purple-800',
    triage: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    spam: 'bg-gray-100 text-gray-800',
  }

  const statusDisplayNames = {
    submitted: 'Submitted',
    underreview: 'Under Review',
    triage: 'Triage',
    completed: 'Completed',
    rejected: 'Rejected',
    spam: 'Spam',
  }

  return (
    // <div className="p-6 text-primaryText pb-4 border-4 ">
    //   <div className="flex justify-between items-start">
    //     <div>
    //       <h1 className="text-3xl font-bold mb-2">
    //         {report.programId.title}
    //       </h1>

    //       <h2>{report.title} </h2>

    //       {/* Severity Select */}
    //       {userType === 'triager' ? (
    //         <div className="relative group">
    //           <select
    //             value={report.severity}
    //             onChange={(e) => handleSeverityUpdate(e.target.value)}
    //             disabled={isUpdating}
    //             className={`px-3 py-1 rounded-full text-sm font-semibold ${
    //               severityColors[report.severity] || 'bg-gray-500'
    //             } appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ${
    //               isUpdating
    //                 ? 'opacity-70 cursor-not-allowed'
    //                 : 'hover:opacity-90'
    //             }`}
    //           >
    //             {severityOptions.map((sev) => (
    //               <option
    //                 key={sev}
    //                 value={sev}
    //                 className="bg-white text-gray-800"
    //               >
    //                 {sev}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //       ) : (
    //         <span
    //           className={`px-3 py-1 rounded-full text-sm font-semibold ${
    //             severityColors[report.severity] || 'bg-gray-500'
    //           }`}
    //         >
    //           {report.severity}
    //         </span>
    //       )}

    //       {/* Status Select */}
    //       {userType === 'triager' && (
    //         <div className="relative group">
    //           <select
    //             value={report.status}
    //             onChange={(e) => handleStatusUpdate(e.target.value)}
    //             disabled={isUpdating}
    //             className={`px-3 py-1 rounded-full text-sm font-semibold ${
    //               statusColors[report.status] || 'bg-gray-100 text-gray-800'
    //             } appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ${
    //               isUpdating
    //                 ? 'opacity-70 cursor-not-allowed'
    //                 : 'hover:opacity-90'
    //             }`}
    //           >
    //             {statusOptions.map((status) => (
    //               <option
    //                 key={status}
    //                 value={status}
    //                 className="bg-white text-secondaryText"
    //               >
    //                 {statusDisplayNames[status]}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //       )}
    //     </div>
    //     <div className="text-right">
    //       <p className="text-sm opacity-90">Submitted on</p>
    //       <p className="font-medium">
    //         {new Date(report.submitDate).toLocaleDateString('en-US', {
    //           year: 'numeric',
    //           month: 'long',
    //           day: 'numeric',
    //         })}
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className=" bg-primarybg py-8 px-4">
      <div className="w-full m-auto  rounded-xl shadow-md overflow-h reportIdden">
        {/* Header */}

        <div className="bg-[#1a1d22] text-white px-6 py-5 border-[0.5px] border-green-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 rounded-lg">
          {/* Left: Program & Report Titles */}
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {report?.programId?.title}
            </h1>
            <p className="text-gray-400 text-sm">
              {report?.title} • Report #{report._id?.slice(-4)}
            </p>
          </div>

          {/* Middle: Status + Severity */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Severity */}
            {userType === 'triager' ? (
              <select
                value={report.severity}
                onChange={(e) => handleSeverityUpdate(e.target.value)}
                disabled={isUpdating}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  severityColors[report.severity] || 'bg-gray-500'
                } text-white cursor-pointer transition ${
                  isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {severityOptions.map((sev) => (
                  <option key={sev} value={sev} className="text-black">
                    {sev}
                  </option>
                ))}
              </select>
            ) : (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  severityColors[report.severity] || 'bg-gray-500'
                }`}
              >
                {report.severity}
              </span>
            )}

            {/* Status */}
            {userType === 'triager' && (
              <select
                value={report.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                disabled={isUpdating}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  statusColors[report.status] || 'bg-gray-100 text-gray-800'
                } cursor-pointer transition ${
                  isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status} className="text-black">
                    {statusDisplayNames[status]}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Right: Date & Bounty */}
          <div className="text-right">
            <p className="text-sm text-gray-400">Submitted on</p>
            <p className="text-sm mb-1">
              {new Date(report.submitDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-green-500 font-bold text-lg">
              ${report.bountyAmount || '12,500'}
            </p>
          </div>
        </div>

        {/* Body */}
        {/* <div className="p-6 space-y-6 border-4">
          <div className="grreportId grreportId-cols-1 md:grreportId-cols-2 gap-4 text-primaryText ">
            <div>
              <h2 className="text-lg font-semibold mb-2">Technical Details</h2>
              <h2 className="text-secondaryText">
                Complete vulnerability report and proof of concept
              </h2>

              <div>
                <p>{report.summary}</p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-secondaryText">
                    Vulnerability Type:
                  </span>{' '}
                  {report.vulnerabilityType}
                </p>
                <p>
                  <span>Affected URL</span>
                  {report.vulnerableEndpoint}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Scope:</span>{' '}
                  {report.scope}
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  <span> Vulnarebility Impact{report.vulnerabilityImpact}</span>
                </p>
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Proof of Concept
              </h2>
              <div>{report.POC}</div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Summary
            </h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
              {report.summary}
            </p>
          </div>

          {report.vulnerabilityImpact && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Impact
              </h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {report.vulnerabilityImpact}
              </p>
            </div>
          )}

          <div className="text-black ">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Proof of Concept
            </h2>
            <div
              className="ProseMirror max-w-none bg-gray-50 p-4 mt-5 rounded-lg border border-gray-200"
              dangerouslySetInnerHTML={{ __html: report.POC }}
            />
          </div>

          <div className="grreportId grreportId-cols-1 md:grreportId-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p>
                <span className="font-medium">Created:</span>{' '}
                {new Date(report.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Last Updated:</span>{' '}
                {new Date(report.updatedAt).toLocaleString()}
              </p>
            </div>
            {report.tags && report.tags.length > 0 && (
              <div>
                <p className="font-medium">Tags:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {report.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div> */}

        <div className="bg-[#1a1d22] text-white p-6 rounded-lg space-y-8 shadow-md  border-[0.5px] border-green-500">
          {/* Title Section */}
          <div>
            <h2 className="text-2xl font-bold mb-1">Technical Details</h2>
            <p className="text-gray-400">
              Complete vulnerability report and proof of concept
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Description</h3>
              <p className="text-gray-300">{report.summary}</p>
            </div>

            {/* Vuln Type, CVSS, URL */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Vulnerability Type
                </h3>
                <span className="inline-block bg-[#2e3137] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {report.vulnerabilityType}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Affected URL</h3>
                <div className="bg-[#2e3137] text-white px-4 py-2 rounded text-sm font-mono">
                  {report.vulnerableEndpoint}
                </div>
              </div>
            </div>
          </div>

          {/* Impact */}
          {report.vulnerabilityImpact && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Impact Assessment</h3>
              <p className="text-gray-300 bg-[#2e3137] p-4 rounded-lg">
                {report.vulnerabilityImpact}
              </p>
            </div>
          )}

          {/* Proof of Concept */}
          {report.POC && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Proof of Concept</h3>
              <div
                className="ProseMirror max-w-none bg-black text-green-300 text-sm p-4 rounded-lg border border-gray-700"
                dangerouslySetInnerHTML={{ __html: report.POC }}
              />
            </div>
          )}

          {/* Dates & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
            <div>
              <p>
                <span className="font-medium text-white">Created:</span>{' '}
                {new Date(report.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-white">Last Updated:</span>{' '}
                {new Date(report.updatedAt).toLocaleString()}
              </p>
            </div>
            {report.tags && report.tags.length > 0 && (
              <div>
                <p className="font-medium text-white mb-1">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {report.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportData
