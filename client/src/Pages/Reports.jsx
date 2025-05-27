import React from 'react'
import Report from '../HackerComponents/Reports/Report'
import ProgramBox from '../Hackerpages/ProgramBox'

const Reports = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full min-h-screen p-4 gap-4 bg-[#0e0e0e]">
      <div className="flex-1 max-h-screen border border-gray-500 rounded-lg overflow-auto">
        <Report />
      </div>

      <ProgramBox className="sticky top-4 self-start" />
    </div>
  )
}

export default Reports
