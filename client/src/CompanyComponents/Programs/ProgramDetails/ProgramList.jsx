import { useState, useEffect } from 'react'
import axios from 'axios'
import ProgramCard from './ProgramCard'
import { Link } from 'react-router-dom'

const ProgramList = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const companyId = '6652f1a1f57c9c48e16b3400'
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL

  useEffect(() => {
    const fetchProgramsByCompany = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${VITE_BACKEND_HOST_URL}/api/programs/companyProgramss/${companyId}`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        console.log('API Response:', response.data)
        setPrograms(response.data.data || [])
        setError(null)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to fetch programs'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProgramsByCompany()
  }, [])

  const filtered = programs.filter((program) => {
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

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {search || filter !== 'All'
            ? 'No programs match your search criteria'
            : 'No programs available'}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProgramList
