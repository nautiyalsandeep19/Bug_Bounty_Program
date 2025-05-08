import React from 'react'
import { Link } from 'react-router'

const CheckEmailPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0e1b31] text-white px-4">
      <div className="bg-[#111f3a] p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Check Your Email</h2>
        <p className="text-gray-400 mb-6">
          We've sent a password reset link to your email address. If you don't
          see it, please check your{' '}
          <span className="text-yellow-400 font-medium">Spam</span> or
          <span className="text-yellow-400 font-medium"> Promotions</span>{' '}
          folder.
        </p>

        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full block transition duration-300"
        >
          Open Gmail
        </a>
      </div>
    </div>
  )
}

export default CheckEmailPage
