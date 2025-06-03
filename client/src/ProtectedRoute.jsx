import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token) // <-- fix here
  console.log('token', token)

  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
