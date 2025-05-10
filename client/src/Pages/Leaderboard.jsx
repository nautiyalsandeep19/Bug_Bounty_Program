import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { getLeaderBoard } from '../Services/hackerApi';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [myHacker, setMyHacker] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const board = await getLeaderBoard();
      board.sort((a, b) => b.totalPoints - a.totalPoints);
      setLeaderboard(board);

      if (user?._id) {
        const index = board.findIndex(hacker => hacker._id === user._id);
        if (index !== -1) {
          setMyRank(index + 1);
          setMyHacker(board[index]);
        }
      }

      setLoading(false);
    };

    loadData();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col-reverse lg:flex-row justify-between gap-10">
      {/* Full Leaderboard Table */}
      <div className="w-full lg:w-2/3 bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden">
        <h1 className="text-2xl font-bold text-white mb-6">🏆 Leaderboard</h1>
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
            {leaderboard.map((hacker, index) => (
              <tr
                key={hacker._id}
                className={`hover:bg-gray-900 ${
                  hacker._id === user?._id ? 'bg-blue-800 bg-opacity-20' : ''
                }`}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img
                    src={hacker.image}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {hacker.name}
                </td>
                <td className="py-2 px-4">@{hacker.username}</td>
                <td className="py-2 px-4">{hacker.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* My Rank Banner */}
      {myHacker && (
        <div className="w-full lg:w-1/3 bg-blue-800 border border-blue-600 text-white p-6 rounded-lg shadow-lg mb-4">
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
              <p className="text-lg text-blue-300">{myHacker.totalPoints} pts</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
