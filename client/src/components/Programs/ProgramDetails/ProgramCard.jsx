import React from "react";
import { useNavigate } from 'react-router-dom'

const ProgramCard = ({ program }) => {

  const navigate = useNavigate()

    return (
      <div className="bg-white h-full w-[92%] rounded-lg shadow p-4 border" onClick={() => navigate(`/program/${program.slug}`)}>
        <div className={`h-40 rounded-t-md ${program.color} flex items-center justify-center `}>
          <img src={program.logo} alt={program.name} className="w-12 h-12 rounded-full" />
        </div>

        <div className="flex flex-wrap gap-1 mt-[-10px]">
            {program.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-xs px-3 ml-1 py-1.5 rounded-full border ${
                  tag === "Bounty"
                    ? "bg-[#e37a42] text-white"
                    : tag === "Thanks"
                    ? "bg-[#05ae01] text-white"
                    : tag === "Managed"
                    ? "bg-yellow-500 text-white"
                    : "bg-[#4193df] text-white"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

  
        <div className="mt-3 space-y-1">
          <h3 className="text-lg font-bold flex items-start">{program.name}</h3>
          <p className="text-gray-500 text-sm flex items-start">{program.slug}</p>
  
  
          <button className="mt-4 w-[80%] border rounded-md py-1.5 hover:bg-gray-100 font-medium text-sm">
            View Program
          </button>
        </div>
      </div>
    );
  };
  
  export default ProgramCard;
  