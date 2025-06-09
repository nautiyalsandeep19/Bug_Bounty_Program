import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TrigerReports = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/reports/allReports`, {
          withCredentials: true,
        })
        console.log(response.data)

        setUsers(response.data?.reports)
      } catch (err) {
        setError('Failed to fetch users')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [BASE_URL])

  if (loading) return <div>Loading users...</div>
  if (error) return <div>{error}</div>
  if (users.length === 0) return <div>No users found</div>

  return (
    <div>
      <h2>All Hackers</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id || user.id}>
            <strong>{user.title || 'No Name'}</strong> -{' '}
            {user.summary || 'No Email'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrigerReports
