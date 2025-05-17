import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CTAButton = ({
  linkto,
  text = 'Get Started →',
  className = '',
  onClick,
  type = 'button',
}) => {
  const buttonContent = (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        backgroundColor: '#1e40af',
      }}
      transition={{ duration: 0.2 }}
      className={`px-6 py-2 text-white font-medium bg-blue-600 hover:bg-blue-700
        rounded-md border border-blue-500 transition-colors duration-200 cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </motion.button>
  )

  return linkto ? <Link to={linkto}>{buttonContent}</Link> : buttonContent
}

export default CTAButton
