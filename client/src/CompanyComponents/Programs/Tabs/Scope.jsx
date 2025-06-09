import React from "react";
import { useSelector } from "react-redux";

const Scope = () => {
  const policyDetails = useSelector((state) => state.program.programData?.assets || []);
  console.log("dsdflksfnksfd",policyDetails[0])
  const bountyRange = useSelector((state) => state.program.programData?.bountyRange);
  

  const rewardLevels = [
    { label: "High", color: "bg-orange-400", amount: bountyRange?.high },
    { label: "Medium", color: "bg-yellow-400", amount: bountyRange?.medium },
    { label: "Low", color: "bg-green-400", amount: bountyRange?.low },
  ];

  const Tag = ({ text }) => (
    <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mr-1">{text}</span>
  );

 const AssetRow = ({ asset }) => (
  <div className="bg-gray-50 text-black p-4 mt-2 rounded space-y-2">
    <div className="flex">
      <span className="font-semibold w-32">Asset:</span>
      <a href={asset.asset} className="text-blue-600 break-all" target="_blank" rel="noopener noreferrer">
        {asset.asset}
      </a>
    </div>
    <div className="flex">
      <span className="font-semibold w-32">Type:</span>
      <span>{asset.type}</span>
    </div>
    <div className="flex">
      <span className="font-semibold w-32">Last Update:</span>
      <span>{new Date(asset.lastUpdate || asset.createdAt).toLocaleDateString()}</span>
    </div>
    <div className="flex items-start">
      <span className="font-semibold w-32">Labels:</span>
      <div className="flex flex-wrap gap-2">
        {(asset.labels || []).map((label, idx) => (
          <Tag key={idx} text={label} />
        ))}
      </div>
    </div>
  </div>
);


  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <div className="border justify-between rounded-lg p-5 bg-black">
        <div className="flex justify-between gap-2 mb-2">
          <span className="text-lg font-semibold text-white">In Scope Targets</span>
          <span className="bg-green-500 text-white font-bold px-2 py-1.5 text-xs rounded-full">✓ In Scope</span>
        </div>

        <p className="text-sm text-white mb-4">Rewards Information</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag text="💰 Eligible for Bounty" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {rewardLevels.map(({ label, color, amount }) => (
            <div key={label} className="flex items-center gap-1 text-sm">
              <span className={`text-white text-xs px-2 py-1 rounded ${color}`}>{label}</span>
              <span className="text-white font-medium">{amount}</span>
            </div>
          ))}
        </div>

        {/* <div className="bg-gray-500 p-2 text-sm font-semibold grid grid-cols-5 text-center rounded">
          <span className="text-left pl-2">Asset</span>
          <span>Type</span>
          <span>Last update</span>
          <span>Reports Resolved</span>
          <span>Labels</span>
        </div> */}

        {policyDetails.map((asset, idx) => (
  <AssetRow
    key={idx}
    asset={{
      asset: asset.assetURL || asset.url,
      // description: asset.assetDescription || asset.description,
      type: asset.assetType || asset.type,
      lastUpdate: asset.updatedAt || asset.createdAt,
      reportsResolved: "0 (0%)",
      labels: asset.labels || [],
    }}
  />
))}

      </div>
    </div>
  );
};

export default Scope;
