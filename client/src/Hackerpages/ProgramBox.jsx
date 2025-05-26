import React from 'react'
import CTAButton from '../Components/Button/CTAButton'

const ProgramBox = () => {
  return (
    <section className="w-full md:max-w-[400px] h-fit p-6 border rounded-lg shadow-md space-y-6 sticky top-0 left-0">
      <div className="flex items-center border-b border-blue-500 pb-4">
        <img
          src="https://via.placeholder.com/60"
          alt="company img"
          className="w-16 h-16 rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold">Company Name</h2>
      </div>

      <div>
        <h3 className="text-lg font-medium">Website</h3>
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          https://example.com
        </a>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Report Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-2xl font-bold block">458</span>
            <span>Total Reports Received</span>
          </div>
          <div>
            <span className="text-2xl font-bold block">1</span>
            <span>Assets in Scope</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-2xl font-bold block">$100 - $200</span>
            <span>Bounty Range</span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <CTAButton text="Submit Report" />
      </div>
    </section>
  )
}

export default ProgramBox
