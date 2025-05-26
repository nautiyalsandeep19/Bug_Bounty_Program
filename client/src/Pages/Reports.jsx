import React from 'react'
import Report from '../HackerComponents/Reports/Report'
import ProgramBox from '../Hackerpages/ProgramBox'

const Reports = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-full p-4 gap-4  ">
      <Report />
      <ProgramBox className="sticky top-0" />
    </div>
  )
}

export default Reports
