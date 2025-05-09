import React, { useEffect, useState } from 'react'

import { getHackerDetails } from '../Services/hackerApi'

const HackerDashboard = () => {
  const [hacker, setHacker] = useState(null)

  useEffect(() => {
    const fetchhacker = async () => {
      const data = await getHackerDetails()
      if (data) {
        setHacker(data)
      }
    }
    fetchhacker()
  }, [])

  if (!hacker) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg">Loading hacker details...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6">
      {/* Header */}
      <div className="flex items-center gap-6 bg-slate-900 p-6 rounded-2xl shadow-lg text-white">
        {hacker.image ? (
          <img
            src={hacker.image}
            alt="hacker Logo"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
            {hacker.name?.charAt(0)}
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold mb-1">{hacker.name}</h1>
          <a
            href={`${hacker.domain}`}
            className="text-sm text-gray-300 underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            {hacker.domain}
          </a>
        </div>
      </div>

      {/* Body Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* hacker Info */}
        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            hacker Info
          </h2>
          <p>
            <strong>Email:</strong> {hacker.email}
          </p>
          <p>
            <strong>Country:</strong> {hacker.country || 'N/A'}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {hacker.description || 'No description available.'}
          </p>
        </div>

        {/* Contact Person */}
        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Contact Person
          </h2>
          <p>
            <strong>Name:</strong>{' '}
            {hacker.contactPerson?.representative || 'N/A'}
          </p>
          <p>
            <strong>Position:</strong> {hacker.contactPerson?.position || 'N/A'}
          </p>
          <p>
            <strong>Phone:</strong> {hacker.contactPerson?.phone || 'N/A'}
          </p>
        </div>

        {/* Program Info */}
        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Program</h2>
          {hacker.programs ? (
            <p className="text-lg">{hacker.programs.title}</p>
          ) : (
            <p>No program assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HackerDashboard
