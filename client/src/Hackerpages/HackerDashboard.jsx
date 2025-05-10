import React, { useEffect, useState } from 'react'
import { getHackerDetails } from '../Services/hackerApi'

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
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg">Loading feed...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {/* Left: Feed */}
      <div className="md:col-span-2 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {['Announcements', 'Updates', 'Bug reports', 'Invitations'].map(
            (tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  tag === 'Bug reports'
                    ? 'bg-green-700'
                    : tag === 'Updates'
                    ? 'bg-blue-700'
                    : tag === 'Announcements'
                    ? 'bg-red-700'
                    : tag === 'Invitations'
                    ? 'bg-yellow-600'
                    : 'bg-purple-600'
                }
              `}
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Feed Cards */}
        <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Report Status Updated</h2>
            <span className="text-sm text-zinc-400">
              {new Date().toLocaleString()}
            </span>
          </div>
          <p className="text-sm mt-2">
            <strong>BugBase Triager</strong> marked the report as{' '}
            <span className="text-red-400 font-semibold">invalid</span> on -{' '}
            <span className="text-green-500 font-semibold">#43702361 abg</span>.
          </p>
          <button className="mt-3 bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700">
            View Report
          </button>
        </div>

        <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Bug Report Submitted</h2>
            <span className="text-sm text-zinc-400">a day ago</span>
          </div>
          <p className="text-sm mt-2">
            Your report -{' '}
            <span className="text-green-500 font-semibold">#43702361 abg</span>{' '}
            has been submitted to{' '}
            <span className="text-green-400">hike-bugbounty</span> and is
            currently under review.
          </p>
          <button className="mt-3 bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700">
            View Report
          </button>
        </div>

        {/* Welcome Messages */}
        <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
          <h2 className="font-bold text-lg mb-1">Welcome to BugBase</h2>
          <p className="text-sm text-zinc-300">
            Thrilled to have you on BugBase! Unleash your skills, hack wisely,
            and claim your bounties.
          </p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
          <h2 className="font-bold text-md">Welcome to BugBase</h2>
          <p className="text-sm mt-1 text-zinc-300">
            Start hunting now and earn rewards. Explore the platform here 👇
          </p>
          <span className="text-sm text-zinc-500 mt-2 block">8 days ago</span>
        </div>
      </div>

      {/* Right Sidebar: Dynamic Hacker Info */}
      <div className="space-y-4">
        <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
          <div className="flex items-center gap-3">
            {hacker.image ? (
              <img
                src={hacker.image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                {hacker.name?.charAt(0)}
              </div>
            )}

            <div>
              <h3 className="font-semibold">{hacker.name}</h3>
              <p className="text-green-500 text-sm">
                @{hacker.username || 'anonymous'}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm text-zinc-300">
            <p>
              Global Rank:{' '}
              <span className="font-bold text-white">
                {hacker.rank || 'N/A'}
              </span>
            </p>
            <p>
              Reports Submitted:{' '}
              <span className="font-bold text-white">
                {hacker.reportsCount || 0}
              </span>
            </p>
            <p>
              Reputation:{' '}
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
