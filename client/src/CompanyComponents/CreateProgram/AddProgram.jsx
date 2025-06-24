import React, { useState, useEffect } from 'react';
import CreateAssets from './CreateAssets';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Steps labels
const stepsList = [
  'Program Username',
  'Define Scope',
  'Participation Guidelines',
  'Specific Areas of Concern',
  'Program Policy',
  'Bounty Range',
  'Additional Details',
  'Schedule Launch',
  'Review & Submit',
];

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
    <label
      htmlFor="description"
      className="text-lg font-medium text-gray-900 block mb-2"
    >
      📝 Description
    </label>
    <input
      id="description"
      type="text"
      value={data.description || ''}
      onChange={(e) => updateData({ description: e.target.value })}
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

const Step6_BountyRange = ({ data, updateData }) => {
  const bounty = data.bounty || {
    high: '',
    medium: '',
    low: '',
  }

  const updateBountyData = (field, value) => {
    const numValue = value === '' ? '' : Number(value)
    updateData({
      bounty: {
        ...bounty,
        [field]: numValue,
      },
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Set Bounty Ranges</h2>

      <div className="mb-6">
        <label
          htmlFor="highBounty"
          className="block text-gray-800 font-semibold mb-2"
        >
          High Severity Bounty ($)
        </label>
        <input
          id="highBounty"
          type="number"
          min="0"
          step="100"
          value={bounty.high || ''}
          onChange={(e) => updateBountyData('high', e.target.value)}
          placeholder="e.g. 5000"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="mediumBounty"
          className="block text-gray-800 font-semibold mb-2"
        >
          Medium Severity Bounty ($)
        </label>
        <input
          id="mediumBounty"
          type="number"
          min="0"
          step="100"
          value={bounty.medium || ''}
          onChange={(e) => updateBountyData('medium', e.target.value)}
          placeholder="e.g. 1000"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="lowBounty"
          className="block text-gray-800 font-semibold mb-2"
        >
          Low Severity Bounty ($)
        </label>
        <input
          id="lowBounty"
          type="number"
          min="0"
          step="50"
          value={bounty.low || ''}
          onChange={(e) => updateBountyData('low', e.target.value)}
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
  )
}

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
  const brand = data.brand || {
    programName: '',
    programTagline: '',
    programWebsite: '',
    programDescription: '',
  }

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
          onChange={(e) => updateBrandData('programDescription', e.target.value)}
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
  const displayData = { ...data }
  if (displayData.bounty) {
    displayData.bounty = {
      high: displayData.bounty.high ? `$${displayData.bounty.high}` : 'Not set',
      medium: displayData.bounty.medium
        ? `$${displayData.bounty.medium}`
        : 'Not set',
      low: displayData.bounty.low ? `$${displayData.bounty.low}` : 'Not set',
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Your Program</h2>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto max-h-96">
        {JSON.stringify(displayData, null, 2)}
      </pre>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => onSubmit(false)}
          className="bg-gray-600 hover:bg-gray-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          Save as Draft
        </button>
        <button
          onClick={() => onSubmit(true)}
          className="bg-green-600 hover:bg-green-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          Publish Program
        </button>
      </div>
    </div>
  )
}
// Main component
const CreateProgram = () => {
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [step, setStep] = useState(0);
  const [programData, setProgramData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  

useEffect(() => {
  return () => {
    if (!location.pathname.includes('/create-program')) {
      localStorage.removeItem('programId');
      localStorage.removeItem('programData');
      localStorage.removeItem('assets');
      localStorage.removeItem('selectedProgramType');
    }
  };
}, [location.pathname]);


  
// Load program data when component mounts
  useEffect(() => {
    const loadProgramData = async () => {
      // Check if we're editing an existing program
      const programId = location.state?.programId || localStorage.getItem('programId');
      
      if (programId) {
        try {
          setIsEditing(true);
          const token = localStorage.getItem('token');
          setStep(1); // Start from Step 2 (Define Scope)
          const response = await axios.get(
            `${VITE_BACKEND_HOST_URL}/api/programs/${programId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const program = response.data.data;
          setProgramData({
            programName: program.title,
            guidelines: program.guidelines,
            concerns: program.areasOfConcern,
            programPolicy: program.policy,
            additionalDetails: program.additionalDetails,
            type: program.type,
            startDate: program.startDate,
            endDate: program.endDate,
            visibility: program.visibility,
            scope: program.scope,
            brand: program.brand,
            bounty: program.bountyRange,
            status: program.status
          });

          // Skip Step 1 if editing
          
        } catch (error) {
          console.error('Error loading program:', error);
        }
      } else {
        // New program creation
        const selectedProgramType = localStorage.getItem('selectedProgramType');
        if (selectedProgramType) {
          const isPrivate = selectedProgramType.includes('Private');
          setProgramData((prev) => ({
            ...prev,
            visibility: isPrivate ? 'private' : 'public',
            type: selectedProgramType,
            status: 'draft',
          }));
        }
      }
    };

    loadProgramData();

    // Asset sync interval (unchanged)
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

        const parsedAssets = JSON.parse(currentAssets || '[]');
        if (!updatedData.scope || updatedData.scope.length === 0) {
          updatedData.scope = parsedAssets;
        }

        if (selectedProgramType) {
          updatedData.type = selectedProgramType;
          updatedData.visibility =
            updatedData.visibility ||
            (selectedProgramType.includes('Private') ? 'private' : 'public');
        }

        setProgramData(updatedData);
        previousAssets = currentAssets;
      }
    }, 500);

    return () => clearInterval(interval);
  }, [location.state, VITE_BACKEND_HOST_URL]);


  useEffect(() => {
    localStorage.setItem('programData', JSON.stringify(programData));
  }, [programData]);

  const updateData = (newData) =>
    setProgramData((prev) => ({ ...prev, ...newData }));

  const initialCreation = async () => {
    try {
      const selectedProgramType = localStorage.getItem('selectedProgramType');
      const storedData = localStorage.getItem('programData');
      const programData = storedData ? JSON.parse(storedData) : {};
      const storedUser = localStorage.getItem('user');
      const userObj = JSON.parse(storedUser);
      const token = localStorage.getItem('token');

      if (!userObj?._id) {
        throw new Error('User ID not found in localStorage');
      }

      if (!/^[0-9a-fA-F]{24}$/.test(userObj._id)) {
        throw new Error('Invalid user ID format');
      }

      const isPrivate = selectedProgramType.includes('Private');
      const visibility = isPrivate ? 'private' : 'public';

      const payload = {
        type: selectedProgramType,
        title: programData.programName || 'New Program',
        company: userObj._id,
        visibility: visibility,
        status: 'draft',
        description: programData.description || '', // Add this line
      };

      const response = await axios.post(
        `${VITE_BACKEND_HOST_URL}/api/programs`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.data && response.data.data._id) {
        localStorage.setItem('programId', response.data.data._id);
        return true;
      }
      throw new Error('Program ID not found in response');
    } catch (error) {
      console.error('Program creation failed:', {
        message: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  };

  const updateProgramData = async (publish = false) => {
    const programId = localStorage.getItem('programId');
    if (!programId) return console.error('Program ID not found.');

    try {
      const programData = JSON.parse(localStorage.getItem('programData') || '{}');
      const token = localStorage.getItem('token');

      const payload = {
        title: programData.programName,
        description: programData.description, // Add this line
        guidelines: programData.guidelines,
        areasOfConcern: programData.concerns,
        policy: programData.programPolicy,
        additionalDetails: programData.additionalDetails,
        type: programData.type,
        startDate: programData.startDate,
        endDate: programData.endDate,
        visibility: programData.visibility,
        scope: programData.scope,
        // brand: programData.brand,
        bountyRange: programData.bounty || {
          low: 0,
          medium: 0,
          high: 0,
        },
        status: publish ? 'published' : 'draft',
      };

      const response = await axios.put(
        `${VITE_BACKEND_HOST_URL}/api/programs/update/${programId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (publish) {
       
        if (programData.visibility === 'private') {
        setShowInvitePopup(true);
      } else {
        localStorage.removeItem('programId');
        localStorage.removeItem('programData');
        localStorage.removeItem('assets');
        localStorage.removeItem('selectedProgramType');
        navigate('/company/programs');
      }
      } else {
        alert('Program saved as draft successfully!');
        navigate('/company/programs');
      }
    } catch (error) {
      console.error('Update error:', error);
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error updating program: ${errorMessage}`);
    }
  };


  const cleanupAndNavigate = () => {
  localStorage.removeItem('programId');
  localStorage.removeItem('programData');
  localStorage.removeItem('assets');
  localStorage.removeItem('selectedProgramType');
  navigate('/company/programs');
};

  const steps = [
    Step1_ProgramUsername,
    Step2_DefineScope,
    Step3_ParticipationGuidelines,
    Step4_SpecificConcerns,
    Step5_ProgramPolicy,
    Step6_BountyRange,
    Step7_AdditionalDetails,
    // Step8_BrandProgram,
    Step8_ScheduleLaunch,
    Step9_ReviewAndSubmit,
  ];

  const CurrentStep = steps[step];



  const InviteHackersPopup = ({ programId, onClose }) => {
  const [hackers, setHackers] = useState([]);
  const [selectedHackers, setSelectedHackers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchHackers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${VITE_BACKEND_HOST_URL}/api/hacker/leaderBoard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHackers(response.data.leaderBoard);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching hackers:', error);
        setIsLoading(false);
      }
    };

    fetchHackers();
  }, []);

  const toggleHackerSelection = (hackerId) => {
    setSelectedHackers(prev => 
      prev.includes(hackerId) 
        ? prev.filter(id => id !== hackerId) 
        : [...prev, hackerId]
    );
  };

  const sendInvitations = async () => {
  if (selectedHackers.length === 0) return;
  
  setIsSending(true);
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${VITE_BACKEND_HOST_URL}/api/programs/${programId}/invite`,
      { hackerIds: selectedHackers },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    if (response.data.failedEmails?.length) {
      alert(`Sent with ${response.data.failedEmails.length} failures`);
    } else {
      setSuccess(true);
      setTimeout(onClose, 2000);
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    alert(`Failed: ${error.response?.data?.message || error.message}`);
  } finally {
    setIsSending(false);
  }
};

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Loading hackers...</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {success ? (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-bold mb-2">Invitations Sent Successfully!</h2>
            <p>Selected hackers have been invited to your private program.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Invite Hackers to Your Private Program</h2>
            <p className="mb-4">Select hackers from the leaderboard to invite:</p>
            
            <div className="space-y-3 mb-6">
              {hackers.map(hacker => (
                <div 
                  key={hacker._id} 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${selectedHackers.includes(hacker._id) ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                  onClick={() => toggleHackerSelection(hacker._id)}
                >
                  <img 
                    src={hacker.image || '/default-hacker.png'} 
                    alt={hacker.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{hacker.name}</h3>
                    <p className="text-sm text-gray-600">@{hacker.username}</p>
                  </div>
                  {selectedHackers.includes(hacker._id) && (
                    <div className="ml-auto text-blue-500">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                disabled={isSending}
              >
                Skip
              </button>
              <button
                onClick={sendInvitations}
                disabled={selectedHackers.length === 0 || isSending}
                className={`px-4 py-2 rounded-lg text-white transition ${selectedHackers.length === 0 ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isSending ? 'Sending...' : `Invite ${selectedHackers.length} Hackers`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

  return (
    <div className="max-w-full h-[100vh] text-black mx-auto p-8 bg-white rounded-lg shadow-lg flex">
      {/* Step Indicators */}
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
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900">
          {isEditing ? 'Edit Program' : 'Create Bug Bounty Program'}
        </h1>
        <div className="mb-4 text-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {programData.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Step Form */}
        <div className="mb-8">
          <CurrentStep
            data={programData}
            updateData={updateData}
            onSubmit={updateProgramData}
          />
        </div>



        {showInvitePopup && (
  <InviteHackersPopup 
    programId={localStorage.getItem('programId')} 
    onClose={cleanupAndNavigate}
  />
)}

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
              onClick={async () => {
                if (step === 0 && !isEditing) {
                  try {
                    await initialCreation();
                    setStep((prev) => prev + 1);
                  } catch (error) {
                    alert(
                      'Failed to create program: ' +
                        (error.response?.data?.message || error.message)
                    );
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


      

    </div>

    
  );
};

export default CreateProgram;