import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCompanyProfile } from '../Services/companyApi'
import Button from '../Components/Button/Button'

const ProfilDetails = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  console.log('User: ', user)

  const [edit, setEdit] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    representative: '',
    position: '',
    phone: '',
    domain: '',
  })

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        representative: user.contactPerson?.representative || '',
        position: user.contactPerson?.position || '',
        phone: user.contactPerson?.phone || '',
        domain: user.domain || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const { representative, position, phone, domain } = personalInfo
    dispatch(updateCompanyProfile(domain, representative, position, phone))
    setEdit(false)
  }

  const contactPerson = user?.contactPerson
  if (!user || !contactPerson) {
    return <div>No contact person information available.</div>
  }

  return (
    <div className="w-full bg-[#111f3a] text-white p-8 rounded-lg shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex flex-col gap-8">
      {/* Title Section */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        Personal Details
      </h2>

      {/* Non-editable fields section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col p-4 bg-[#1E293B] rounded-lg shadow-lg">
          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <h3 className="text-xl font-medium text-white mb-4">
              User Information
            </h3>
            <div className="flex gap-2">
              <img
                src={user?.image}
                alt=""
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-white">Name:</span>
              <span>{user?.name || 'N/A'}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-white">Email:</span>
              <span>{user?.email || 'N/A'}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-white">Country:</span>
              <span>{user?.country || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Editable fields section */}
        {edit ? (
          <div className="flex flex-col gap-6">
            <div className="p-4 bg-[#1E293B] rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-white mb-4">
                Edit Contact Person
              </h3>
              {['representative', 'position', 'phone', 'domain'].map(
                (field) => (
                  <div key={field} className="mb-4">
                    <label className="text-sm mb-2 block text-gray-400 capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={personalInfo[field] || ''}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                      className="w-full p-3 bg-[#0F172A] text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="p-4 bg-[#1E293B] rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-white mb-4">
                Contact Person Information
              </h3>
              <div className="flex flex-col gap-4 text-sm text-gray-400">
                {/* Display representative, position, and phone from contactPerson */}
                <div className="flex gap-2">
                  <span className="font-medium text-white capitalize">
                    Representative:
                  </span>
                  <span>{contactPerson.representative || 'N/A'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-white capitalize">
                    Position:
                  </span>
                  <span>{contactPerson.position || 'N/A'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-white capitalize">
                    Phone:
                  </span>
                  <span>{contactPerson.phone || 'N/A'}</span>
                </div>

                {/* Display domain separately */}
                <div className="flex gap-2">
                  <span className="font-medium text-white capitalize">
                    Domain:
                  </span>
                  <span>{user.domain || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit/Save Button */}
      <div className="flex justify-center mt-8">
        {edit ? (
          <Button
            onClick={handleSave}
            text="Save"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
          />
        ) : (
          <Button
            onClick={() => setEdit(true)}
            text="Edit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-all"
          />
        )}
      </div>
    </div>
  )
}

export default ProfilDetails
