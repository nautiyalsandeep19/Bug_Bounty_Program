import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCompanyDetails } from '../Services/companyApi'

const Dashboard = () => {
  const [company, setCompany] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCompany = async () => {
      const data = await dispatch(getCompanyDetails())
      if (data) {
        setUser(data)
      }
    }
    fetchCompany()
  }, [dispatch])

  if (!company) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg">Loading company details...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6">
      {/* Header */}
      <div className="flex items-center gap-6 bg-slate-900 p-6 rounded-2xl shadow-lg text-white">
        {company.image ? (
          <img
            src={company.image}
            alt="Company Logo"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
            {company.name?.charAt(0)}
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold mb-1">{company.name}</h1>
          <a
            href={`${company.domain}`}
            className="text-sm text-gray-300 underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.domain}
          </a>
        </div>
      </div>

      {/* Body Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Company Info */}
        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Company Info
          </h2>
          <p>
            <strong>Email:</strong> {company.email}
          </p>
          <p>
            <strong>Country:</strong> {company.country || 'N/A'}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {company.description || 'No description available.'}
          </p>
        </div>

        {/* Contact Person */}
        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Contact Person
          </h2>
          <p>
            <strong>Name:</strong>{' '}
            {company.contactPerson?.representative || 'N/A'}
          </p>
          <p>
            <strong>Position:</strong>{' '}
            {company.contactPerson?.position || 'N/A'}
          </p>
          <p>
            <strong>Phone:</strong> {company.contactPerson?.phone || 'N/A'}
          </p>
        </div>

        {/* Program Info */}
        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Program</h2>
          {company.programs ? (
            <p className="text-lg">{company.programs.title}</p>
          ) : (
            <p>No program assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
