import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProgramData } from '../../../Slices/programSlice.js'
import { useEffect } from 'react'
import axios from 'axios'
import ProgramBox from '../../../HackerComponents/ProgramBox.jsx'
import ProgramTabs from './ProgramRibbon.jsx'

const ProgramMainDetail = () => {
  const { programId } = useParams()
  const dispatch = useDispatch()
  const program = useSelector((state) => state.program.programData)
  const token = useSelector((state) => state.auth.token)
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/programs/Programs/${programId}`
        )
        dispatch(setProgramData(response.data.data))
      } catch (error) {
        console.error('Failed to fetch program:', error)
      }
    }

    if (programId) {
      fetchProgram()
    }
  }, [programId, dispatch])

  if (!program) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-full mx-auto">
      <div className="flex-1 max-h-screen px-4 py-6">
        <ProgramTabs />
      </div>

      {token ? (
        <div className="w-full lg:w-[450px] p-4">
          <div className="sticky top-4">
            <ProgramBox program={program} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ProgramMainDetail
