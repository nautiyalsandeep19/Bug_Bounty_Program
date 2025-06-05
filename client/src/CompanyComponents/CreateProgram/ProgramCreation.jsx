// ProgramCreation.jsx
import React, { useState } from 'react'
import ProgramTypeModal from './ProgramTypeModal'
import CreateProgram from './AddProgram'

const ProgramCreation = () => {
  const [programType, setProgramType] = useState(null)

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
