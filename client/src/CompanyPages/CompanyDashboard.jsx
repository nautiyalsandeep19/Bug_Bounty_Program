import React, { useEffect } from 'react'
import { useState } from 'react'

import {
  FiActivity,
  FiAirplay,
  FiDollarSign,
  FiBriefcase,
} from 'react-icons/fi'

const CompanyDashboard = () => {
  const [logs, setLogs] = useState([])
  const [activePrograms, setActivePrograms] = useState(0)

  const storedUser = localStorage.getItem('user')
  const userObj = JSON.parse(storedUser)
  const companyId = userObj._id
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL

  useEffect(() => {
    const fetchActivePrograms = async () => {
      try {
        const res = await fetch(
          `${VITE_BACKEND_HOST_URL}/api/programs/companyPrograms/${companyId}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (!res.ok) {
          throw new Error('Failed to fetch active programs')
        }

        const data = await res.json()
        setActivePrograms(data.data.length)
      } catch (err) {
        console.error(err)
      }
    }

    fetchActivePrograms()
  }, [companyId, VITE_BACKEND_HOST_URL])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#202128] border border-green-700 p-5 rounded-xl text-white">
          <h3 className="text-md text-gray-400 mb-2 flex justify-between">
            Active Programs <FiActivity />
          </h3>
          <p className="text-2xl font-semibold">{activePrograms}</p>
          <p className="text-sm text-green-500 mt-1">+2 new this month</p>
        </div>

        <div className="bg-[#202128] border border-green-700 p-5 rounded-xl text-white">
          <h3 className="text-md text-gray-400 mb-2 flex justify-between">
            Total Reports
            <FiAirplay />
          </h3>
          <p className="text-2xl font-semibold">1</p>
          <p className="text-sm text-red-400 mt-1">+15% from last month</p>
        </div>

        <div className="bg-[#202128] border border-green-700 p-5 rounded-xl text-white">
          <h3 className="text-md text-gray-400 mb-2  flex  justify-between">
            Resolved Reports <FiBriefcase />
          </h3>
          <p className="text-2xl font-semibold">0</p>
          <p className="text-sm text-gray-400 mt-1">0% resolution rate</p>
        </div>

        <div className="bg-[#202128] border border-green-700 p-5 rounded-xl text-white">
          <h3 className="text-md text-gray-400 mb-2 flex  justify-between">
            Total Paid <FiDollarSign />
          </h3>
          <p className="text-2xl font-semibold text-green-400">$12,500</p>
          <p className="text-sm text-gray-400 mt-1">Across all programs</p>
        </div>
      </div>

      {/* Bug Reports Section */}
      <div className="bg-[#141519] border border-green-700 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-1">
          Recent Bug Reports
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Latest vulnerability reports from researchers
        </p>

        {/* Bug Reports Section */}
        <div className="bg-[#141519] border border-green-700 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-1">
            Recent Bug Reports
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Latest vulnerability reports from researchers
          </p>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {logs.length === 0 ? (
              <p className="text-gray-500 text-sm">No bug reports yet.</p>
            ) : (
              logs.slice(0, 5).map((log, idx) => (
                <div
                  key={idx}
                  className="bg-[#0F0F0F] text-white p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-700"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">⚠️</span>
                    <div>
                      <p
                        className="font-medium"
                        dangerouslySetInnerHTML={{ __html: log.message }}
                      />
                      <p className="text-sm text-gray-400">
                        {log.reportId?.programName || 'Unknown Program'} •{' '}
                        {new Date(log.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        log.reportId?.status === 'accepted'
                          ? 'text-green-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      ✔ {log.reportId?.status}
                    </span>
                    <a
                      href={`/chat/${log.reportId._id}`}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 3h7m0 0v7m0-7L10 14M5 10v11h11v-5m-6 1h6"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
