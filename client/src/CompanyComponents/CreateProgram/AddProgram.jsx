import React, { useState, useEffect } from 'react'
import CreateAssets from './CreateAssets'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
// Steps labels
const stepsList = [
  'Program Username',
  'Define Scope',
  'Participation Guidelines',
  'Specific Areas of Concern',
  'Program Policy',
  'Additional Details',
  'Brand Program',
  'Schedule Launch',
  'Review & Submit',
]

// Step components
const Step1_ProgramUsername = ({ data, updateData }) => (
  <div className="mb-8">
    <label
      htmlFor="programName"
      className="text-lg font-medium text-gray-900 block mb-2"
    >
      📝 Program Name
    </label>
    <input
      id="programName"
      type="text"
      value={data.programName || ''}
      onChange={(e) => updateData({ programName: e.target.value })}
      placeholder="e.g. SecureBug Program"
      className="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    />
  </div>
)

const Step2_DefineScope = ({ data, updateData }) => (
  <CreateAssets
    programData={data}
    updateScope={(assets) => updateData({ scope: assets })}
  />
)

const Step3_ParticipationGuidelines = ({ data, updateData }) => (
  <div className="mb-6">
    <label
      htmlFor="guidelines"
      className="block text-gray-800 font-semibold mb-2 text-lg"
    >
      Guidelines
    </label>
    <textarea
      id="guidelines"
      value={data.guidelines || ''}
      onChange={(e) => updateData({ guidelines: e.target.value })}
      placeholder="Participation Guidelines"
      rows={5}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-y
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition"
    />
  </div>
)

const Step4_SpecificConcerns = ({ data, updateData }) => (
  <div className="mb-6">
    <label
      htmlFor="concerns"
      className="block text-gray-800 font-semibold mb-2 text-lg"
    >
      Specific Concerns
    </label>
    <textarea
      id="concerns"
      value={data.concerns || ''}
      onChange={(e) => updateData({ concerns: e.target.value })}
      placeholder="Enter Specific Concerns"
      rows={5}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-y
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition"
    />
  </div>
)

const Step5_ProgramPolicy = ({ data, updateData }) => (
  <div className="mb-6">
    <label
      htmlFor="programPolicy"
      className="block text-gray-800 font-semibold mb-2 text-lg"
    >
      Program Policy
    </label>
    <textarea
      id="programPolicy"
      value={data.programPolicy || ''}
      onChange={(e) => updateData({ programPolicy: e.target.value })}
      placeholder="Write your program policy here..."
      rows={6}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-y
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition"
    />
  </div>
)

const Step6_AdditionalDetails = ({ data, updateData }) => (
  <div className="mb-6">
    <label
      htmlFor="additionalDetails"
      className="block text-gray-800 font-semibold mb-2 text-lg"
    >
      Additional Details
    </label>
    <textarea
      id="additionalDetails"
      value={data.additionalDetails || ''}
      onChange={(e) => updateData({ additionalDetails: e.target.value })}
      placeholder="Enter Additional Details"
      rows={5}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-y
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition"
    />
  </div>
)

const Step7_BrandProgram = ({ data, updateData }) => {
  // Extract brand object or initialize
  const brand = data.brand || {
    programName: '',
    programTagline: '',
    programWebsite: '',
    programDescription: '',
  }

  // Handler for brand input updates
  const updateBrandData = (field, value) => {
    updateData({ brand: { ...brand, [field]: value } })
  }

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="brandProgramName"
          className="block text-gray-800 font-semibold mb-2 text-lg"
        >
          Program Name
        </label>
        <input
          id="brandProgramName"
          type="text"
          value={brand.programName}
          onChange={(e) => updateBrandData('programName', e.target.value)}
          placeholder="Enter Program Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="programTagline"
          className="block text-gray-800 font-semibold mb-2 text-lg"
        >
          Program Tagline
        </label>
        <input
          id="programTagline"
          type="text"
          value={brand.programTagline}
          onChange={(e) => updateBrandData('programTagline', e.target.value)}
          placeholder="Enter Program Tagline"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="programWebsite"
          className="block text-gray-800 font-semibold mb-2 text-lg"
        >
          Program Website
        </label>
        <input
          id="programWebsite"
          type="url"
          value={brand.programWebsite}
          onChange={(e) => updateBrandData('programWebsite', e.target.value)}
          placeholder="Enter Program Website URL"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="programDescription"
          className="block text-gray-800 font-semibold mb-2 text-lg"
        >
          Program Description
        </label>
        <textarea
          id="programDescription"
          value={brand.programDescription}
          onChange={(e) =>
            updateBrandData('programDescription', e.target.value)
          }
          placeholder="Enter Program Description"
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-y
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition"
        />
      </div>

      <div className="mb-6">
        {/* <label className="block text-gray-800 font-semibold mb-2 text-lg">Brand Logo:</label>
        <input
          type="file"
          onChange={(e) => updateBrandData("brandLogo", e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        /> */}
      </div>
    </div>
  )
}

