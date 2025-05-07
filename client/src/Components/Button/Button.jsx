import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router'

const Button = ({
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
        boxShadow: '0px 10px 30px rgba(0, 212, 255, 0.3)',
        y: -2,
      }}
      whileTap={{
        y: 1,
        boxShadow: '0px 5px 15px rgba(0, 212, 255, 0.2)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`group px-10 py-3 relative cursor-pointer overflow-hidden
        bg-gradient-to-r from-[#0A1A4F] to-[#031B36] rounded-full
        border border-blue-500
        shadow-[0px_1px_3px_0px_rgba(0,212,255,0.2),0px_1px_2px_0px_rgba(255,255,255,0.05)_inset]
        ${className}`}
      onClick={onClick}
      type={type}
    >
      <span className="relative z-10 font-medium text-white group-hover:text-[#00D4FF] transition-colors duration-300">
        {text}
      </span>

      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent h-px w-4/5 mx-auto"></span>

      <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent h-[4px] w-4/5 mx-auto blur-sm"></span>

      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00D4FF] to-[#00A6FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
    </motion.button>
  )

  if (linkto) {
    return <Link to={linkto}>{buttonContent}</Link>
  }

  return buttonContent
}

export default Button
