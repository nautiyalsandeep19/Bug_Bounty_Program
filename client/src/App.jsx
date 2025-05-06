import { Routes, Route } from 'react-router'
import SignUp from './Components/LoginSignup/SignUp'
import Login from './Components/LoginSignup/Login'
import VerifyOtp from './Components/LoginSignup/VerifyOtp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
