// import { useState } from 'react'
// import Policy from '../Tabs/Policy'
// import Scope from '../Tabs/Scope'
// import Announcements from '../Tabs/Announcements'
// import HallOfFame from '../Tabs/HallOfFame'
// import { useParams } from 'react-router'


// const tabs = [
//   { label: 'POLICY', key: 'policy' },
//   { label: 'SCOPE', key: 'scope' },
//   { label: 'ANNOUNCEMENTS', key: 'announcements' },
//   { label: 'HALL OF FAME', key: 'hallOfFame' },
// ]

// export default function ProgramTabs() {
//   const programId = useParams().programId

//   const [activeTab, setActiveTab] = useState('policy')

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'policy':
//         return <Policy />
//       case 'scope':
//         return <Scope />
//       case 'announcements':
//         return <Announcements />
//       case 'hallOfFame':
//         return <HallOfFame/>
//       default:
//         return null
//     }
//   }

//   return (
//     <div className=" mt-2 mx-auto p-4">
//       {/* Tabs Navigation */}
//       <div className="flex-1 h-[70px] space-x-6 border-b bg-black border-gray-300 mb-6 sticky top-[-30px] z-10">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`pb-2 text-sm md:text-base border-b-2 ${
//               activeTab === tab.key
//                 ? 'border-blue-500 text-blue-600 font-semibold'
//                 : 'border-transparent text-gray-600 hover:text-blue-600'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Scrollable Content Area */}
//       <div className="bg-white p-6 h-[85vh] rounded shadow overflow-y-auto">
//         {renderTabContent()}
//       </div>
//     </div>
//   )
// }


import { useState } from 'react';
import Policy from '../Tabs/Policy';
import Scope from '../Tabs/Scope';
import Announcements from '../Tabs/Announcements';
import HallOfFame from '../Tabs/HallOfFame';
import { useParams } from 'react-router';

const tabs = [
  { label: 'POLICY', key: 'policy' },
  { label: 'SCOPE', key: 'scope' },
  { label: 'ANNOUNCEMENTS', key: 'announcements' },
  { label: 'HALL OF FAME', key: 'hallOfFame' },
];

export default function ProgramTabs() {
  const [activeTab, setActiveTab] = useState('policy');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'policy':
        return <Policy />;
      case 'scope':
        return <Scope />;
      case 'announcements':
        return <Announcements />;
      case 'hallOfFame':
        return <HallOfFame />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-2 mx-auto p-4">
      <div className="flex h-[70px] space-x-6 border-b bg-black border-gray-300 mb-6 sticky top-0 z-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-sm md:text-base border-b-2 ${
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600 font-semibold'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 h-[85vh] rounded shadow overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}
