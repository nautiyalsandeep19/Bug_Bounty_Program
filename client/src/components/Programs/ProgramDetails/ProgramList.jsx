import { useState } from "react";
import { PROGRAMS } from "../../../assets/assets";
import ProgramCard from "./ProgramCard";
import { Link } from "react-router";

const ProgramList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = PROGRAMS.filter((program) => {
    const matchesSearch = program.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || program.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full p-4">
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search Programs"
        className="border px-4 py-2 rounded w-full md:w-1/4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    <Link className="border p-4 rounded-full" to={'/addprogram'}>Create Program</Link>

      <select
        className="border px-4 py-2 rounded w-full md:w-1/4"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Bug Bounty">Bug Bounty</option>
        <option value="Vulnerability Disclosure">Vulnerability Disclosure</option>
      </select>
    </div>
  
  
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filtered.map((program, i) => (
        <ProgramCard key={i} program={program} />
      ))}
    </div>
  </div>
  
  );
};

export default ProgramList;
