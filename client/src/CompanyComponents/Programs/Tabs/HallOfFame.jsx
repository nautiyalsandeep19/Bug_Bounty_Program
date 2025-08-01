import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const HallOfFame = () => {
  const programData = useSelector((state) => state.program.programData)
  const leaderBoard = programData?.leaderboard || []
  const leaderboardView = programData?.leaderboardVisibility

  const sortedLeaderboard = useMemo(() => {
    return [...leaderBoard].sort((a, b) => b.score - a.score)
  }, [leaderBoard])

  if (!leaderboardView) {
    return (
      <div className="text-center text-black py-20">
        <h2 className="text-2xl font-semibold">Leaderboard Closed</h2>
        <p className="text-gray-400 mt-2">
          This company has disabled leaderboard visibility.
        </p>
      </div>
    )
  }

  if (sortedLeaderboard.length === 0) {
    return (
      <div className="text-center text-black py-20">
        <h2 className="text-2xl font-semibold">No reports found</h2>
        <p className="text-gray-400 mt-2">Leaderboard is currently empty.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        🏆 Hall of Fame
      </h1>
      <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full text-white text-sm">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Hacker</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((entry, index) => (
              <tr key={entry.hacker._id} className="hover:bg-gray-900">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img
                    src={entry.hacker.image}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {entry.hacker.name}
                </td>
                <td className="py-2 px-4">@{entry.hacker.username}</td>
                <td className="py-2 px-4">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HallOfFame
