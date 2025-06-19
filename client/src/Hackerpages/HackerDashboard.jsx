import React, { useEffect, useState } from 'react'
import { getHackerDetails } from '../Services/hackerApi'
import Button from '../Common/Button/CTAButton'
import { FaBug, FaBullhorn, FaSyncAlt, FaUserPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchLogsForHacker } from '../Services/messageApi'
import { Shield, BadgeCheck, Bug, Target } from 'lucide-react'
import DashboardProgram from '../HackerComponents/DashboardProgram'

const FeedDashboard = () => {
  const [hacker, setHacker] = useState(null)
  const [logs, setLogs] = useState([])
  const navigate = useNavigate()

  const token = useSelector((state) => state.auth.token)
  // console.log('ss', logs)

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

  useEffect(() => {
    console.log(
      'bsdjbfbfj',
      logs.map((log) => {
        return log
      })
    )
  }, [logs])

  if (!hacker) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-gray-400 text-lg animate-pulse">Loading feed...</p>
      </div>
    )
  }

  const tagIcons = {
    Announcements: <FaBullhorn />,
    Updates: <FaSyncAlt />,
    'Bug reports': <FaBug />,
    Invitations: <FaUserPlus />,
  }

  return (
    <div className="h-full  px-4 py-4 flex flex-col space-y-6  ">
      {/* User Info Card */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-4 flex-wrap">
          {hacker.image ? (
            <img
              src={hacker.image}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">
              {hacker.name?.charAt(0)}
            </div>
          )}

          <div>
            <h3 className="font-bold text-lg">{hacker.name}</h3>
            <p className="text-blue-400 text-sm">
              <span className="text-white">Welcome Back</span> @
              {hacker.username || 'anonymous'}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm text-zinc-300">
          <p>
            <span className="text-white font-medium">🌐 Global Rank:</span>{' '}
            <span className="font-bold text-white">{hacker.rank || 'N/A'}</span>
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400">Total Earnings</p>
            <h2 className="text-3xl font-bold mt-2">$45,000</h2>
            <p className="text-green-400 mt-1 text-sm">+12% from last month</p>
          </div>
          <Shield className="w-10 h-10 text-green-500" />
        </div>

        <div className="bg-[#1F2937] p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400">Reputation</p>
            <h2 className="text-3xl font-bold mt-2">2,850</h2>
            <p className="text-blue-400 mt-1 text-sm">Top 1% globally</p>
          </div>
          <BadgeCheck className="w-10 h-10 text-blue-500" />
        </div>

        <div className="bg-[#1F2937] p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400">Valid Findings</p>
            <h2 className="text-3xl font-bold mt-2">89</h2>
            <p className="text-red-400 mt-1 text-sm">70% success rate</p>
          </div>
          <Bug className="w-10 h-10 text-red-500" />
        </div>

        <div className="bg-[#1F2937] p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400">Active Programs</p>
            <h2 className="text-3xl font-bold mt-2">3</h2>
            <p className="text-yellow-400 mt-1 text-sm">Available to hunt</p>
          </div>
          <Target className="w-10 h-10 text-yellow-500" />
        </div>
      </div>

      {/* <DashboardProgram /> */}
      {/* Logs Section - scrollable, takes remaining height */}
      <div className="flex-1 overflow-y-auto bg-neutral-900 p-6 rounded-2xl border border-zinc-700 shadow-md">
        <h2 className="text-lg font-semibold text-white mb-3">
          📜 Your Report Logs
        </h2>
        <div className="space-y-3 pr-2">
          {logs.length === 0 ? (
            <p className="text-sm text-zinc-500">No logs yet.</p>
          ) : (
            <ul className="space-y-3">
              {logs.map((log, idx) => (
                <li
                  key={idx}
                  className="flex flex-col gap-5 bg-[#18181b] px-4 py-2 rounded-lg text-sm text-yellow-300 border-1 border-blue-500 shadow"
                >
                  <div className="flex justify-between items-center">
                    <span
                      className="ProseMirror"
                      dangerouslySetInnerHTML={{ __html: log.message }}
                    ></span>
                    <span className="text-xs text-zinc-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                    <p
                      className={`px-2 py-1 rounded text-white text-sm font-medium
  ${
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

                  <Button
                    className="!w-fit"
                    text="view report"
                    onClick={() => navigate(`/chat/${log.reportId._id}`)}
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
