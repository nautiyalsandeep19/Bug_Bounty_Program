import React, { useState } from 'react';
import { ChevronDown, ChevronUp, LayoutDashboard, Building, Server, Users ,Compass ,ChartArea } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin' };

  

  const [activeTab, setActiveTab] = useState('');

  const menuItems = [
    {
      label: 'Programs',
      key: 'program', 
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Company',
      key: 'allcompany',
      icon: <Building className="w-5 h-5" />,
    },
    {
      label: 'Assets',
      key: 'assets',
      icon: <Server className="w-5 h-5" />,
    },
    {
      label: 'Hacker',
      key: 'allhacker',
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Challanges',
      key: 'challanges',
      icon: <ChartArea className="w-5 h-5" />,
    },
  ];

  const subTabs = ['List','Add', 'Edit'];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-md p-6">
        <h5 className=" text-start mt-10 font-bold mb-8 text-gray-400 flex "><Compass className="w-4 h-4 mt-1 mr-2"/>{user?.name}</h5>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveTab(activeTab === item.key ? '' : item.key)}
                className="flex items-center justify-between w-full py-2 text-left rounded-lg hover:bg-gray-100 transition-all"
              >
                <span className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {activeTab === item.key ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

             {activeTab === item.key && (
  <ul className="mt-2 pl-6 border-l-2 border-blue-100 space-y-2">
    {subTabs.map((sub) => (
      <li key={sub}>
        <Link
          to={`/admin/${item.key}${sub.toLowerCase()}`}
          className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 hover:font-bold transition-all duration-150 transform hover:scale-[1.02]"
        >
          {sub} {item.label}
        </Link>
      </li>
    ))}
  </ul>
)}
            </li>
          ))}
        </ul>
      </aside>

      
    <main className="flex-1 p-10">
  <div className=" p-8 mb-8">
    <h1 className="text-3xl font-semibold mb-3 text-gray-800">
      Welcome, <span className="text-gray-400">{user?.name}</span> !!
    </h1>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-t-4 border-blue-500">
      <h2 className="text-sm font-medium text-gray-500">Total Programs</h2>
      <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-t-4 border-green-500">
      <h2 className="text-sm font-medium text-gray-500">Total Assets</h2>
      <p className="text-3xl font-bold text-green-600 mt-2">24</p>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-t-4 border-yellow-500">
      <h2 className="text-sm font-medium text-gray-500">Total Companies</h2>
      <p className="text-3xl font-bold text-yellow-600 mt-2">7</p>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-t-4 border-red-500">
      <h2 className="text-sm font-medium text-gray-500">Total Hackers</h2>
      <p className="text-3xl font-bold text-red-600 mt-2">154</p>
    </div>
  </div>
</main>

    </div>
  );
};

export default AdminDashboard;
