import React, { useState } from "react";
import ProgramTypeSelection from "../../components/AllProgram/ProgramTypeSelection";
import MultiStepForm from "../../components/AllProgram/MultiStepForm";

const CreateProgram = () => {
  const [step, setStep] = useState(1);
  const [programType, setProgramType] = useState("");
  const [formData, setFormData] = useState({ type: "" });

  const handleTypeSelect = (type) => {
    setProgramType(type);
    setFormData((prev) => ({ ...prev, type }));
    setStep(2);
  };

  return (
    <div className="min-h-screen p-6">
      {step === 1 && <ProgramTypeSelection onSelect={handleTypeSelect} />}
      {step > 1 && (
        <div className="flex gap-6">
          <aside className="w-1/4 p-4 bg-white shadow rounded h-fit sticky top-6">
            <h3 className="text-lg font-bold mb-4">Program Setup</h3>
            <ol className="list-decimal list-inside text-sm space-y-2 text-gray-700">
  <li className={step === 2 ? "text-blue-600 font-semibold" : ""}>Basic Info</li>
  <li className={step === 3 ? "text-blue-600 font-semibold" : ""}>Timeline</li>
  <li className={step === 4 ? "text-blue-600 font-semibold" : ""}>Guidelines</li>
  <li className={step === 5 ? "text-blue-600 font-semibold" : ""}>Bounty Range</li>
  <li className={step === 6 ? "text-blue-600 font-semibold" : ""}>Assets</li>
  <li className={step === 7 ? "text-blue-600 font-semibold" : ""}>Review</li>
</ol>

            <div className="mt-6">
              <p className="text-xs text-gray-500">Selected Type:</p>
              <p className="text-sm font-medium text-gray-900">{programType}</p>
            </div>
          </aside>

          <main className="flex-1">
            <MultiStepForm
              step={step}
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
            />
          </main>
        </div>
      )}
    </div>
  );
};

export default CreateProgram;
