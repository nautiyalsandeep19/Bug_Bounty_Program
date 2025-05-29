import React from 'react'

import CTAButton from './Button/CTAButton'

const ProgramCards = ({
  type,
  title,
  companyName,
  companyImage,
  bountyRange,
}) => {
  return (
    <div className="w-[325px] sm:w-[375px] h-[250px] flex flex-col justify-between p-5 rounded-xl bg-[#1e1e1e] shadow-md border border-gray-700">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between flex-wrap">
          <div className="bg-gray-500 text-white text-xs py-1 px-2 rounded-md">
            {type}
          </div>
        </div>

        <div className="flex gap-5 items-center p-2">
          <div className="w-12 h-12 rounded-full shrink-0">
            <img
              src={companyImage}
              alt="companyLogo"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left overflow-hidden">
            <h2 className="text-lg text-white truncate">{title}</h2>
            <p className="text-sm truncate">{companyName}</p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <CTAButton
          text="View Details"
          className="!w-full !py-2 !px-4 !text-sm"
        />
      </div>
    </div>
  )
}

export default ProgramCards
