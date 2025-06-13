import { Bug, Lock } from 'lucide-react'

const PROGRAM_TYPES = [
  {
    title: 'Vulnerability Disclosure Program',
    description: 'Collaborative, no-bounty',
    type: 'VDP',
    icon: <Bug className="w-6 h-6 text-white" />,
  },
  {
    title: 'Private Bug Bounty Program',
    description: 'Exclusive program for selected researchers',
    type: 'Private Bug Bounty',
    icon: <Bug className="w-6 h-6 text-white" />,
  },
  {
    title: 'Public Bug Bounty Program',
    description:
      'Incentivizes researchers to find and report vulnerabilities in our public-facing systems',
    type: 'Public Bug Bounty',
    icon: <Bug className="w-6 h-6 text-white" />,
  },
  // {
  //   title: 'Enterprise Pentesting',
  //   description:
  //     'Rapid, SaaS-based infrastructure facilitating regular testing to fortify system security',
  //   type: 'Enterprise Pentesting',
  //   icon: <Lock className="w-6 h-6 text-white" />,
  // },
]

const ProgramTypeModal = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl w-full max-w-xl mx-auto">
        <h2 className="text-xl font-semibold text-white mb-4">
          Select Program Type
        </h2>
        <div className="space-y-4">
          {PROGRAM_TYPES.map(({ title, description, type, icon }) => (
            <div
              key={type}
              onClick={() => {
                onSelect(type)
                onClose()
              }}
              className="flex justify-between items-center p-4 rounded-lg bg-[#141414] hover:bg-[#2a2a2a] cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-[#1F1F1F] border border-white">
                  {icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-sm text-gray-400">{description}</p>
                </div>
              </div>
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-1 px-4 rounded-md">
                Start
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgramTypeModal
