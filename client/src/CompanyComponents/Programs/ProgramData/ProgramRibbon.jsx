import { useState } from 'react'
import Policy from '../Tabs/Policy'
import Scope from '../Tabs/Scope'
import Announcements from '../Tabs/Announcements'
import HallOfFame from '../Tabs/HallOfFame'

const tabs = [
  { label: 'POLICY', key: 'policy' },
  { label: 'SCOPE', key: 'scope' },
  { label: 'ANNOUNCEMENTS', key: 'announcements' },
  { label: 'HALL OF FAME', key: 'hallOfFame' },
]

export default function ProgramTabs() {
  const [activeTab, setActiveTab] = useState('policy')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'policy':
        return <Policy />
      case 'scope':
        return <Scope />
      case 'announcements':
        return <Announcements />
      case 'hallOfFame':
        return <HallOfFame />
      default:
        return null
    }
  }

  return (
    <div className="mt-2 mx-auto p-4 w-full">
      {/* Tabs Header */}
      <div className="flex flex-wrap justify-start md:justify-start h-auto min-h-[80px] space-x-4 md:space-x-6  static top-0 z-10 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={` text-sm md:text-base whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-b-1 border-white text-white font-semibold'
                : 'border-b-1 border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className=" p-4 sm:p-6 rounded shadow max-h-[75vh] overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  )
}
