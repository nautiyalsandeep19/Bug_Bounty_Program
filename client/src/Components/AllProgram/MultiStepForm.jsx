import React from "react";
import axios from "axios";

const MultiStepForm = ({ step, setStep, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        bountyRange: formData.bountyRange || {
          informational: 0,
          low: 50,
          medium: 400,
          high: 800,
          critical: 1000,
        },
        assets: formData.assets || [],
      };
  
      await axios.post("http://localhost:8000/api/programs", payload);
      alert("Program created successfully");
    } catch (error) {
      console.error("Error creating program:", error.response?.data || error.message);
      alert("Failed to create program");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Step {step - 1}: Program Creation</h2>

      {step === 2 && (
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Program Title"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={formData.title || ""}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={formData.description || ""}
          />
          <input
            type="text"
            name="company"
            placeholder="Company ID"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={formData.company || ""}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <input
            type="date"
            name="startDate"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={formData.startDate || ""}
          />
          <input
            type="date"
            name="endDate"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={formData.endDate || ""}
          />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <input
            type="text"
            name="visibility"
            placeholder="Visibility (private/public)"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={formData.visibility || ""}
          />
          <textarea
            name="guidelines"
            placeholder="Participation Guidelines"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={formData.guidelines || ""}
          />
        </div>
      )}

{step === 5 && (
  <div className="space-y-4">
    <h3 className="font-semibold">Bounty Range</h3>
    {["informational", "low", "medium", "high", "critical"].map((level) => (
      <input
        key={level}
        type="number"
        name={`bountyRange.${level}`}
        placeholder={`${level.charAt(0).toUpperCase() + level.slice(1)} ($)`}
        className="w-full p-2 border rounded"
        value={formData.bountyRange?.[level] || ""}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            bountyRange: {
              ...prev.bountyRange,
              [level]: Number(e.target.value),
            },
          }))
        }
      />
    ))}
  </div>
)}

{step === 6 && (
  <div className="space-y-4">
    <h3 className="font-semibold">Assets (Enter URLs or IPs)</h3>
    <textarea
      name="assets"
      placeholder="Enter each asset on a new line"
      className="w-full p-2 border rounded"
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          assets: e.target.value
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        }))
      }
      value={(formData.assets || []).join("\n")}
    />
  </div>
)}

{step === 7 && (
  <div className="space-y-4">
    <h3 className="text-md font-semibold">Review</h3>
    <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap break-words">
      {JSON.stringify(formData, null, 2)}
    </pre>
  </div>
)}


      <div className="flex justify-between mt-4">
      {step > 2 && (
  <button onClick={() => setStep((s) => s - 1)} className="px-4 py-2 bg-gray-300 rounded">
    Back
  </button>
)}
{step < 7 ? (
  <button onClick={() => setStep((s) => s + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
    Next
  </button>
) : (
  <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
    Submit
  </button>
)}

      </div>
    </div>
  );
};

export default MultiStepForm;
