import { useState, useEffect } from "react";
import ProgramCard from "./ProgramCard";
import { Link } from "react-router-dom"; // Fixed import (should be react-router-dom)

const ProgramList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const companyId = "6652f1a1f57c9c48e16b3400";
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;

  useEffect(() => {
    const fetchProgramsByCompany = async () => {
      try {
        setLoading(true); // Set loading to true when fetch starts
        const res = await fetch(`${VITE_BACKEND_HOST_URL}/api/programs/companyPrograms/${companyId}`);
        const data = await res.json();

        console.log("API Response:", data.data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch programs");
        }

        setPrograms(data.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchProgramsByCompany();
  }, []);

  const filtered = programs.filter((program) => {
    const matchesSearch = program.title?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || program.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Loading state UI
  if (loading) {
    return (
      <div className="w-full p-4 flex justify-center items-center h-64">
        <div className="animate-spin mt-150 rounded-full h-40 w-40 border-t-1 border-white">
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-500">
        <p>Error loading programs: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

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

        <div className="flex gap-2">
          <Link className="border px-4 py-2 rounded-full hover:bg-gray-600 transition" to="/addprogram">
            Create Program
          </Link>
          {/* <Link className="border px-4 py-2 rounded-full hover:bg-gray-600 transition" to="/addassets">
            Add Assets
          </Link> */}
        </div>

        <select
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="VDP">VDP</option>
          <option value="Private Bug Bounty">Private Bug Bounty</option>
          <option value="Public Bug Bounty">Public Bug Bounty</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {search || filter !== "All" 
            ? "No programs match your search criteria" 
            : "No programs available"}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((program) => (
            <ProgramCard key={program._id} program={program} /> 
          ))
          }
        </div>
      )}
    </div>
  );
};

export default ProgramList;