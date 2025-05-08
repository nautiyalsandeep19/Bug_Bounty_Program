import React from 'react'
import { assets } from '../../../assets/assets'

const Announcements = () => {
  return (
    <div>
      <img src={assets.noannoncement} alt="" className='h-[150px]'/>
       <h1 className='text-black font-bold mt-10'>No Announcement...</h1>
      
      </div>
  )
}

export default Announcements