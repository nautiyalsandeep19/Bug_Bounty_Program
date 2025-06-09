import React, { useState, useEffect } from "react";
import CreateAssets from "./CreateAssets";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from "axios";

// Steps labels
const stepsList = [
  "Program Username",
  "Define Scope",
  "Participation Guidelines",
  "Specific Areas of Concern",
  "Program Policy",
  "Bounty Range",
  "Additional Details",
  "Brand Program",
  "Schedule Launch",
  "Review & Submit",
];

// Visibility Modal Component
const ProgramVisibilityModal = ({ onSelect, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <div className="flex justify-between items-center ">
      <h2 className="text-2xl font-bold mb-4">Program Visibility</h2>
<button
        onClick={onClose}
        className=" cursor-pointer border px-1 py-1   text-black rounded-full hover:text-gray-700"
      >
        X
      </button>
      </div>
      
      <p className="mb-6 text-gray-700">
        Please select the visibility of your program:
      </p>
      
      
      <div className="space-y-5 space-x-5">
        <button
          onClick={() => onSelect('public')}
          className="w-fit bg-gray-600 hover:bg-gray-700 text-white py-3 px-4  rounded-lg transition"
        >
          Public Program
        </button>
        
        <button
          onClick={() => onSelect('private')}
          className="w-fit bg-black hover:bg-black text-white py-3 px-4 rounded-lg transition"
        >
          Private Program
        </button>
      </div>
      
      
    </div>
  </div>
);
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
);

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
);

