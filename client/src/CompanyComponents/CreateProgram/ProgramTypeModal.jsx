import { Bug, Lock, Globe } from 'lucide-react'
import CTAButton from '../../Common/Button/CTAButton'
import { useNavigate } from 'react-router-dom'

const PROGRAM_TYPES = [
  {
    title: 'Vulnerability Disclosure Program',
    description: 'Collaborative, no-bounty',
    type: 'VDP',
    icon: <Lock className="w-6 h-6 text-white" />,
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
    icon: <Globe className="w-6 h-6 text-white" />,
  },
]

const ProgramTypeModal = ({ onClose, onSelect }) => {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1c1e26] via-[#364b2c] to-[#b3ef77]    flex justify-center items-center z-50 px-4">
      <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl w-full max-w-xl">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Select Program Type
        </h2>

        <div className="space-y-4 mb-6">
          {PROGRAM_TYPES.map(({ title, description, type, icon }) => (
            <div
              key={type}
              className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg bg-[#141414] hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                <div className="p-3 rounded-full bg-[#1F1F1F] border border-white flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-sm text-gray-400">{description}</p>
                </div>
              </div>

              <CTAButton
                text="Start"
                onClick={() => {
                  onSelect(type)
                  onClose()
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <CTAButton
            text="Back"
            onClick={() => navigate('/company/programs')}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgramTypeModal
