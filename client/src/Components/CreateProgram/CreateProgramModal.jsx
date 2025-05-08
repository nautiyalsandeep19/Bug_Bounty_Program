import React, { useState } from "react";
import axios from "axios";

// Program Type Modal
const ProgramTypeModal = ({ onClose, onSelect }) => {

  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl mb-4">Select Program Type</h2>
        <div className="space-y-4">
          {["VDP", "Private Bug Bounty", "Public Bug Bounty", "Enterprise Pentesting"].map((type) => (
            <button
              key={type}
              onClick={() => {
                onSelect(type);
                onClose();
              }}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProgramCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '', // Will need company ID when selecting company
    visibility: 'public',
    bountyRange: {
      informational: 0,
      low: 50,
      medium: 400,
      high: 800,
      critical: 1000,
    },
    invitedHackers: [],
    assets: [],
    type: '',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    guidelines: '',
    areasOfConcern: '',
    logo: null
  });

  const [isModalOpen, setIsModalOpen] = useState(true);
   
 

  const steps = [
    "Program Username",
    "Define Scope",
    "Participation Guidelines",
    "Specific Areas of Concern",
    "Additional Details",
    "Brand Your Program",
    "Schedule Launch",
    "Review Your Program"
  ];

  const handleProgramTypeSelect = (type) => {
    setFormData({ ...formData, type });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBountyRangeChange = (range, value) => {
    setFormData({
      ...formData,
      bountyRange: {
        ...formData.bountyRange,
        [range]: Number(value)
      }
    });
  };

  const handleAssetsChange = (e) => {
    const assets = e.target.value.split(",").map(item => item.trim());
    setFormData({ ...formData, assets });
  };

  const handleInvitedHackersChange = (e) => {
    const selectedHackers = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, invitedHackers: selectedHackers });
  };

  const handleSubmit = async () => {
    try {
        console.log("Submit button clicked, preparing data...");

        const data = new FormData();
        
        // Set company ID (from the provided value)
        const companyId = '68184069ae7cffd862dc6864'; // Valid company ID
        // const companyId = localStorage.getItem("companyId");

        
        // Assets array (dummy IDs for demonstration)
        const assets = ['60b8d2950b10dc2c88f9a4d5']; // Dummy asset ID(s)

        // Append primitive values
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("company", companyId); // Set company ID here
        data.append("visibility", formData.visibility);
        data.append("type", formData.type);
        data.append("startDate", formData.startDate.toISOString());
        data.append("endDate", formData.endDate.toISOString());
        data.append("guidelines", formData.guidelines);
        data.append("areasOfConcern", formData.areasOfConcern);

        // Append logo file
        if (formData.logo) {
            data.append("logo", formData.logo);
        }

        // Append bounty range
        Object.entries(formData.bountyRange).forEach(([key, value]) => {
            data.append(`bountyRange[${key}]`, value);
        });

        // Append assets (dummy IDs for demonstration)
        assets.forEach((asset, index) => {
            data.append(`assets[${index}]`, asset); // Add the dummy asset ID(s)
        });

        // Append invitedHackers
        formData.invitedHackers.forEach((email, index) => {
            data.append(`invitedHackers[${index}]`, email);
        });

        console.log("Form data prepared for submission:", data);

        // API Call to submit data
        const response = await axios.post('http://localhost:8000/api/program/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 201) {
            console.log("Program created successfully!");
            alert("Program created successfully!");
        }
    } catch (err) {
        console.error("Error submitting program", err);
        alert("An error occurred while creating the program.");
    }
};


  return (
    <div className="flex">
      {isModalOpen && <ProgramTypeModal onClose={() => setIsModalOpen(false)} onSelect={handleProgramTypeSelect} />}

      <div className="w-1/4 bg-gray-200 p-4">
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li
              key={index}
              onClick={() => setActiveStep(index)}
              className={`cursor-pointer ${index === activeStep ? 'text-blue-500' : ''}`}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 p-4">
        {activeStep === 0 && (
          <div>
            <h2>Program Username</h2>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 mb-2" />
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 mb-2" />
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <h2>Define Scope</h2>
            <input type="text" name="assets" onChange={handleAssetsChange} placeholder="Comma-separated assets" className="w-full border p-2 mb-2" />
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <h2>Participation Guidelines</h2>
            <textarea name="guidelines" value={formData.guidelines} onChange={handleChange} className="w-full border p-2 mb-2" />
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <h2>Specific Areas of Concern</h2>
            <input type="text" name="areasOfConcern" value={formData.areasOfConcern} onChange={handleChange} className="w-full border p-2 mb-2" />
          </div>
        )}

        {activeStep === 4 && (
          <div>
            <h2>Additional Details</h2>
            <label>Bounty Range (Low):</label>
            <input type="number" value={formData.bountyRange.low} onChange={(e) => handleBountyRangeChange("low", e.target.value)} className="w-full border p-2 mb-2" />
            <label>Visibility:</label>
            <select name="visibility" value={formData.visibility} onChange={handleChange} className="w-full border p-2 mb-2">
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
        )}

        {activeStep === 5 && (
          <div>
            <h2>Brand Your Program</h2>
            <input type="file" name="logo" onChange={handleChange} className="w-full border p-2 mb-2" />
          </div>
        )}

        {activeStep === 6 && (
          <div>
            <h2>Schedule Launch</h2>
            <input type="date" name="startDate" value={formData.startDate.toISOString().split('T')[0]} onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })} className="w-full border p-2 mb-2" />
            <input type="date" name="endDate" value={formData.endDate.toISOString().split('T')[0]} onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })} className="w-full border p-2 mb-2" />
          </div>
        )}

        {activeStep === 7 && (
          <div>
            <h2>Review Your Program</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              if (activeStep === steps.length - 1) {
                handleSubmit();
              } else {
                setActiveStep(activeStep + 1);
              }
            }}
            className="bg-blue-500 text-white p-2"
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCreation;
