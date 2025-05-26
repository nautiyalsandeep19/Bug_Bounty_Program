import React, { useEffect, useState } from 'react'
import CTAButton from '../../Components/Button/CTAButton'
import Severity from './SeveritySelector'
import { createReport } from '../../Services/reportApi'

const Report = () => {
  const [ip, setIp] = useState('')

  const [scope, setScope] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [vulnerabilityType, setVulnerabilityType] = useState('')
  const [reportTitle, setReportTitle] = useState('')
  const [reportSummary, setReportSummary] = useState('')
  const [reportPOC, setReportPOC] = useState('')
  const [severityData, setSeverityData] = useState({
    baseScore: 0,
    severity: 'None',
  })

  const fetchIP = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      setIp(data.ip)
    } catch (err) {
      console.error('Failed to fetch IP:', err)
    }
  }

  const handleReportSubmission = async () => {
    const reportData = {
      scope,
      vulnerabilityEndpoint: endpoint,
      vulnerabilityType,
      title: reportTitle,
      reportSummary,
      reportPOC,
      ipAddress: ip,

      severity: severityData.severity,
    }
    console.log(reportData)

    await createReport(reportData)
    // resetForm()
  }

  const RequiredMark = () => <span className="text-red-500 ml-1">*</span>

  return (
    <section className="max-w-5xl w-full h-full mx-auto">
      <div className="w-full md:max-w-3xl mx-auto md:p-6 space-y-10 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">Submit Report</h1>

        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Select Your Scope
            <RequiredMark />
          </h2>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Choose scope --</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="api">API</option>
          </select>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Vulnerable Endpoint / Affected URL (Optional)
          </h2>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="https://example.com/endpoint"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Vulnerability Type
            <RequiredMark />
          </h2>
          <select
            value={vulnerabilityType}
            onChange={(e) => setVulnerabilityType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Choose vulnerability --</option>
            <option value="xss">Cross Site Scripting (XSS)</option>
            <option value="sqli">SQL Injection</option>
            <option value="rce">Remote Code Execution</option>
          </select>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Severity
            <RequiredMark />
          </h2>
          <Severity setSeverityData={setSeverityData} />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Report Details
            <RequiredMark />
          </h2>

          <input
            type="text"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Report Title"
            required
          />
          <input
            type="text"
            value={reportSummary}
            onChange={(e) => setReportSummary(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Report Summary"
            required
          />
          <textarea
            rows={5}
            value={reportPOC}
            onChange={(e) => setReportPOC(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Describe the impact of the vulnerability..."
            required
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              type="text"
              className="flex-1 border border-gray-300 p-2 rounded"
              placeholder="Your IP Address"
              value={ip}
              readOnly
            />
            <CTAButton onClick={fetchIP} text="Fetch IP" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Review and Submit
          </h2>
          <CTAButton text="Submit Report" onClick={handleReportSubmission} />
        </div>
      </div>
    </section>
  )
}

export default Report
