import { Routes, Route } from 'react-router'
import SignUp from './Components/LoginSignup/SignUp'
import Login from './Components/LoginSignup/Login'
import VerifyOtp from './Components/LoginSignup/VerifyOtp'
import ResetPassword from './Components/LoginSignup/ResetPassword'
import CheckEmailPage from './Components/LoginSignup/CheckEmailpage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="resetPassword/:token" element={<ResetPassword />} />
        <Route path="checkemail" element={<CheckEmailPage />} />
      </Routes>
    </>
  )
}

export default App
