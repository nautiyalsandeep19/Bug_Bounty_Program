import { useSelector } from 'react-redux'

const Scope = () => {
  const policyDetails = useSelector(
    (state) => state.program.programData?.assets || []
  )
  const bountyRange = useSelector(
    (state) => state.program.programData?.bountyRange
  )

  const inScopeAssets = policyDetails.filter((asset) => asset.scope !== 'out') // or !asset.isOutOfScope
  const outScopeAssets = policyDetails.filter((asset) => asset.scope === 'out') // or asset.isOutOfScope

  const bountyLevels = [
    { label: 'Critical', color: 'text-red-500', amount: bountyRange?.critical },
    { label: 'High', color: 'text-orange-400', amount: bountyRange?.high },
    { label: 'Medium', color: 'text-yellow-400', amount: bountyRange?.medium },
    { label: 'Low', color: 'text-blue-400', amount: bountyRange?.low },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Program Statistics */}
        <div className="bg-[#141519] border border-green-700 rounded-lg p-6 text-white space-y-2">
          <h2 className="text-xl font-semibold">Program Statistics</h2>
          <p className="text-sm text-gray-400">Total Reports</p>
          <p className="text-2xl">1</p>
          <p className="text-sm text-gray-400">Total Paid</p>
          <p className="text-2xl text-green-400">$12,500</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
              Bug Bounty
            </span>
            <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full">
              public
            </span>
          </div>
        </div>

        {/* Bounty Configuration */}
        <div className="bg-[#141519] border border-green-700 rounded-lg p-6 text-white space-y-3">
          <h2 className="text-xl font-semibold">Bounty Configuration</h2>
          {bountyLevels.map(({ label, color, amount }) => (
            <div key={label} className="flex justify-between items-center">
              <span className={`${color} font-medium`}>● {label}</span>
              <span className="text-white font-medium">{amount}</span>
            </div>
          ))}
        </div>

        {/* Program Assets */}
        <div className="bg-[#141519] border border-green-700 rounded-lg p-6 text-white space-y-4">
          <h2 className="text-xl font-semibold">Program Assets</h2>
          {/* In Scope */}
          <div>
            <p className="text-sm text-gray-400 mb-1">
              In Scope ({inScopeAssets.length})
            </p>
            {inScopeAssets.map((a, idx) => (
              <p
                key={idx}
                className="bg-black text-green-400 text-sm p-2 rounded mb-1 font-mono break-words"
              >
                {a.assetURL || a.url}
              </p>
            ))}
          </div>

          {/* Out of Scope */}
          {outScopeAssets.length > 0 && (
            <div>
              <p className="text-sm text-gray-400 mt-3 mb-1">
                Out of Scope ({outScopeAssets.length})
              </p>
              {outScopeAssets.map((a, idx) => (
                <p
                  key={idx}
                  className="bg-black text-red-400 text-sm p-2 rounded mb-1 font-mono break-words"
                >
                  {a.assetURL || a.url}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Scope
