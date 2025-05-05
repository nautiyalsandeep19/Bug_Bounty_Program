import React from 'react'
import { useParams } from "react-router-dom"
import { PROGRAMS } from "../../../assets/assets"

const ProgramHeader = () => {

  const { slug } = useParams()
  const program = PROGRAMS.find((p) => p.slug === slug)

  if (!program) {
    return <div className="p-4">Program not found.</div>
  }


  return (
    <div className="max-w-7xl mx-auto p-4 bg-white flex flex-col rounded shadow mt-4">
      <div className="flex items-center gap-6">
        <img src={program.logo} alt={program.name} className="h-24 w-24" />
        <div>
          <h1 className="text-2xl font-bold">{program.name}</h1>
          <p className="text-gray-600">{`https://${program.slug}.in`}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mt-6">
  <h2 className="text-sm mb-5 flex font-semibold text-gray-400">Report Statistics</h2>

  <div className="flex justify-between text-center mb-4">
    <div>
      <p className="text-xl font-medium">454</p>
      <p className="text-sm text-gray-400">Total Reports Received</p>
    </div>
    <div>
      <p className="text-xl font-medium">1</p>
      <p className="text-sm text-gray-400">Assets in Scope</p>
    </div>
    <div>
      <p className="text-xl font-medium">$100 - $500</p>
      <p className="text-sm text-gray-400">Bounty Range</p>
    </div>
  </div>

  <div className="flex flex-wrap gap-1 -mt-2">
    {program.tags.map((tag, idx) => (
      <span
        key={idx}
        className={`text-xs px-3 py-1.5 rounded-full border ${
          tag === "Bounty"
            ? "bg-[#e37a42] text-white"
            : tag === "Thanks"
            ? "bg-[#05ae01] text-white"
            : tag === "Managed"
            ? "bg-yellow-500 text-white"
            : tag === "Self-Managed"
            ? "bg-[#4193df] text-white"
            : "bg-gray-400 text-white"
        }`}
      >
        {tag}
      </span>
    ))}
  </div>
</div>

      <button className="mt-6  w-[200px] text-center  px-2 py-2 bg-green-600 text-white rounded">
        Submit Report
      </button>
    </div>
  )
}

export default ProgramHeader