import React, { useEffect, useState } from 'react'
import { CVSS40 } from '@pandatix/js-cvss'

const severityLevels = ['Informational', 'Low', 'Moderate', 'High', 'Critical']

const fieldOptions = {
  AV: ['Network', 'Adjacent', 'Local', 'Physical'],
  AC: ['Low', 'High'],
  AT: ['None', 'Present'],
  PR: ['None', 'Low', 'High'],
  UI: ['None', 'Passive', 'Active'],
  VC: ['None', 'Low', 'High'],
  VI: ['None', 'Low', 'High'],
  VA: ['None', 'Low', 'High'],
  SC: ['None', 'Low', 'High'],
  SI: ['None', 'Low', 'High'],
  SA: ['None', 'Low', 'High'],
}

const fieldFullNames = {
  AV: 'Attack Vector',
  AC: 'Attack Complexity',
  AT: 'Attack Requirements',
  PR: 'Privileges Required',
  UI: 'User Interaction',
  VC: 'Confidentiality Impact',
  VI: 'Integrity Impact',
  VA: 'Availability Impact',
  SC: 'Scope Change',
  SI: 'Security Impact',
  SA: 'Safety Impact',
}

const severityColors = {
  Critical: 'bg-red-600',
  High: 'bg-orange-500',
  Moderate: 'bg-yellow-500',
  Low: 'bg-green-600',
  Informational: 'bg-blue-600',
}

const SeveritySelector = () => {
  const [mode, setMode] = useState('severity')
  const [cvssFields, setCvssFields] = useState({
    AV: 'Network',
    AC: 'Low',
    AT: 'None',
    PR: 'None',
    UI: 'None',
    VC: 'None',
    VI: 'None',
    VA: 'None',
    SC: 'None',
    SI: 'None',
    SA: 'None',
  })

  const [baseScore, setBaseScore] = useState(0.0)
  const [severity, setSeverity] = useState('None')

  const mapScoreToSeverity = (score) => {
    if (score === 0) return 'None'
    if (score <= 3.9) return 'Low'
    if (score <= 6.9) return 'Moderate'
    if (score <= 8.9) return 'High'
    return 'Critical'
  }

  const calculateScoreAndSeverity = (fields) => {
    const getShort = (val) => val.charAt(0).toUpperCase()

    try {
      const vectorString = `CVSS:4.0/AV:${getShort(fields.AV)}/AC:${getShort(
        fields.AC
      )}/AT:${getShort(fields.AT)}/PR:${getShort(fields.PR)}/UI:${getShort(
        fields.UI
      )}/VC:${getShort(fields.VC)}/VI:${getShort(fields.VI)}/VA:${getShort(
        fields.VA
      )}/SC:${getShort(fields.SC)}/SI:${getShort(fields.SI)}/SA:${getShort(
        fields.SA
      )}`

      const vec = new CVSS40(vectorString)
      const score = vec.Score()

      setBaseScore(score.toFixed(1))
      setSeverity(mapScoreToSeverity(score))
    } catch (err) {
      setBaseScore(0)
      setSeverity('None')
      console.error('Error calculating CVSS score:', err)
    }
  }

  useEffect(() => {
    calculateScoreAndSeverity(cvssFields)
  }, [cvssFields])

  const handleCVSSChange = (key, value) => {
    setCvssFields({ ...cvssFields, [key]: value })
  }

  return (
    <div className="w-full bg-black text-white md:max-w-[800px] h-fit p-4 rounded-lg space-y-4">
      {/* Mode Toggle */}
      <div className="flex flex-wrap items-center gap-6 border border-gray-700 rounded px-4 py-2">
        {['severity', 'cvss'].map((m) => (
          <label
            key={m}
            className="flex items-center cursor-pointer select-none gap-2"
          >
            <input
              type="radio"
              name="mode"
              checked={mode === m}
              onChange={() => setMode(m)}
              className="hidden"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                mode === m ? 'border-blue-500' : 'border-gray-600'
              }`}
            >
              {mode === m && (
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              )}
            </span>
            <span className="capitalize">
              {m === 'severity' ? 'Severity Picker' : 'CVSS Calculator'}
            </span>
          </label>
        ))}
      </div>

      {/* Severity Picker Mode */}
      {mode === 'severity' ? (
        <div className="flex flex-wrap items-center gap-2 border border-gray-700 rounded px-4 py-2">
          {severityLevels.map((level) => {
            const isSelected = level === severity
            return (
              <button
                key={level}
                onClick={() => setSeverity(level)}
                className={`px-3 py-1 rounded text-sm border transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 text-blue-400'
                    : 'border-gray-600 text-white hover:border-gray-400 hover:bg-gray-800'
                }`}
              >
                {level}
              </button>
            )
          })}

          <div className="ml-auto flex items-center gap-2 font-semibold text-sm">
            <div
              className={`w-4 h-4 rounded-sm ${
                severityColors[severity] || 'bg-gray-600'
              }`}
            ></div>
            <span>{severity}</span>
          </div>
        </div>
      ) : (
        // CVSS Calculator Mode
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-900 p-4 rounded-lg ">
          {Object.keys(cvssFields).map((field) => (
            <div key={field}>
              <label className="block font-bold mb-1 text-sm ">
                {fieldFullNames[field]} ({field})
              </label>
              <div className="flex flex-wrap gap-2">
                {(fieldOptions[field] || []).map((opt) => (
                  <button
                    key={opt}
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      cvssFields[field] === opt
                        ? 'bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => handleCVSSChange(field, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Score Summary */}
          <div className="col-span-full mt-4 text-base sm:text-lg ">
            Base Score: <strong>{baseScore}</strong> <br />
            Severity:{' '}
            <span
              className={`font-bold ${
                severity === 'Critical'
                  ? 'text-red-600'
                  : severity === 'High'
                  ? 'text-orange-400'
                  : severity === 'Moderate'
                  ? 'text-yellow-300'
                  : severity === 'Low'
                  ? 'text-green-400'
                  : 'text-white'
              }`}
            >
              {severity}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SeveritySelector
