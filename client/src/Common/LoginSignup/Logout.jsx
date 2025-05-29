import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { logout } from '../../Services/authApi'
import Button from '../Button/Button'
const Logout = () => {
  const token = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout(navigate))
  }
  return (
    <Button
      text="Logout"
      type="submit"
      onClick={handleLogout}
      className="w-fit"
    />
  )
}

export default Logout
