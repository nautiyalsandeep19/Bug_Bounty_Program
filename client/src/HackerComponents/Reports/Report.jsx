import React, { useEffect, useState } from 'react'
import CTAButton from '../../Components/Button/CTAButton'
import Severity from './SeveritySelector'

const Report = () => {
  const [ip, setIp] = useState('')

  const fetchIP = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      setIp(data.ip)
    } catch (err) {
      console.error('Failed to fetch IP:', err)
    }
  }

  const RequiredMark = () => <span className="text-red-500 ml-1">*</span>

  return (
    <section className="max-w-5xl w-full h-full mx-auto ">
      <div className="w-full md:max-w-3xl mx-auto  md:p-6 space-y-10 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">Submit Report</h1>

        {/* Scope */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Select Your Scope
            <RequiredMark />
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Select the scope under which the bug was identified.
          </p>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Choose scope --</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="api">API</option>
          </select>
        </div>

        {/* Endpoint */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Vulnerable Endpoint / Affected URL (Optional)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            If you have a specific endpoint or URL, enter it here.
          </p>
          <input
            type="url"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="https://example.com/endpoint"
          />
        </div>

        {/* Vulnerability Type */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Vulnerability Type
            <RequiredMark />
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Select the type of vulnerability that was found.
          </p>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Choose vulnerability --</option>
            <option value="xss">Cross Site Scripting (XSS)</option>
            <option value="sqli">SQL Injection</option>
            <option value="rce">Remote Code Execution</option>
          </select>
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Severity
            <RequiredMark />
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Estimate how critical the bug is (e.g., using CVSS score).
          </p>
          <Severity />
        </div>

        {/* Report Details */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Report Details
            <RequiredMark />
          </h2>

          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Report Title"
            required
          />
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Report Summary"
            required
          />
          <textarea
            rows={5}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Describe the impact of the vulnerability..."
            required
          />

          {/* IP Input with Button */}
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

        {/* Submit */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Review and Submit
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Please Review your report details before submitting.
          </p>
          <CTAButton text="Submit Report" />
        </div>
      </div>
    </section>
  )
}

export default Report
