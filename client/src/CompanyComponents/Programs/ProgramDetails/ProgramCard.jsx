// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import CTAButton from '../../../Common/Button/CTAButton'

// const ProgramCard = ({ program }) => {
//   const navigate = useNavigate()
//   const token = useSelector((state) => state.auth.token)
//   const userType = useSelector((state) => state.auth.userType)
//   console.log('programdata', program)

//   return (
//     <div className="bg-[#0f172a] text-white max-w-md w-full mx-auto rounded-2xl border border-[#1e293b] p-8 shadow-lg hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
//       <p className="relative top-[-15px] left-[-20px] bg-white text-[10px] text-black font-bold border w-fit p-1 rounded-lg px-5">
//         {program.type}
//       </p>

//       {/* Icon Circle */}
//       <div className="flex justify-center mb-6">
//         <img
//           src={program.company.image}
//           alt={program.name}
//           className="w-20 h-20 object-cover rounded-full"
//         />
//       </div>

//       {/* Program Info */}
//       <div className="text-center">
//         <h3 className="text-xl font-extrabold mb-1">{program.title}</h3>
//         <h3 className="text-xl font-extrabold mb-1">{program.type}</h3>
//       </div>

//       {/* CTA Button */}
//       <div className="flex justify-center mt-6">
//         <CTAButton
//           text=" View Program"
//           onClick={() =>
//             token
//               ? navigate(`/${userType}/programs/${program._id}`)
//               : navigate(`/programs/${program._id}`)
//           }
//         />
//       </div>
//     </div>
//   )
// }

// export default ProgramCard

// // import { useSelector } from 'react-redux'
// // import { useNavigate } from 'react-router-dom'
// // import CTAButton from '../../../Common/Button/CTAButton'

// // const ProgramCard = ({ program, isDraft }) => {
// //   const navigate = useNavigate()
// //   const token = useSelector((state) => state.auth.token)
// //   const userType = useSelector((state) => state.auth.userType)

// //   return (
// //     <div
// //       className={`bg-[#0f172a] text-white max-w-md w-full mx-auto rounded-2xl border ${
// //         isDraft ? 'border-yellow-500' : 'border-[#1e293b]'
// //       } p-8 shadow-lg hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
// //     >
// //       <div className="flex justify-between items-start">
// //         <p className="relative top-[-15px] left-[-20px] bg-white text-[10px] text-black font-bold border w-fit p-1 rounded-lg px-5">
// //           {program.type}
// //         </p>
// //         {isDraft && (
// //           <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
// //             DRAFT
// //           </span>
// //         )}
// //       </div>

// //       {/* Icon Circle */}
// //       <div className="flex justify-center mb-6">
// //         <img
// //           src={program.company?.image || '/default-company.png'}
// //           alt={program.name}
// //           className="w-20 h-20 object-cover rounded-full"
// //         />
// //       </div>

// //       {/* Program Info */}
// //       <div className="text-center">
// //         <h3 className="text-xl font-extrabold mb-1">{program.title}</h3>
// //         <p className="text-sm text-gray-400 mb-4">
// //           {program.visibility === 'private'
// //             ? 'Private Program'
// //             : 'Public Program'}
// //         </p>
// //       </div>

// //       {/* CTA Button */}
// //       <div className="flex justify-center mt-6">
// //         <CTAButton
// //           text={isDraft ? 'Continue Editing' : 'View Program'}
// //           onClick={() => {
// //             if (isDraft) {
// //               navigate('/addprogram', { state: { programId: program._id } })
// //             } else {
// //               navigate(`/programs/${program._id}`)
// //             }
// //           }}
// //         />
// //       </div>
// //     </div>
// //   )
// // }

// // export default ProgramCard

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CTAButton from '../../../Common/Button/CTAButton'

const ProgramCard = ({ program, isDraft }) => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const userType = useSelector((state) => state.auth.userType)

  return (
    <div
      className={`bg-[#0f172a] text-white max-w-md w-full mx-auto rounded-2xl border ${
        isDraft ? 'border-yellow-500' : 'border-[#1e293b]'
      } p-8 shadow-lg hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
    >
      <div className="flex justify-between items-start">
        <p className="relative top-[-15px] left-[-20px] bg-white text-[10px] text-black font-bold border w-fit p-1 rounded-lg px-5">
          {program.type}
        </p>
        {isDraft && (
          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
            DRAFT
          </span>
        )}
      </div>

      {/* Icon Circle */}
      <div className="flex justify-center mb-6">
        <img
          src={program.company?.image || '/default-company.png'}
          alt={program.name}
          className="w-20 h-20 object-cover rounded-full"
        />
      </div>

      {/* Program Info */}
      <div className="text-center">
        <h3 className="text-xl font-extrabold mb-1">{program.title}</h3>
        <p className="text-sm text-gray-400 mb-4">
          {program.visibility === 'private'
            ? 'Private Program'
            : 'Public Program'}
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-6">
        <CTAButton
          text={isDraft ? 'Continue Editing' : 'View Program'}
          onClick={() => {
            if (isDraft) {
              navigate('/addprogram', { state: { programId: program._id } })
            } else {
              token
                ? navigate(`/${userType}/programs/${program._id}`)
                : navigate(`/programs/${program._id}`)
            }
          }}
        />
      </div>
    </div>
  )
}

export default ProgramCard