const Step8_ScheduleLaunch = ({ data, updateData }) => (
  <div className="mb-6">
    <label className="block text-gray-800 font-semibold mb-2 text-lg">
      Start Date:
    </label>
    <input
      type="date"
      value={data.startDate || ''}
      onChange={(e) => updateData({ startDate: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-lg shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    <label className="block text-gray-800 font-semibold mb-2 text-lg">
      End Date:
    </label>
    <input
      type="date"
      value={data.endDate || ''}
      onChange={(e) => updateData({ endDate: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>
)

const Step9_ReviewAndSubmit = ({ data, onSubmit }) => {
  // We need to show brandLogo as file name if exists to avoid dumping raw file object
  const displayData = { ...data }
  // if (displayData.brand && displayData.brand.brandLogo) {
  //   displayData.brand = {
  //     ...displayData.brand,
  //     brandLogo: displayData.brand.brandLogo.name || "Uploaded file",
  //   };
  // }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Your Program</h2>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto max-h-96">
        {JSON.stringify(displayData, null, 2)}
      </pre>
      <button
        onClick={onSubmit}
        className="mt-6 bg-green-600 hover:bg-green-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow-md"
      >
        Submit Program
      </button>
    </div>
  )
}

// Main component
const CreateProgram = () => {
  const [step, setStep] = useState(0)
  const [programData, setProgramData] = useState({})
  const navigate = useNavigate()
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL

  const location = useLocation()
  useEffect(() => {
    if (location.pathname !== '/addprogram') {
      localStorage.clear()
    }
  }, [location.pathname])

  // Load from localStorage on mount
  useEffect(() => {
    let previousAssets = localStorage.getItem('assets')

    const interval = setInterval(() => {
      const currentAssets = localStorage.getItem('assets')

      if (currentAssets && currentAssets !== previousAssets) {
        const storedData = localStorage.getItem('programData')
        const selectedProgramType = localStorage.getItem('selectedProgramType')

        let updatedData = {}
        if (storedData) {
          updatedData = JSON.parse(storedData)
        }

        updatedData.scope = JSON.parse(currentAssets)
        if (selectedProgramType) {
          updatedData.type = selectedProgramType
        }

        setProgramData(updatedData)
        previousAssets = currentAssets
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    localStorage.setItem('programData', JSON.stringify(programData))
  }, [programData])

  const updateData = (newData) =>
    setProgramData((prev) => ({ ...prev, ...newData }))

  const initialCreation = async () => {
    const selectedProgramType = localStorage.getItem('selectedProgramType')
    const storedData = localStorage.getItem('programData')
    const programData = storedData ? JSON.parse(storedData) : {}
    const STATIC_COMPANY_ID = '6652f1a1f57c9c48e16b3400'
    try {
      const payload = {
        type: selectedProgramType,
        title: programData.programName,
        company: STATIC_COMPANY_ID,
      }

      const response = await axios.post(
        'http://localhost:8000/api/programs',
        payload
      )
      localStorage.setItem('programId', response.data.data._id)
    } catch (error) {
      console.error(
        'Error creating program:',
        error.response?.data || error.message
      )
    }
  }

  const updateProgramData = async () => {
    const programId = localStorage.getItem('programId')
    if (!programId) return console.error('Program ID not found.')

    try {
      const programData = JSON.parse(
        localStorage.getItem('programData') || '{}'
      )
      const formData = new FormData()

      // Add simple fields
      ;[
        ['programName', 'programName'],
        ['guidelines', 'guidelines'],
        ['concerns', 'concerns'],
        ['policy', 'policy'],
        ['additionalDetails', 'additionalDetails'],
        ['type', 'type'],
        ['startDate', 'startDate'],
        ['endDate', 'endDate'],
      ].forEach(([key, formKey]) => {
        if (programData[key] !== undefined) {
          formData.append(formKey, programData[key])
        }
      })

      // Handle scope and brand carefully
      if (programData.scope) {
        formData.append(
          'scope',
          typeof programData.scope === 'string'
            ? programData.scope
            : JSON.stringify(programData.scope)
        )
      }

      if (programData.brand) {
        formData.append(
          'brand',
          typeof programData.brand === 'string'
            ? programData.brand
            : JSON.stringify(programData.brand)
        )
      }

      const response = await axios.put(
        `${VITE_BACKEND_HOST_URL}/api/programs/update/${programId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      console.log('✅ Program updated:', response.data)
      alert('Program updated successfully!')
      localStorage.clear()
      navigate('/programs')
    } catch (error) {
      console.error('❌ Update error:', error.response?.data || error.message)
      alert('Error updating program.')
    }
  }

  const steps = [
    Step1_ProgramUsername,
    Step2_DefineScope,
    Step3_ParticipationGuidelines,
    Step4_SpecificConcerns,
    Step5_ProgramPolicy,
    Step6_AdditionalDetails,
    Step7_BrandProgram,
    Step8_ScheduleLaunch,
    Step9_ReviewAndSubmit,
  ]

  const CurrentStep = steps[step]

  return (
    <div className="max-w-full h-[100vh] text-black mx-auto p-8 bg-white rounded-lg shadow-lg flex">
      {/* Step Indicators - vertical on left */}
      <div className="w-1/4 pr-6">
        <ol className="flex flex-col mt-[200px] text-xs sm:text-sm font-medium text-gray-500 space-y-4">
          {stepsList.map((label, index) => (
            <li
              key={label}
              className={`pb-1 border-l-4 pl-3 ${
                index === step
                  ? 'text-blue-600 border-blue-600 font-semibold'
                  : 'border-gray-300'
              }`}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>

      {/* Main content */}
      <div className="w-3/4">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
          Create Bug Bounty Program
        </h1>

        {/* Step Form */}
        <div className="mb-8">
          <CurrentStep
            data={programData}
            updateData={updateData}
            onSubmit={updateProgramData}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            disabled={step === 0}
            onClick={() => setStep((prev) => prev - 1)}
            className={`px-6 py-3 rounded-lg shadow-md font-semibold transition ${
              step === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => {
                if (step === 0) {
                  initialCreation()
                }
                setStep((prev) => prev + 1)
              }}
              className="px-6 py-3 rounded-lg shadow-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CreateProgram
