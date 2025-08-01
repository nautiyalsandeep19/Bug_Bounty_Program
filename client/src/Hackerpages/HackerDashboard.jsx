import React, { useEffect, useState } from 'react'
import { getHackerDetails } from '../Services/hackerApi'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchLogsForHacker } from '../Services/messageApi'
import { Shield, BadgeCheck, Bug, Target } from 'lucide-react'
import CTAButton from '../Common/Button/CTAButton'

const FeedDashboard = () => {
  const [hacker, setHacker] = useState(null)
  const [logs, setLogs] = useState([])

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    const fetchHacker = async () => {
      try {
        const data = await getHackerDetails()
        if (data) {
          setHacker(data)
          const logs = await fetchLogsForHacker(data._id)
          setLogs(logs)
        }
      } catch (error) {
        console.error('Failed to fetch hacker or logs', error)
      }
    }

    fetchHacker()
  }, [])

  if (!hacker) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-gray-400 text-lg animate-pulse">Loading feed...</p>
      </div>
    )
  }

  return (
    <div className="h-screen sm:h-[85vh] md:h-[85vh]  w-full flex flex-col overflow-hidden">
      {/* User Info Card */}
      <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-700 shadow-lg mx-6 mt-6">
        <div className="flex items-center gap-4 flex-wrap">
          {hacker.image ? (
            <>
              <img
                src={hacker.image}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
              <div className="flex flex-col justify-center space-y-1">
                <h2 className="text-xl font-bold text-white">{hacker.name}</h2>
                <p className="text-sm text-zinc-300">
                  <span className="text-white font-medium">
                    🌐 Global Rank:
                  </span>{' '}
                  <span className="font-bold text-white">
                    {hacker.rank || 'N/A'}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">
                {hacker.name?.charAt(0)}
              </div>
              <div className="flex flex-col justify-center space-y-1">
                <h2 className="text-xl font-bold text-white">{hacker.name}</h2>
                <p className="text-sm text-zinc-300">
                  <span className="text-white font-medium">
                    🌐 Global Rank:
                  </span>{' '}
                  <span className="font-bold text-white">
                    {hacker.rank || 'N/A'}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mx-6 mt-4">
        <div className="bg-[#202128] p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400">Total Earnings</p>
            <h2 className="text-2xl font-bold mt-1">$45,000</h2>
          </div>
          <Shield className="w-6 h-6 text-green-500" />
        </div>
        <div className="bg-[#202128] p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400">Reputation</p>
            <h2 className="text-2xl font-bold mt-1">2,850</h2>
          </div>
          <BadgeCheck className="w-6 h-6 text-blue-500" />
        </div>
        <div className="bg-[#202128] p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400">Valid Findings</p>
            <h2 className="text-2xl font-bold mt-1">89</h2>
          </div>
          <Bug className="w-6 h-6 text-red-500" />
        </div>
        <div className="bg-[#202128] p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400">Active Programs</p>
            <h2 className="text-2xl font-bold mt-1">3</h2>
          </div>
          <Target className="w-6 h-6 text-yellow-500" />
        </div>
      </div>

      {/* Logs Section */}
      <div className="mx-6 mt-4 bg-[#202128] p-4 rounded-2xl border border-zinc-700 shadow-md flex-grow">
        <h2 className="text-lg font-semibold text-white mb-3">
          📜 Your Report Logs
        </h2>
        <div className="space-y-3 pr-2">
          {logs.length === 0 ? (
            <p className="text-sm text-zinc-500">No logs yet.</p>
          ) : (
            <ul className="space-y-3">
              {logs.slice(0, 2).map((log, idx) => (
                <li
                  key={idx}
                  className="flex flex-col gap-3 bg-[#181A1F] px-4 py-2 rounded-lg text-sm text-yellow-300 border border-gray-500 shadow"
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <span
                      className="ProseMirror"
                      dangerouslySetInnerHTML={{ __html: log.message }}
                    ></span>
                    <span className="text-xs text-zinc-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                    <p
                      className={`px-2 py-1 rounded text-white text-sm font-medium ${
                        log.reportId.status === 'submitted'
                          ? 'bg-blue-500'
                          : log.reportId.status === 'under review'
                          ? 'bg-orange-800'
                          : log.reportId.status === 'triage'
                          ? 'bg-yellow-500 text-black'
                          : log.reportId.status === 'completed'
                          ? 'bg-green-500'
                          : log.reportId.status === 'spam'
                          ? 'bg-gray-500 text-black'
                          : log.reportId.status === 'rejected'
                          ? 'bg-red-500'
                          : 'bg-gray-700 text-black'
                      }`}
                    >
                      {log.reportId.status}
                    </p>
                  </div>

                  <CTAButton
                    text="View Report"
                    linkto={`/chat/${log.reportId._id}`}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedDashboard
