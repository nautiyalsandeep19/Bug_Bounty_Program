import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Common/Loader'
import { getLeaderBoard } from '../Services/hackerApi'

const HackerLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [myRank, setMyRank] = useState(null)
  const [myHacker, setMyHacker] = useState(null)
  const [loading, setLoading] = useState(true)

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      const board = await getLeaderBoard()
      board.sort((a, b) => b.totalPoints - a.totalPoints)
      setLeaderboard(board)

      if (user?._id) {
        const index = board.findIndex((hacker) => hacker._id === user._id)
        if (index !== -1) {
          setMyRank(index + 1)
          setMyHacker(board[index])
        }
      }

      setLoading(false)
    }

    loadData()
  }, [user])

  if (loading) return <Loader />

  return (
   <div className="max-w-full h-screen mx-auto px-4 py-8 flex flex-col-reverse lg:flex-row justify-between gap-10">
  {/* Full Leaderboard Table */}
  <div className="w-full  bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden p-6">
    <h1 className="text-2xl font-bold text-white mb-6">🏆 Global Leaderboard</h1>
    
    {/* Top Hacker Banner */}
    <div className="w-full bg-[#111217] border border-gray-700 text-white p-6 rounded-lg mb-6">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16  rounded-full bg-[#16A149] flex items-center justify-center text-3xl font-bold">1</div>
        <div>
          {leaderboard.slice(0,1).map((hacker, index) => (
          <>
        
       
          <p className="font-semibold text-xl">{hacker.name}</p>
          <div className="flex gap-4 text-sm text-gray-300">
            <span>{hacker.reputation}#1 reputation</span>
            
            <span>${hacker.earnings}50 earnings</span>
            
            <span>{hacker.findings}200 findings</span>
          </div>
          </>
          ))}
          
        </div>
      </div>
    </div>

    {/* Country Section */}
    <h2 className="text-xl font-bold text-white mb-4">India</h2>
    
    {/* Leaderboard Table */}
    <table className="w-full text-white text-sm">
      <tbody>
        {leaderboard.map((hacker, index) => (
          <tr
            key={hacker._id}
            className={`hover:bg-[#111217] ${
              hacker._id === user?._id ? 'bg-[#111217] bg-opacity-20  h-20 m-auto ' : ''
            }`}
          >
            <td> <div className="w-7 h-7 ml-5 rounded-full bg-[#16A149] p-1 flex items-center justify-center text-base font-bold">{index + 1}</div></td>
            <td className="py-4 px-4 mt-3 flex items-center gap-2">
              <img
                src={hacker.image}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              {hacker.name}
            </td>
            <td className="py-2 px-4">{hacker.reputation}# reputation</td>
            <td className="py-2 px-4">${hacker.earnings}100 earnings</td>
            <td className="py-2 px-4">{hacker.findings}40 findings</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* My Rank Banner */}
  {/* {myHacker && (
    <div className="w-full lg:w-1/3 bg-[#202128] border border-blue-600 text-white p-6 rounded-lg shadow-lg mb-4">
      <div className="flex flex-col gap-5 items-center justify-between">
        <div className="flex items-center gap-5 w-full">
          <img
            src={myHacker.image}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="hidden lg:block font-semibold text-xl">
              {myHacker.name}
            </p>
            <p className="font-semibold text-sm text-blue-300">
              @{myHacker.username}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg text-blue-300">Your Rank</p>
          <p className="text-6xl font-extrabold text-blue-100">#{myRank}</p>
          <p className="text-lg text-blue-300">
            {myHacker.totalPoints} pts
          </p>
        </div>
      </div>
    </div>
  )} */}
</div>
  )
}

export default HackerLeaderboard
