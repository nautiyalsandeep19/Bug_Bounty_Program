import React from "react";
import { useNavigate } from "react-router-dom";

const ProgramCard = ({ program }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#0f172a] text-white max-w-md w-full mx-auto rounded-2xl border border-[#1e293b] p-8 shadow-lg hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/program/${program.slug}`)}
    >
      {/* Icon Circle */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-[#1e293b] shadow-inner">
          <img
            src={program.logo}
            alt={program.name}
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {program.tags.map((tag, idx) => (
          <span
            key={idx}
            className={`text-xs px-4 py-1 rounded-full font-semibold tracking-wide shadow-sm ${
              tag === "Bounty"
                ? "bg-[#e37a42] text-white"
                : tag === "Thanks"
                ? "bg-green-600 text-white"
                : tag === "Managed"
                ? "bg-yellow-500 text-black"
                : "bg-blue-500 text-white"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Program Info */}
      <div className="text-center">
        <h3 className="text-xl font-extrabold mb-1">{program.name}</h3>
        <p className="text-sm text-gray-400 italic">{program.slug}</p>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-blue-400/50 transition">
          View Program
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
