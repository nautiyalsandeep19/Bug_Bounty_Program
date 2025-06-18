// ProgramCreation.jsx
import React, { useEffect, useState } from 'react'
import ProgramTypeModal from './ProgramTypeModal'
import CreateProgram from './AddProgram'
import { useEditor } from '@tiptap/react'

const ProgramCreation = () => {
  const [programType, setProgramType] = useState(null)

 
  useEffect(()=>{
     setProgramType(localStorage.getItem('selectedProgramType'));
  },[])

  return (
    <>
      {!programType && (
        <ProgramTypeModal
          onClose={() => {}}
          onSelect={(type) => {
            setProgramType(type)
            localStorage.setItem('selectedProgramType', type)
          }}
        />
      )}
      {programType && <CreateProgram selectedType={programType} />}
    </>
  )
}

export default ProgramCreation
