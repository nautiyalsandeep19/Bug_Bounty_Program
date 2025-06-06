import React, { useState } from 'react'
import axios from 'axios'
import Button from '../Common/Button/Button'

const AdminHome = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'triager',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/createtriager`,
        formData
      )
      console.log(res)

      setMessage('Triager created successfully!')
      setFormData({ name: '', email: '', password: '', userType: 'triager' })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setMessage('Failed to create triager.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen space-y-4">
      <Button
        text="Add Triager"
        onClick={() => setShowForm(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      />

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border p-6  shadow-md w-full max-w-md space-y-4 rounded-lg"
        >
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              text={loading ? 'Creating...' : 'Submit'}
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-red-500 underline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  )
}

export default AdminHome
