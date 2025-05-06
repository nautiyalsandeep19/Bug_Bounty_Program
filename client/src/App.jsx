import Login from './Pages/Auth/Login.jsx'
import SignUp from './Pages/Auth/SignUp.jsx'
import { Routes, Route } from 'react-router'
import VerifyOTP from './Pages/Auth/VerifyOtp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyOtp" element={<VerifyOTP />} />
      </Routes>
    </>
  )
}

export default App
