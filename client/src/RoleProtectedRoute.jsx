// import React from 'react'
// import { Navigate } from 'react-router-dom'

// const RoleProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem('authToken')
//   const role = localStorage.getItem('role')

//   if (!token) return <Navigate to="/login" />
//   if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />

//   return children
// }

// export default RoleProtectedRoute
