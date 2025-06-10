import React from 'react';
import { useSelector } from 'react-redux';

const ProgramHeader = () => {
  const program = useSelector((state) => state.program.programData);

  if (!program) {
    return <div className="p-4 text-white">Program not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-6 bg-[#0b132b] rounded-2xl shadow-xl text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
        <img
          src={program.logo}
          alt={program?.title}
          className="h-24 w-24 rounded-full border-2 border-blue-400 p-1 bg-white"
        />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{program.title}</h1>
          {/* <p className="text-sm text-blue-300 mt-1">{`https://${program?.brand}.in`}</p> */}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center mb-3 sm:justify-start">
        {program.tags?.map((tag, idx) => (
          <span
            key={idx}
            className={`text-xs px-4 py-1.5 rounded-full font-medium uppercase tracking-wide ${
              tag === "Bounty"
                ? "bg-orange-600"
                : tag === "Thanks"
                ? "bg-green-600"
                : tag === "Managed"
                ? "bg-yellow-500"
                : tag === "Self-Managed"
                ? "bg-blue-600"
                : "bg-gray-500"
            } text-white`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Statistics */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/10 shadow-md">
        <h2 className="text-base font-semibold text-blue-200 mb-4 uppercase tracking-wide">Report Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
          <div>
            <p className="text-2xl font-bold">{program.totalReports || 0}</p>
            <p className="text-sm text-gray-300 mt-1">Total Reports Received</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{program.assets?.length || 0}</p>
            <p className="text-sm text-gray-300 mt-1">Assets in Scope</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              ${program.bountyRange?.low || 0} - ${program.bountyRange?.high || 0}
            </p>
            <p className="text-sm text-gray-300 mt-1">Bounty Range</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-start">
        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all duration-200">
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default ProgramHeader;
