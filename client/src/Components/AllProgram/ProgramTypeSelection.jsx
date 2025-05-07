import React from "react";

const types = [
  {
    title: "Vulnerability Disclosure Program",
    type: "VDP",
    description:
      "Collaborative, no-bounty only-swag initiative following ISO 29147, encourages public reporting to tackle high-volume vulnerabilities",
  },
  {
    title: "Private Bug Bounty Program",
    type: "private",
    description:
      "Exclusive program for selected researchers, fostering deeper security assessment on confidential or new projects",
  },
  {
    title: "Public Bug Bounty Program",
    type: "bug-bounty",
    description:
      "Incentivizes researchers to find and report vulnerabilities in our public-facing systems, promoting community engagement",
  },
];

const ProgramTypeSelection = ({ onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Select Program Type</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {types.map((item) => (
          <div
            key={item.type}
            className="border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer"
            onClick={() => onSelect(item.type)}
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramTypeSelection;
