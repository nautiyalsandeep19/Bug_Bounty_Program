import { useState } from 'react';
import Policy from '../Tabs/Policy';
import Scope from '../Tabs/Scope';
import Announcements from '../Tabs/Announcements';
import HallOfFame from '../Tabs/HallOfFame';

const tabs = [
  { label: "POLICY", key: "policy" },
  { label: "SCOPE", key: "scope" },
  { label: "ANNOUNCEMENTS", key: "announcements" },
  { label: "HALL OF FAME", key: "hallOfFame" },
];

export default function ProgramTabs() {
  const [activeTab, setActiveTab] = useState("policy");

  const renderTabContent = () => {
    switch (activeTab) {
      case "policy": return <Policy />;
      case "scope": return <Scope />;
      case "announcements": return <Announcements />;
      case "hallOfFame": return <HallOfFame />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mt-10 mx-auto p-4">
      <div className="flex space-x-6 border-b border-gray-300 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-sm md:text-base border-b-2 ${
              activeTab === tab.key
                ? "border-green-500 text-green-600 font-semibold"
                : "border-transparent text-gray-600 hover:text-green-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow">
        {renderTabContent()}
      </div>
    </div>
  );
}