const Step6_BountyRange = ({ data, updateData }) => {
  // Initialize bounty data if it doesn't exist
  const bounty = data.bounty || {
    high: "",
    medium: "",
    low: ""
  };

  // Handler for bounty input updates
  const updateBountyData = (field, value) => {
    // Ensure value is a number or empty string
    const numValue = value === "" ? "" : Number(value);
    updateData({ 
      bounty: { 
        ...bounty, 
        [field]: numValue 
      } 
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Set Bounty Ranges</h2>
      
      <div className="mb-6">
        <label htmlFor="highBounty" className="block text-gray-800 font-semibold mb-2">
          High Severity Bounty ($)
        </label>
        <input
          id="highBounty"
          type="number"
          min="0"
          step="100"
          value={bounty.high || ""}
          onChange={(e) => updateBountyData("high", e.target.value)}
          placeholder="e.g. 5000"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="mediumBounty" className="block text-gray-800 font-semibold mb-2">
          Medium Severity Bounty ($)
        </label>
        <input
          id="mediumBounty"
          type="number"
          min="0"
          step="100"
          value={bounty.medium || ""}
          onChange={(e) => updateBountyData("medium", e.target.value)}
          placeholder="e.g. 1000"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="lowBounty" className="block text-gray-800 font-semibold mb-2">
          Low Severity Bounty ($)
        </label>
        <input
          id="lowBounty"
          type="number"
          min="0"
          step="50"
          value={bounty.low || ""}
          onChange={(e) => updateBountyData("low", e.target.value)}
          placeholder="e.g. 250"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Bounty Guidance</h3>
        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
          <li>High: Critical vulnerabilities (e.g., $5,000+)</li>
          <li>Medium: Significant vulnerabilities (e.g., $1,000-$4,999)</li>
          <li>Low: Minor vulnerabilities (e.g., $100-$999)</li>
        </ul>
      </div>
    </div>
  );
};

const Step7_AdditionalDetails = ({ data, updateData }) => (
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

const Step8_BrandProgram = ({ data, updateData }) => {
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
    </div>
  )
}

const Step9_ScheduleLaunch = ({ data, updateData }) => (
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

const Step10_ReviewAndSubmit = ({ data, onSubmit }) => {
  // Format bounty for display
  const displayData = { ...data };
  if (displayData.bounty) {
    displayData.bounty = {
      high: displayData.bounty.high ? `$${displayData.bounty.high}` : "Not set",
      medium: displayData.bounty.medium ? `$${displayData.bounty.medium}` : "Not set",
      low: displayData.bounty.low ? `$${displayData.bounty.low}` : "Not set",
    };
  }

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
  const [step, setStep] = useState(0);
  const [programData, setProgramData] = useState({});
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const navigate = useNavigate();
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/addprogram') {
      localStorage.clear();
    }
  }, [location.pathname]);

  // Load from localStorage on mount
  useEffect(() => {
    let previousAssets = localStorage.getItem('assets');

    const interval = setInterval(() => {
      const currentAssets = localStorage.getItem('assets');

      if (currentAssets && currentAssets !== previousAssets) {
        const storedData = localStorage.getItem('programData');
        const selectedProgramType = localStorage.getItem('selectedProgramType');

        let updatedData = {};
        if (storedData) {
          updatedData = JSON.parse(storedData);
        }

        updatedData.scope = JSON.parse(currentAssets);
        if (selectedProgramType) {
          updatedData.type = selectedProgramType;
        }

        setProgramData(updatedData);
        previousAssets = currentAssets;
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('programData', JSON.stringify(programData));
  }, [programData]);

  const updateData = (newData) =>
    setProgramData((prev) => ({ ...prev, ...newData }));

  // Initial program creation
  const initialCreation = async () => {
    try {
      const selectedProgramType = localStorage.getItem('selectedProgramType');
      const storedData = localStorage.getItem("programData");
      const programData = storedData ? JSON.parse(storedData) : {};
      const storedUser = localStorage.getItem('user');
      const userObj = JSON.parse(storedUser);
      const token = localStorage.getItem('token');
      
      if (!userObj?._id) {
        throw new Error("User ID not found in localStorage");
      }
  
      if (!/^[0-9a-fA-F]{24}$/.test(userObj._id)) {
        throw new Error("Invalid user ID format");
      }
  
      const payload = {
        type: selectedProgramType,
        title: programData.programName || "New Program",
        company: userObj._id,
        visibility: programData.visibility || "public" // Include visibility in initial creation
      };
  
      const response = await axios.post(
        `${VITE_BACKEND_HOST_URL}/api/programs`, 
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.data && response.data.data._id) {
        localStorage.setItem("programId", response.data.data._id);
        return true;
      }
      throw new Error("Program ID not found in response");
    } catch (error) {
      console.error("Program creation failed:", {
        message: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  };

  // const updateProgramData = async () => {
  //   const programId = localStorage.getItem("programId");
  //   if (!programId) return console.error("Program ID not found.");

  //   try {
  //     const programData = JSON.parse(localStorage.getItem("programData") || "{}");
      
  //     const formData = new FormData();

  //     // Add simple fields
  //     const fieldMappings = [
  //       ["programName", "title"],
  //       ["guidelines", "guidelines"],
  //       ["concerns", "concerns"],
  //       ["programPolicy", "policy"],
  //       ["additionalDetails", "additionalDetails"],
  //       ["type", "type"],
  //       ["startDate", "startDate"],
  //       ["endDate", "endDate"],
  //       ["bounty", "bountyRange"],
  //       ["visibility", "visibility"] // Add visibility field
  //     ];

  //     fieldMappings.forEach(([key, formKey]) => {
  //       if (programData[key] !== undefined) {
  //         if (key === "bounty" && typeof programData[key] === 'object') {
  //           formData.append(formKey, JSON.stringify(programData[key]));
  //         } else {
  //           formData.append(formKey, programData[key]);
  //         }
  //       }
  //     });

  //     // Handle scope
  //     if (programData.scope) {
  //       const scopeValue = JSON.stringify(programData.scope);
  //       formData.append("scope", scopeValue);
  //     }

  //     // Handle brand
  //     if (programData.brand) {
  //       const brandValue = JSON.stringify(programData.brand);
  //       formData.append("brand", brandValue);
  //     }

  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       throw new Error("No authentication token found");
  //     }

  //     const response = await axios.put(
  //       `${VITE_BACKEND_HOST_URL}/api/programs/update/${programId}`,
  //       formData,
  //       { 
  //         headers: { 
  //           "Content-Type": "multipart/form-data",
  //           "Authorization": `Bearer ${token}`
  //         } 
  //       }
  //     );

  //     console.log("✅ Program updated:", response.data);
      
  //     // Show visibility selection modal if visibility wasn't set
  //     if (!programData.visibility) {
  //       setShowVisibilityModal(true);
  //     } else {
  //       // Clear storage and navigate if visibility was already set
  //       localStorage.removeItem('programId');
  //       localStorage.removeItem('programData');
  //       localStorage.removeItem('assets');
  //       localStorage.removeItem('selectedProgramType');
  //       navigate("/company/programs");
  //     }
  //   } catch (error) {
  //     console.error("❌ Update error:", error);
  //     const errorMessage = error.response?.data?.message || error.message;
  //     alert(`Error updating program: ${errorMessage}`);
  //   }
  // };


  const updateProgramData = async () => {
  const programId = localStorage.getItem("programId");
  if (!programId) return console.error("Program ID not found.");

  try {
    const programData = JSON.parse(localStorage.getItem("programData") || "{}");
    
    const formData = new FormData();

    // Add simple fields
    const fieldMappings = [
      ["programName", "title"],
      ["guidelines", "guidelines"],
      ["concerns", "areasOfConcern"], // Changed to match backend expectation
      ["programPolicy", "policy"],
      ["additionalDetails", "additionalDetails"],
      ["type", "type"],
      ["startDate", "startDate"],
      ["endDate", "endDate"],
      ["visibility", "visibility"]
    ];

    fieldMappings.forEach(([key, formKey]) => {
      if (programData[key] !== undefined) {
        formData.append(formKey, programData[key]);
      }
    });

    // Handle bounty separately - convert to proper format
    if (programData.bounty) {
      const bountyData = {
        low: programData.bounty.low || 0,
        medium: programData.bounty.medium || 0,
        high: programData.bounty.high || 0
      };
      formData.append("bountyRange", JSON.stringify(bountyData));
    }

    // Handle scope
    if (programData.scope) {
      formData.append("scope", JSON.stringify(programData.scope));
    }

    // Handle brand
    if (programData.brand) {
      formData.append("brand", JSON.stringify(programData.brand));
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      `${VITE_BACKEND_HOST_URL}/api/programs/update/${programId}`,
      formData,
      { 
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        } 
      }
    );

    console.log("✅ Program updated:", response.data);
    
    if (!programData.visibility) {
      setShowVisibilityModal(true);
    } else {
      localStorage.removeItem('programId');
      localStorage.removeItem('programData');
      localStorage.removeItem('assets');
      localStorage.removeItem('selectedProgramType');
      navigate("/company/programs");
    }
  } catch (error) {
    console.error("❌ Update error:", error);
    const errorMessage = error.response?.data?.message || error.message;
    alert(`Error updating program: ${errorMessage}`);
  }
};

  const handleVisibilitySelect = async (visibility) => {
    try {
      const programId = localStorage.getItem("programId");
      const token = localStorage.getItem("token");
      
      // Update program with visibility
      await axios.patch(
        `${VITE_BACKEND_HOST_URL}/api/programs/${programId}/visibility`,
        { visibility },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      // Also update local data
      updateData({ visibility });
      
      alert(`Program set as ${visibility} successfully!`);
      
      // Clear storage
      localStorage.removeItem('programId');
      localStorage.removeItem('programData');
      localStorage.removeItem('assets');
      localStorage.removeItem('selectedProgramType');
      
      setShowVisibilityModal(false);
      navigate("/company/programs");
    } catch (error) {
      console.error("Error setting program visibility:", error);
      alert(`Failed to set program visibility: ${error.response?.data?.message || error.message}`);
    }
  };

  const steps = [
    Step1_ProgramUsername,
    Step2_DefineScope,
    Step3_ParticipationGuidelines,
    Step4_SpecificConcerns,
    Step5_ProgramPolicy,
    Step6_BountyRange,
    Step7_AdditionalDetails,
    Step8_BrandProgram,
    Step9_ScheduleLaunch,
    Step10_ReviewAndSubmit,
  ];

  const CurrentStep = steps[step];

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
                  ? "text-blue-600 border-blue-600 font-semibold"
                  : "border-gray-300"
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
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={async () => {
                if (step === 0) {
                  try {
                    await initialCreation();
                    setStep((prev) => prev + 1);
                  } catch (error) {
                    alert("Failed to create program: " + (error.response?.data?.message || error.message));
                  }
                } else {
                  setStep((prev) => prev + 1);
                }
              }}
              className="px-6 py-3 rounded-lg shadow-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Next
            </button>
          ) : null}
        </div>
      </div>

      {/* Visibility Modal */}
      {showVisibilityModal && (
        <ProgramVisibilityModal 
          onSelect={handleVisibilitySelect}
          onClose={() => setShowVisibilityModal(false)}
        />
      )}
    </div>
  );
};

export default CreateProgram;

// // Main component
// const CreateProgram = () => {
//   const [step, setStep] = useState(0)
//   const [programData, setProgramData] = useState({})
//   const navigate = useNavigate()
//   const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL

//   const location = useLocation();
//   useEffect(() => {
//     if (location.pathname !== '/addprogram') {
//       localStorage.clear();
//     }
//   }, [location.pathname]);

//   // Load from localStorage on mount
//   useEffect(() => {
//     let previousAssets = localStorage.getItem('assets')

//     const interval = setInterval(() => {
//       const currentAssets = localStorage.getItem('assets')

//       if (currentAssets && currentAssets !== previousAssets) {
//         const storedData = localStorage.getItem('programData')
//         const selectedProgramType = localStorage.getItem('selectedProgramType')

//         let updatedData = {}
//         if (storedData) {
//           updatedData = JSON.parse(storedData)
//         }

//         updatedData.scope = JSON.parse(currentAssets)
//         if (selectedProgramType) {
//           updatedData.type = selectedProgramType
//         }

//         setProgramData(updatedData)
//         previousAssets = currentAssets
//       }
//     }, 500)

//     return () => clearInterval(interval)
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('programData', JSON.stringify(programData))
//   }, [programData])

//   const updateData = (newData) =>
//     setProgramData((prev) => ({ ...prev, ...newData }));

//   // Initial program creation
//   const initialCreation = async () => {
//     try {
//       const selectedProgramType = localStorage.getItem('selectedProgramType');
//       const storedData = localStorage.getItem("programData");
//       const programData = storedData ? JSON.parse(storedData) : {};
//       const storedUser = localStorage.getItem('user');
//       const userObj = JSON.parse(storedUser);
//       const token = localStorage.getItem('token');
      
//       if (!userObj?._id) {
//         throw new Error("User ID not found in localStorage");
//       }
  
//       // Validate user ID format
//       if (!/^[0-9a-fA-F]{24}$/.test(userObj._id)) {
//         throw new Error("Invalid user ID format");
//       }
  
//       const payload = {
//         type: selectedProgramType,
//         title: programData.programName || "New Program", // fallback name
//         company: userObj._id
//       };
  
//       const response = await axios.post(
//         `${VITE_BACKEND_HOST_URL}/api/programs`, 
//         payload,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       if (response.data.data && response.data.data._id) {
//         localStorage.setItem("programId", response.data.data._id);
//         return true; // Indicate success
//       }
//       throw new Error("Program ID not found in response");
//     } catch (error) {
//       console.error("Program creation failed:", {
//         message: error.message,
//         response: error.response?.data,
//       });
//       throw error;
//     }
//   }

//   const updateProgramData = async () => {
//     const programId = localStorage.getItem("programId");
//     if (!programId) return console.error("Program ID not found.");

//     try {
//       const programData = JSON.parse(localStorage.getItem("programData") || "{}");
//       console.log("Program data at update:", programData);
      
//       const formData = new FormData();

//       // Add simple fields
//       const fieldMappings = [
//         ["programName", "title"],
//         ["guidelines", "guidelines"],
//         ["concerns", "concerns"],
//         ["programPolicy", "policy"],
//         ["additionalDetails", "additionalDetails"],
//         ["type", "type"],
//         ["startDate", "startDate"],
//         ["endDate", "endDate"],
//         ["bounty", "bountyRange"] // Added bounty field
//       ];

//       fieldMappings.forEach(([key, formKey]) => {
//         if (programData[key] !== undefined) {
//           // Special handling for bounty object
//           if (key === "bounty" && typeof programData[key] === 'object') {
//             formData.append(formKey, JSON.stringify(programData[key]));
//           } else {
//             formData.append(formKey, programData[key]);
//           }
//           console.log(`Added ${formKey}:`, programData[key]);
//         }
//       });

//       // Handle scope
//       if (programData.scope) {
//         const scopeValue = JSON.stringify(programData.scope);
//         formData.append("scope", scopeValue);
//         console.log("Added scope:", scopeValue);
//       }

//       // Handle brand
//       if (programData.brand) {
//         const brandValue = JSON.stringify(programData.brand);
//         formData.append("brand", brandValue);
//         console.log("Added brand:", brandValue);
//       }

//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const response = await axios.put(
//         `${VITE_BACKEND_HOST_URL}/api/programs/update/${programId}`,
//         formData,
//         { 
//           headers: { 
//             "Content-Type": "multipart/form-data",
//             "Authorization": `Bearer ${token}`
//           } 
//         }
//       );

//       console.log("✅ Program updated:", response.data);
//       alert("Program updated successfully!");
      
//       // Clear storage
//       localStorage.removeItem('programId');
//       localStorage.removeItem('programData');
//       localStorage.removeItem('assets');
//       localStorage.removeItem('selectedProgramType');
      
//       navigate("/company/programs");
//     } catch (error) {
//       console.error("❌ Update error:", error);
//       const errorMessage = error.response?.data?.message || error.message;
//       alert(`Error updating program: ${errorMessage}`);
//     }
//   };

//   const steps = [
//     Step1_ProgramUsername,
//     Step2_DefineScope,
//     Step3_ParticipationGuidelines,
//     Step4_SpecificConcerns,
//     Step5_ProgramPolicy,
//     Step6_BountyRange, // New step added here
//     Step7_AdditionalDetails,
//     Step8_BrandProgram,
//     Step9_ScheduleLaunch,
//     Step10_ReviewAndSubmit,
//   ];

//   const CurrentStep = steps[step]

//   return (
//     <div className="max-w-full h-[100vh] text-black mx-auto p-8 bg-white rounded-lg shadow-lg flex">
//       {/* Step Indicators - vertical on left */}
//       <div className="w-1/4 pr-6">
//         <ol className="flex flex-col mt-[200px] text-xs sm:text-sm font-medium text-gray-500 space-y-4">
//           {stepsList.map((label, index) => (
//             <li
//               key={label}
//               className={`pb-1 border-l-4 pl-3 ${
//                 index === step
//                   ? "text-blue-600 border-blue-600 font-semibold"
//                   : "border-gray-300"
//               }`}
//             >
//               {label}
//             </li>
//           ))}
//         </ol>
//       </div>

//       {/* Main content */}
//       <div className="w-3/4">
//         <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
//           Create Bug Bounty Program
//         </h1>

//         {/* Step Form */}
//         <div className="mb-8">
//           <CurrentStep
//             data={programData}
//             updateData={updateData}
//             onSubmit={updateProgramData}
//           />
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between">
//           <button
//             disabled={step === 0}
//             onClick={() => setStep((prev) => prev - 1)}
//             className={`px-6 py-3 rounded-lg shadow-md font-semibold transition ${
//               step === 0
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-gray-600 text-white hover:bg-gray-700"
//             }`}
//           >
//             Back
//           </button>
//           {step < steps.length - 1 ? (
//             <button
//               onClick={async () => {
//                 if (step === 0) {
//                   try {
//                     await initialCreation();
//                     setStep((prev) => prev + 1);
//                   } catch (error) {
//                     alert("Failed to create program: " + (error.response?.data?.message || error.message));
//                   }
//                 } else {
//                   setStep((prev) => prev + 1);
//                 }
//               }}
//               className="px-6 py-3 rounded-lg shadow-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//             >
//               Next
//             </button>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProgram;

