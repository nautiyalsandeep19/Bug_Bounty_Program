import React from "react";

const Scope = () => {
  const scopeData = {
    inScope: [
      {
        asset: "https://bugbase.ai",
        description: "BugBase Web App",
        type: "Web",
        lastUpdate: "Apr 30, 2025",
        reportsResolved: "0 (0%)",
        labels: ["Production"],
      },
    ],
    outScope: [
      {
        asset: "https://testing.bugbase.in/",
        description: "BugBase Testing",
        type: "Web",
        lastUpdate: "Sep 19, 2022",
        reportsResolved: "0 (0%)",
        labels: ["Testing", "Staging"],
      },
      {
        asset: "https://employee.bugbase.in/",
        description: "BugBase Employee",
        type: "Web",
        lastUpdate: "Sep 19, 2022",
        reportsResolved: "0 (0%)",
        labels: ["Production", "Internal", "+1"],
      },
    ],
  };

  const rewardLevels = [
    { label: "Critical", color: "bg-red-500", amount: "$500" },
    { label: "High", color: "bg-orange-400", amount: "$250" },
    { label: "Medium", color: "bg-yellow-400", amount: "$100" },
    { label: "Low", color: "bg-green-400", amount: "$0" },
  ];

  const RewardLabel = ({ text, color }) => (
    <span className={`text-white text-xs px-2 py-1 rounded ${color}`}>{text}</span>
  );

  const Tag = ({ text }) => (
    <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mr-1">{text}</span>
  );

  const AssetRow = ({ asset }) => (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 mt-2 rounded">
      <div className="flex-1 text-sm">
        <a href={asset.asset} className="text-blue-600 underline">{asset.asset}</a>
        <div className="text-gray-500">{asset.description}</div>
      </div>
      <div className="text-sm w-full md:w-1/6 text-center">{asset.type}</div>
      <div className="text-sm w-full md:w-1/6 text-center">{asset.lastUpdate}</div>
      <div className="text-sm w-full md:w-1/6 text-center">{asset.reportsResolved}</div>
      <div className="flex gap-2 flex-wrap justify-center mt-2 md:mt-0 w-full md:w-1/6">
        {asset.labels.map((label, idx) => <Tag key={idx} text={label} />)}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* In Scope */}
      <div className="border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-semibold">In Scope Targets</span>
          <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full">✓ In Scope</span>
        </div>
        <p className="text-sm mb-4">Rewards Information</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag text="💰 Eligible for Bounty" />
          <Tag text="🎁 Eligible for Swag" />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {rewardLevels.map(({ label, color, amount }) => (
            <div key={label} className="flex items-center gap-1 text-sm">
              <span className={`text-white text-xs px-2 py-1 rounded ${color}`}>{label}</span>
              <span className="text-gray-700 font-medium">{amount}</span>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-2 text-sm font-semibold grid grid-cols-5 text-center rounded">
          <span className="text-left pl-2">Asset</span>
          <span>Type</span>
          <span>Last update</span>
          <span>Reports Resolved</span>
          <span>Labels</span>
        </div>
        {scopeData.inScope.map((asset, idx) => (
          <AssetRow asset={asset} key={idx} />
        ))}
      </div>

      {/* Out of Scope */}
      <div className="border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-semibold">Out Of Scope Targets</span>
          <span className="bg-red-100 text-red-700 px-2 py-1 text-xs rounded-full">× Out Of Scope</span>
        </div>
        <p className="text-sm mb-4">Rewards Information</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-red-200 text-red-800 text-xs px-3 py-1 rounded-full">🚫 Ineligible for Bounty</span>
          <span className="bg-red-200 text-red-800 text-xs px-3 py-1 rounded-full">🚫 Ineligible for Swag</span>
        </div>
        <div className="bg-gray-100 p-2 text-sm font-semibold grid grid-cols-5 text-center rounded">
          <span className="text-left pl-2">Asset</span>
          <span>Type</span>
          <span>Last update</span>
          <span>Reports Resolved</span>
          <span>Labels</span>
        </div>
        {scopeData.outScope.map((asset, idx) => (
          <AssetRow asset={asset} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Scope;
