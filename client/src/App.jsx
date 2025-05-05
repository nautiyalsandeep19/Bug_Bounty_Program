import Login from './Components/LoginSignup/Login'
import SignUp from './Components/LoginSignup/SignUp'
import { Routes, Route } from 'react-router'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
