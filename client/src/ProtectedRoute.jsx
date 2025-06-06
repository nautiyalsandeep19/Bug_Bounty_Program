// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

// const ProtectedRoute = ({ children, typeUser }) => {
//   const token = useSelector((state) => state.auth.token)
//   const userType = useSelector((state) => state.auth.userType)

//   console.log('Auth check:', { token, userType, required: typeUser })

//   // If token is present and userType matches (if specified), allow access
//   if (token && (!typeUser || userType === typeUser)) {
//     return children
//   }

//   // Redirect if not authenticated or not authorized
//   return <Navigate to="/login" replace />
// }

// export default ProtectedRoute

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, typeUser }) => {
  const token = useSelector((state) => state.auth.token)
  const userType = useSelector((state) => state.auth.userType)

  console.log('Auth check:', { token, userType, required: typeUser })

  // Allow access if token exists AND:
  // - no typeUser restriction OR
  // - user matches typeUser OR
  // - user is admin (who can access all)
  if (token && (!typeUser || userType === typeUser || userType === 'admin')) {
    return children
  }

  // Redirect to login otherwise
  return <Navigate to="/login" replace />
}

export default ProtectedRoute
