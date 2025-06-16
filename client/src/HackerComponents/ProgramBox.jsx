import React from 'react'
import CTAButton from '../Common/Button/CTAButton'
import { useSelector } from 'react-redux'

const ProgramBox = ({ className = '', program, hideSubmit = false }) => {
  const userType = useSelector((state) => state.auth.userType)
  const token = useSelector((state) => state.auth.token)
  console.log('data of program', program)
  return (
    <section
      className={`w-full md:max-w-[400px] h-fit p-6 border border-gray-500 rounded-lg shadow-md space-y-6 bg-[#121212] ${className}`}
    >
      <div className="flex items-center border-b border-blue-500 pb-4">
        <img
          src={program?.logo || program.company.image}
          alt="company img"
          className="w-16 h-16 rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold">{program.company?.name}</h2>
      </div>

      <div>
        <h3 className="text-lg font-medium">Website</h3>
        <a
          href={program.company.domain}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {program.company.domain}
        </a>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Report Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-2xl font-bold block">
              {program.reportCount}
            </span>
            <span>Total Reports Received</span>
          </div>
          <div>
            <span className="text-2xl font-bold block">
              {program?.assets?.length || 0}
            </span>
            <span>Assets in Scope</span>
          </div>
          <div className="sm:col-span-2">
            <div className="flex text-2xl font-bold">
              <span>
                {program.bountyRange.low}
                {'  -  '}
              </span>
              <span>{program.bountyRange.high}</span>
            </div>

            <span>Bounty Range</span>
          </div>
        </div>
      </div>

      {!hideSubmit &&
        (userType === 'hacker' || !token ? (
          <div className="pt-4">
            <CTAButton
              text="Submit Report"
              linkto={`/hacker/report/${program._id}`}
            />
          </div>
        ) : (
          <div className="pt-4">
            <CTAButton text="View Report" linkto={`/reports/${program._id}`} />
          </div>
        ))}
    </section>
  )
}

export default ProgramBox
