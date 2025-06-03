import React, { useEffect, useState } from 'react'
import { getHackerDetails } from '../Services/hackerApi'
import Button from '../Common/Button/CTAButton'
import { FaBug, FaBullhorn, FaSyncAlt, FaUserPlus } from 'react-icons/fa'
import { token } from '../Slices/authSlice'

const FeedDashboard = () => {
  const [hacker, setHacker] = useState(null)

  useEffect(() => {
    const fetchHacker = async () => {
      const data = await getHackerDetails()
      if (data) setHacker(data)
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

  const tagIcons = {
    Announcements: <FaBullhorn />,
    Updates: <FaSyncAlt />,
    'Bug reports': <FaBug />,
    Invitations: <FaUserPlus />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-900 text-white px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {/* Main Dashboard Content */}
      <div className="md:col-span-2 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Dashboard
        </h1>

        {/* Tag Buttons */}
        <div className="flex flex-wrap gap-3">
          {['Announcements', 'Updates', 'Bug reports', 'Invitations'].map(
            (tag) => {
              const tagStyles = {
                Announcements:
                  'bg-red-600 text-white hover:bg-red-500 ring-2 ring-red-400',
                Updates:
                  'bg-blue-600 text-white hover:bg-blue-500 ring-2 ring-blue-400',
                'Bug reports':
                  'bg-green-600 text-white hover:bg-green-500 ring-2 ring-green-400',
                Invitations:
                  'bg-yellow-400 text-black hover:bg-yellow-300 ring-2 ring-yellow-200',
              }

              return (
                <Button
                  key={tag}
                  text={tag}
                  className={`!flex items-center gap-2 !px-4 !py-2 !rounded-full !text-sm !font-semibold transition-all duration-300 ${tagStyles[tag]}`}
                >
                  {tagIcons[tag]} {tag}
                </Button>
              )
            }
          )}
        </div>

        {/* Feed Card */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-center mb-2 flex-wrap gap-y-2">
            <h2 className="text-lg sm:text-xl font-semibold">
              📋 Report Status
            </h2>
            <span className="text-sm text-zinc-400">
              {new Date().toLocaleString()}
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            <strong className="text-white">The report is </strong>
            marked as{' '}
            <span className="text-red-400 font-semibold">invalid</span> on
            <span className="text-blue-500 font-semibold"> #43702361 abg</span>.
          </p>

          <Button
            text="View Report"
            className="!mt-4 !px-4 !py-2 !rounded-lg !bg-indigo-600 hover:!bg-indigo-500 !text-white transition"
          />
        </div>
      </div>

      {/* Sidebar - Hacker Card */}
      <div className="space-y-6 mt-10 md:mt-[76px]">
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
                @{hacker.username || 'anonymous'}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm text-zinc-300">
            <p>
              <span className="text-white font-medium">🌐 Global Rank:</span>{' '}
              <span className="font-bold text-white">
                {hacker.rank || 'N/A'}
              </span>
            </p>
            <p>
              <span className="text-white font-medium">📄 Reports:</span>{' '}
              <span className="font-bold text-white">
                {hacker.reportsCount || 0}
              </span>
            </p>
            <p>
              <span className="text-white font-medium">🏆 Reputation:</span>{' '}
              <span
                className={`font-bold ${
                  hacker.reputation < 0 ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {hacker.reputation}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedDashboard
