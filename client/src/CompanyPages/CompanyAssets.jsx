import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CompanyAssets = () => {
  const [assets, setAssets] = useState([])
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL

  useEffect(() => {
    const fetchCompanyAssets = async () => {
      try {
        // Get company ID from localStorage or wherever you store it
        const user = localStorage.getItem('user')
        const companyId = user ? JSON.parse(user)._id : null
        // console.log('Company IDdassadsad:', companyId)
        
        if (!companyId) {
          console.error('Company ID not found')
          return
        }

        // console.log('Fetching assets for company ID:',`${VITE_BACKEND_HOST_URL}/api/assets/${companyId}` )

        const response = await axios.get(
          `${VITE_BACKEND_HOST_URL}/api/assets/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        // console.log('Response data:', response.data)

        if (response.data.success) {
          setAssets(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching company assets:', error)
      }
    }

    fetchCompanyAssets()
  }, [])
  return (
    <div className="max-w-5xl mx-auto p-6 h-[90vh] rounded-lg shadow-lg mt-10 bg-gray-900">
      <h2 className="text-2xl flex justify-between font-extrabold text-white mb-8 border-b border-gray-700 pb-2">
        Company Assets
        {/* <Link
          to={'/addassets'}
          className="border p-1 px-5 bg-white text-black text-sm rounded-full"
        >
          Add Assets
        </Link> */}
      </h2>

      {assets.length === 0 ? (
        <p className="text-gray-400 text-center mt-[300px]">No assets found for your company.</p>
      ) : (
        <div className="space-y-6 max-h-[79vh] max-w-full overflow-y-auto pr-2">
          {assets.map((asset) => (
            <div
              key={asset._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 rounded-lg p-4 shadow-md transform hover:bg-gray-700 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-1">
                <p className="text-white font-semibold break-words max-w-full">
                  <span className="text-gray-400 mr-2">URL:</span> {asset.assetURL}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  <span className="text-gray-400 mr-2">Type:</span> {asset.assetType}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex gap-2">
                {asset.labels?.map((label, i) => (
                  <span key={i} className="bg-gray-600 text-indigo-100 text-xs font-medium px-2 py-1 rounded-full">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CompanyAssets