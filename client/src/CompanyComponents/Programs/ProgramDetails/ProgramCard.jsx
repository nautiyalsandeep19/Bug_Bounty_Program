import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CTAButton from '../../../Common/Button/CTAButton'
import { UsersRound, Hourglass, IndianRupee } from 'lucide-react'

const ProgramCard = ({ program, isDraft }) => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const userType = useSelector((state) => state.auth.userType)
  const [hoveredIcon, setHoveredIcon] = useState(null)

  const handleClick = () => {
    if (isDraft) {
      localStorage.setItem('programId', program._id)
      localStorage.setItem('selectedProgramType', program.type)
      navigate('/addprogram', { state: { programId: program._id } })
    } else {
      token
        ? navigate(`/${userType}/programs/${program._id}`)
        : navigate(`/programs/${program._id}`)
    }
  }

  return (
    <div className="relative group max-w-md w-full rounded-xl p-6 space-y-5 border-t-4 border-t-green-400 bg-secondarybg transition-all duration-300 hover:shadow-[0_8px_30px_rgb(34,197,94,0.5)] hover:scale-[1.01] overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <img
            src={program?.company?.image || '/default-company.png'}
            alt="company"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">
              {program?.title}
            </h2>
            <p className="text-sm text-secondaryText">
              {program?.company?.name}
            </p>
          </div>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            program.visibility === 'private'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {program.visibility === 'private' ? 'Private' : 'Public'}
        </span>
      </div>

      <p className="text-sm text-secondaryText min-h-[20px] line-clamp-3">
        {program?.description || 'No description provided.'}
      </p>

      <div className="bg-neutral-600 backdrop-blur-md rounded-xl px-4 py-3 space-y-2 text-sm ">
        <div
          className="flex justify-between items-center relative"
          onMouseEnter={() => setHoveredIcon('participants')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <span
            className={`flex items-center gap-2 transition-opacity duration-200 ${
              hoveredIcon === 'participants' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <UsersRound size={16} /> Participants
          </span>
          <span className="font-semibold  transition-opacity duration-200 ">
            {program?.participants || 0}
          </span>
          <UsersRound
            size={16}
            className="absolute left-0 opacity-100 cursor-pointer"
          />
        </div>
        <div
          className="flex justify-between items-center relative"
          onMouseEnter={() => setHoveredIcon('responseTime')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <span
            className={`flex items-center gap-2 transition-opacity duration-200 ${
              hoveredIcon === 'responseTime' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Hourglass size={16} /> Response Time
          </span>
          <span className="font-semibold  transition-opacity duration-200 ">
            {program?.avgTime || 'N/A'} days
          </span>
          <Hourglass
            size={16}
            className="absolute left-0 opacity-100 cursor-pointer"
          />
        </div>
        <div
          className="flex justify-between items-center relative"
          onMouseEnter={() => setHoveredIcon('bountyRange')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <span
            className={`flex items-center gap-2 transition-opacity duration-200 ${
              hoveredIcon === 'bountyRange' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <IndianRupee size={16} /> Bounty Range
          </span>
          <span className="font-semibold  transition-opacity duration-200 ">
            ₹{program?.bountyRange?.low || 0} - ₹
            {program?.bountyRange?.high || 0}
          </span>
          <IndianRupee
            size={16}
            className="absolute left-0 opacity-100 cursor-pointer"
          />
        </div>
      </div>

      {/* CTA Button */}
      <CTAButton
        text={isDraft ? 'Continue Editing' : 'View Program Details'}
        onClick={handleClick}
        className="w-full"
      />
    </div>
  )
}

export default ProgramCard
