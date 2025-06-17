import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Loader from '../Common/Loader'

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState('hackers')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BASE_URL =
    import.meta.env.VITE_BACKEND_HOST_URL || 'http://localhost:8000'

  const fetchUsers = async (type) => {
    setLoading(true)
    setError(null)

    try {
      let url = ''
      if (type === 'hackers') {
        url = `${BASE_URL}/api/hacker/hackersdata`
      } else if (type === 'companies') {
        url = `${BASE_URL}/api/company/companiesdata`
      }

      const response = await axios.get(url, { withCredentials: true })
      console.log('usersdatra', response)

      if (response.data?.hackers || response.data?.companies) {
        setUsers(response.data.hackers || response.data.companies || [])
      } else {
        setUsers([])
        toast.error('No users found')
      }
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Failed to fetch users')
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(activeTab)
  }, [activeTab])

  if (loading) {
    return <Loader />
  }
  return (
    <div className="p-6  min-h-screen ">
      <h2 className="text-3xl font-semibold mb-4">Users</h2>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('hackers')}
          className={`pb-2 font-medium transition-all ${
            activeTab === 'hackers'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Hackers
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`pb-2 font-medium transition-all ${
            activeTab === 'companies'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Companies
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-400">Loading {activeTab}...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400">No {activeTab} found.</div>
      ) : (
        <ul className="space-y-4 ">
          {users.map((user) => (
            <li
              key={user._id || user.id}
              className="bg-gray-800 p-4 rounded-lg hover:bg-yellow-500"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.image ||
                    'https://img.dicebear.com/6.x/initials/svg?seed=' +
                      (user.name || 'User')
                  }
                  alt={user.name || 'User Avatar'}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user.name || 'No Name'}</p>
                  <p className="text-sm text-gray-400">
                    {user.email || 'No Email'}
                  </p>
                  {activeTab === 'companies' && user.website && (
                    <p className="text-xs text-blue-400 underline">
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UsersPage
