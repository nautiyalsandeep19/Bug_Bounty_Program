import React, { useState } from 'react'

const CompanyLeaderBoard = () => {
  const [showModal, setShowModal] = useState(false)
  const [campaignName, setCampaignName] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedObjective, setSelectedObjective] = useState('')

  const programs = [
    { id: '1', name: 'Program A' },
    { id: '2', name: 'Program B' },
    { id: '3', name: 'Program C' },
  ]

  const objectives = [
    {
      id: '1',
      title: 'Welcome new hackers',
      description:
        'Use this objective to reward hackers submitting their first valid report to your program',
      audience:
        'Security researchers who are submitting their first valid report to your program',
    },
    {
      id: '2',
      title: 'Re-engage security researchers',
      description:
        'Use this objective to re-engage security researchers already in your program',
      audience:
        'Security researchers who stopped submitting reports to your program',
    },
    {
      id: '3',
      title: 'Recognise top security researchers',
      description:
        'Use this objective to retain the top hackers in your program',
      audience: 'Top security researchers in your program',
    },
    {
      id: '4',
      title: 'Engagement boost',
      description:
        'Use this objective to boost all types of engagement from all security researchers',
      audience: 'All security researchers',
    },
  ]

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-500">Campaigns</h1>
        <p className="text-gray-500 text-sm">
          Create and manage campaigns for your programs.
        </p>
      </div>

      {/* Subheader */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-500">
          Manage Campaigns (0)
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-600 hover:bg-gray-700 text-sm text-white font-bold rounded-full px-4 py-2 "
        >
          New Campaign
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Campaign name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Program
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Objective
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Start date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  End date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total reports
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Empty state */}
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                >
                  No Data
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Campaign Identifier</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter campaign name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Select Program</h3>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Program</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
                {!selectedProgram && (
                  <p className="text-sm text-gray-500 mt-1">
                    Please select a program
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Select Your Objective
                </h3>
                <div className="space-y-4">
                  {objectives.map((objective) => (
                    <div
                      key={objective.id}
                      onClick={() => setSelectedObjective(objective.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedObjective === objective.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <h4 className="font-medium text-lg">{objective.title}</h4>
                      <p className="text-gray-700 mt-1">
                        {objective.description}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Target audience:</span>{' '}
                        {objective.audience}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle form submission
                    setShowModal(false)
                  }}
                  disabled={
                    !campaignName || !selectedProgram || !selectedObjective
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyLeaderBoard
