import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CTAButton from '../../../Common/Button/CTAButton'
import { UsersRound, Hourglass, IndianRupee } from 'lucide-react'
const ProgramCard = ({ program, isDraft }) => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const userType = useSelector((state) => state.auth.userType)

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
    <div className="bg-secondarybg max-w-md w-full rounded-2xl shadow-lg border-1 border-green-400 p-6 space-y-4 hover:scale-1.2">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            src={program?.company?.image || '/default-company.png'}
            alt="company"
            className="w-15 h-15 rounded-full object-cover"
          />
          <div>
            <h2 className=" text-lg ">{program?.title}</h2>
            <p className="text-sm text-secondaryText">
              {program?.company?.name}
            </p>
          </div>
        </div>

        <span
          className={`text-sm px-3 py-1 rounded-full  ${
            program.visibility === 'private'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {program.visibility === 'private' ? 'Private' : 'Public'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-secondaryText">
        {program?.description || 'No description provided.'}
      </p>

      {/* Tags (Hardcoded for now - replace if you have categories) */}
      {/* <div className="flex flex-wrap gap-2">
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
          Web Security
        </span>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
          Mobile
        </span>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
          API
        </span>
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
          +2 more
        </span>
      </div> */}

      {/* Info Box */}
      <div className="bg-gray-300 rounded-xl px-4 py-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-1">
            <UsersRound size={18} /> Participants
          </span>
          <span className="font-semibold text-black">
            {program?.participants || 0}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-1">
            <Hourglass size={18} /> Response Time
          </span>
          <span className="font-semibold text-black">
            {program?.avgTime || 'N/A'} days
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-1">
            <IndianRupee size={18} /> Bounty Range
          </span>
          <span className="font-semibold text-black">
            {program?.bountyRange?.low || 0} - {program?.bountyRange?.high}
          </span>
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
