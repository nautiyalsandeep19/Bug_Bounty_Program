import { useNavigate } from 'react-router-dom'

const ProgramCard = ({ program }) => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-[#0f172a] text-white max-w-md w-full mx-auto rounded-2xl border border-[#1e293b] p-8 shadow-lg hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/programsmaindetails/${program._id}`)}
    >
      <p className="relative top-[-15px] left-[-20px] bg-white text-[10px] text-black font-bold border w-fit p-1 rounded-lg px-5">
        {program.type}
      </p>

      {/* Icon Circle */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-[#1e293b] shadow-inner">
          <img
            src={
              'https://images.unsplash.com/photo-1545231027-637d2f6210f8?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={program.name}
            className="w-12 h-12 object-cover"
          />
        </div>
      </div>

      {/* Program Info */}
      <div className="text-center">
        <h3 className="text-xl font-extrabold mb-1">{program.title}</h3>
        <h3 className="text-xl font-extrabold mb-1">{program.type}</h3>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-blue-400/50 transition">
          View Program
        </button>
      </div>
    </div>
  )
}

export default ProgramCard
