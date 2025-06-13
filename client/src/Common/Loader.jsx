import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin  rounded-full h-50 w-50 border-t-8 border-blue-500 border-solid"></div>
    </div>
  )
}

export default Loader
