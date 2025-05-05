import React from 'react'

const Tab = ({ field, setField }) => {
  const tabData = [
    { id: 1, tabName: 'hacker' },
    { id: 2, tabName: 'company' },
  ]
  return (
    <div className="flex bg-gray-800 p-1 gap-x-1 my-6 rounded-full w-fit mx-auto cursor-pointer shadow-inner">
      {tabData.map((tab) => (
        <div
          key={tab?.id}
          onClick={() => setField(tab.tabName)}
          className={`${
            field === tab.tabName
              ? 'bg-blue-600 text-white'
              : 'bg-transparent text-gray-300'
          } py-2 px-6 rounded-full transition-colors duration-300 text-sm font-medium`}
        >
          {tab?.tabName}
        </div>
      ))}
    </div>
  )
}

export default Tab
