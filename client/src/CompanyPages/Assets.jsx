import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const Vite_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(`${Vite_BACKEND_HOST_URL}/api/assets`);
        if (response.data.success) {
          setAssets(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };
    fetchAssets();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 h-[90vh] rounded-lg shadow-lg mt-10 bg-gray-900">
  <h2 className="text-2xl flex justify-between font-extrabold text-white mb-8 border-b border-gray-700 pb-2">
    Manage Assets
     <Link to={'/addassets'} className="border p-1 px-5 bg-white text-black text-sm rounded-full">Add Assets</Link>
  </h2>

 

  {assets.length === 0 ? (
    <p className="text-gray-400 text-center">No assets found.</p>
  ) : (
    <div className="space-y-6 max-h-[79vh] max-w-full overflow-y-auto pr-2 ">
      {assets.map((asset, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 rounded-lg p-4 shadow-md transform hover:scale-95 hover:shadow-xl transition-shadow duration-300 "
        >
          <p className="text-white font-semibold break-words max-w-full">
            <span className="text-gray-400 mr-2">URL:</span> {asset.assetURL}
          </p>

          <span className="mt-2 sm:mt-0 inline-block bg-gray-600 text-indigo-100 text-sm font-medium px-4 py-1 rounded-full shadow-sm">
            {asset.assetType}
          </span>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default Assets;
