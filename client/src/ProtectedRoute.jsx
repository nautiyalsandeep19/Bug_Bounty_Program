// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

// const ProtectedRoute = ({ children, typeUser }) => {
//   const token = useSelector((state) => state.auth.token)
//   const userType = useSelector((state) => state.auth.userType)

//   const isAuthorized = () => {
//     if (!typeUser) return true // No restriction
//     if (typeof typeUser === 'string') return userType === typeUser
//     if (Array.isArray(typeUser)) return typeUser.includes(userType)
//     return false
//   }

//   if (token && isAuthorized()) {
//     return children
//   }

//   return <Navigate to="/login" replace />
// }

// export default ProtectedRoute

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children, typeUser }) => {
  const token = useSelector((state) => state.auth.token)
  const userType = useSelector((state) => state.auth.userType)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking if auth state is fully loaded
    // This could involve checking localStorage or an API call
    const initializeAuth = async () => {
      // If your Redux store is populated from localStorage or an API,
      // ensure it's done before setting isLoading to false
      setIsLoading(false)
    }
    initializeAuth()
  }, [])

  const isAuthorized = () => {
    if (!typeUser) return true // No restriction if typeUser is not specified
    if (!userType) return false // Handle null or undefined userType
    if (typeof typeUser === 'string') return userType === typeUser
    if (Array.isArray(typeUser)) return typeUser.includes(userType)
    return false
  }

  if (isLoading) {
    return <div>Loading...</div> // Optional: Replace with a loading spinner
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!isAuthorized()) {
    return <Navigate to="/" replace /> // Redirect unauthorized users to home
  }

  // Render children for single components or Outlet for nested routes
  return children ? children : <Outlet />
}

export default ProtectedRoute
