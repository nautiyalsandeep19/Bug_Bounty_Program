import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllPrograms, getPrivatePrograms } from '../Services/programsApi';

const ProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('allPrograms');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = async (type) => {
    setLoading(true);
    try {
      let data = null;
      if (type === 'allPrograms') {
        data = await getAllPrograms();
        console.log("Data from all programs: ",data)
      } else if (type === 'privatePrograms') {
        data = await getPrivatePrograms();
        console.log("Data from private programs: ",data)

      }

      if (data) {
        setPrograms(data);
      } else {
        setPrograms([]);
      }
    } catch (err) {
      console.error('Error fetching programs:', err);
      toast.error('Failed to fetch programs');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms(activeTab);
  }, [activeTab]);

  const renderTag = (type) => {
    switch (type) {
      case 'Bug Bounty':
        return <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Bug Bounty</span>;
      case 'Vulnerability Disclosure':
        return <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">Vulnerability Disclosure</span>;
      default:
        return <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">{type}</span>;
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-semibold mb-2">Programs</h2>
      <p className="mb-6 text-sm text-gray-400">
        Discover opportunities in live programs and contribute to security initiatives.
      </p>

      {/* Tabs */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setActiveTab('allPrograms')}
          className={`pb-2 border-b-2 ${
            activeTab === 'allPrograms' ? 'border-green-500 text-green-500' : 'border-transparent'
          }`}
        >
          Programs
        </button>
        <button
          onClick={() => setActiveTab('privatePrograms')}
          className={`pb-2 border-b-2 ${
            activeTab === 'privatePrograms' ? 'border-green-500 text-green-500' : 'border-transparent'
          }`}
        >
          Private Programs
        </button>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div
              key={program._id}
              className="bg-[#1e1e1e] rounded-xl p-4 shadow-md border border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                {renderTag(program.type)}
                <div className="text-xs text-white">Managed</div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                {program.logo ? (
                  <img
                    src={program.logo}
                    alt="logo"
                    className="w-10 h-10 rounded-full bg-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold">
                    {program.title[0]}
                  </div>
                )}
                <div>
                  <div className="text-lg font-semibold">{program.title}</div>
                  <div className="text-sm text-gray-400">
                    {program.company?.name || 'Unknown Company'}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                {/* Tags (hardcoded here for simplicity) */}
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">Bounty</span>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Thanks</span>
              </div>
              <button className="w-full mt-auto bg-gray-800 text-white text-sm py-2 rounded hover:bg-gray-700">
                View Program
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramsPage;
