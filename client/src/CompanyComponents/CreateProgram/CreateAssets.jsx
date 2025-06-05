import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Link } from 'react-router'
import {
  addAssetIdForCompany,
  getAssetIdsForCompany,
} from '../LocalStorage/localStorageAssets'
import { use } from 'react'
import JoditEditor from 'jodit-react'

const CreateAssets = ({ updateScope }) => {
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const STATIC_COMPANY_ID = '6652f1a1f57c9c48e16b3400'
  const Vite_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL

  const [STATIC_PROGRAM_ID, SET_STATIC_PROGRAM_ID] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchProgramId = () => {
        const storeId = String(localStorage.getItem('programId'))
        SET_STATIC_PROGRAM_ID(storeId)
      }
      fetchProgramId()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const storeId = String(localStorage.getItem('programId') || '')
    SET_STATIC_PROGRAM_ID(storeId)
  }, [])

  useEffect(() => {
    if (STATIC_PROGRAM_ID) {
      setFormData((prev) => ({ ...prev, programId: STATIC_PROGRAM_ID }))
    }
  }, [STATIC_PROGRAM_ID])

  //   const companyId = localStorage.getItem('companyId');

  const [formData, setFormData] = useState({
    assetURL: '',
    assetDescription: '',
    assetType: 'website',
    labels: [],
    scopeGroupLabels: [],
    scopeGroupType: 'In Scope',
    company: STATIC_COMPANY_ID,
    programId: STATIC_PROGRAM_ID || '',
  })

  const [assets, setAssets] = useState([])

  const allLabelOptions = [
    { value: 'production', label: 'Production' },
    { value: 'development', label: 'Development' },
    { value: 'staging', label: 'Staging' },
    { value: 'testing', label: 'Testing' },
    { value: 'qa', label: 'QA' },
    { value: 'devops', label: 'DevOps' },
  ]

  const allScopeGroupLabelOptions = [
    { value: 'api cluster', label: 'API Cluster' },
    { value: 'payment gateway', label: 'Payment Gateway' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'microservices', label: 'Microservices' },
  ]

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(
          `${Vite_BACKEND_HOST_URL}/api/assets?programId=${STATIC_PROGRAM_ID}`,
          {
            withCredentials: true,
          }
        )
        if (response.data.success) {
          setAssets(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching assets:', error)
      }
    }
    fetchAssets()
  }, [STATIC_PROGRAM_ID])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLabelsChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      labels: selected ? selected.map((option) => option.value) : [],
    }))
  }

  const handleScopeGroupLabelsChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      scopeGroupLabels: selected ? selected.map((option) => option.value) : [],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${Vite_BACKEND_HOST_URL}/api/assets`,
        formData
      )
      alert('Asset created successfully!')

      const newAssetId = response.data.data._id
      const companyId = STATIC_COMPANY_ID
      updateScope((prevScope) => [...prevScope, newAsset])
      addAssetIdForCompany(companyId, newAssetId)

      setFormData({
        assetURL: '',
        assetDescription: '',
        assetType: 'website',
        labels: [],
        scopeGroupLabels: [],
        scopeGroupType: 'In Scope',
        company: STATIC_COMPANY_ID,
        programId: STATIC_PROGRAM_ID || '',
      })

      const refreshed = await axios.get(`${Vite_BACKEND_HOST_URL}/api/assets`)
      if (refreshed.data.success) {
        setAssets(refreshed.data.data)
      }
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Error creating asset')
    }
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl w-full mx-auto mt-10 bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 gap-6">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-300 pb-4 lg:pb-0 lg:pr-4 max-h-[300px] lg:max-h-[550px] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
          Assets
        </h2>
        {assets.length === 0 ? (
          <p className="text-gray-500">No assets found.</p>
        ) : (
          <ul className="space-y-3">
            {assets.map((asset) => (
              <li
                key={asset._id}
                className="p-2 border rounded bg-gray-50 cursor-pointer"
              >
                <a
                  href={asset.assetURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm break-all"
                  title={asset.assetURL}
                >
                  {asset.assetURL}
                </a>
                <p className="text-xs text-gray-700">{asset.assetType}</p>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main Form */}
      <main className="w-full lg:w-2/3">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
          Asset Management
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Add new assets to your system
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h1 className="text-gray-900 text-sm font-semibold pl-2">
              Asset URL
            </h1>
            <input
              type="text"
              name="assetURL"
              value={formData.assetURL}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400"
              placeholder="https://example.com"
            />
          </div>

          {/* 
      <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/> */}

          <div>
            <h1 className="text-gray-900 text-sm font-semibold pl-2">
              Asset Description
            </h1>
            <textarea
              name="assetDescription"
              value={formData.assetDescription}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400"
              rows={3}
              placeholder="Detailed description of the asset"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-black text-sm font-medium mb-1">
                Asset Type
              </label>
              <select
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                className="w-full text-black border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="website">Website</option>
                <option value="api">API</option>
                <option value="mobile android">Mobile Android</option>
                <option value="mobile ios">Mobile iOS</option>
                <option value="hardware">Hardware</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-black text-sm font-medium mb-1">
                Labels
              </label>
              <Select
                isMulti
                name="labels"
                options={allLabelOptions}
                value={allLabelOptions.filter((option) =>
                  formData.labels.includes(option.value)
                )}
                onChange={handleLabelsChange}
                className="react-select-container text-black"
                classNamePrefix="react-select"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Scope Group Labels
              </label>
              <Select
                isMulti
                name="scopeGroupLabels"
                options={allScopeGroupLabelOptions}
                value={allScopeGroupLabelOptions.filter((option) =>
                  formData.scopeGroupLabels.includes(option.value)
                )}
                onChange={handleScopeGroupLabelsChange}
                className="react-select-container text-black"
                classNamePrefix="react-select"
              />
            </div>

            <div>
              <label className="block text-sm text-black font-medium mb-1">
                Scope Group Type
              </label>
              <select
                name="scopeGroupType"
                value={formData.scopeGroupType}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="In Scope">In Scope</option>
                <option value="Out Scope">Out Scope</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-black text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Submit Asset
            </button>
            <button
              type="button"
              className="w-full sm:w-1/2 border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() =>
                setFormData({
                  assetURL: '',
                  assetDescription: '',
                  assetType: 'website',
                  labels: [],
                  scopeGroupLabels: [],
                  scopeGroupType: 'In Scope',
                  company: STATIC_COMPANY_ID,
                  programId: STATIC_PROGRAM_ID,
                })
              }
            >
              Create New
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreateAssets
