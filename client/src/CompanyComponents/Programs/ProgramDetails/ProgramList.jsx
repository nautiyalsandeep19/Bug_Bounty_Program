import { useState, useEffect } from 'react'
import axios from 'axios'
import ProgramCard from './ProgramCard'
import { Link } from 'react-router'

const ProgramList = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [programs, setPrograms] = useState([])
  const [draftPrograms, setDraftPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('published')

  const storedUser = localStorage.getItem('user')
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL
  const userObj = JSON.parse(storedUser)
  const companyId = userObj._id

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true)

        // Fetch published programs
        const publishedRes = await fetch(
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

        // Fetch draft programs
        const draftRes = await fetch(
          `${VITE_BACKEND_HOST_URL}/api/programs/companyPrograms/${companyId}?status=draft`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (!publishedRes.ok || !draftRes.ok) {
          throw new Error('Failed to fetch programs')
        }

        const publishedData = await publishedRes.json()
        const draftData = await draftRes.json()

        setPrograms(publishedData.data)
        setDraftPrograms(draftData.data)
        setError(null)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [companyId, VITE_BACKEND_HOST_URL])

  const currentPrograms = activeTab === 'published' ? programs : draftPrograms

  const filtered = currentPrograms.filter((program) => {
    const matchesSearch = program.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
    const matchesFilter = filter === 'All' || program.type === filter
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="w-full p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-500">
        <p>Error loading programs: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Programs"
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <Link
            className="border px-4 py-2 rounded-full hover:bg-gray-600 transition"
            to="/addprogram"
          >
            Create Program
          </Link>
        </div>

        <select
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="VDP">VDP</option>
          <option value="Private Bug Bounty">Private Bug Bounty</option>
          <option value="Public Bug Bounty">Public Bug Bounty</option>
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'published'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('published')}
        >
          Published Programs
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'draft'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('draft')}
        >
          Draft Programs
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {search || filter !== 'All'
            ? 'No programs match your search criteria'
            : `No ${activeTab} programs available`}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((program) => (
            <ProgramCard
              key={program._id}
              program={program}
              isDraft={activeTab === 'draft'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProgramList
