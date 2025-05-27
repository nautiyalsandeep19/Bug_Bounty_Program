import React, { useEffect, useState } from "react";
import CTAButton from "../../Components/Button/CTAButton";
import Severity from "./SeveritySelector";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import vulnerabilityTypes from "../../assets/CWE_list.json"; // Assuming you have a file with vulnerability types
import { use } from "react";

const Report = () => {
  const [ip, setIp] = useState("");

  const fetchIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setIp(data.ip);
    } catch (err) {
      console.error("Failed to fetch IP:", err);
    }
  };

  const RequiredMark = () => <span className="text-red-500 ml-1">*</span>;

  const [selected, setSelected] = useState("");
  const [selectedVulnerability, setSelectedVulnerability] = useState("");

  const [filteredTypes, setFilteredTypes] = useState(vulnerabilityTypes);
  useEffect(() => {
    if (!selected?.label) {
      setFilteredTypes(vulnerabilityTypes); // Show all if no selection
      return;
    }

    const filter = vulnerabilityTypes.filter(
      (type) => type.label.toLowerCase() === selected.label.toLowerCase()
    );

    setFilteredTypes(filter);
  }, [selected]);

  console.log("Filtered Types:", filteredTypes);
  console.log("Selected Vulnerability:", selectedVulnerability);
  const [selectedType, setSelectedType] = useState("");
  return (
    <section className="max-w-5xl h-full flex justify-start">
      <div className="w-full max-w-3xl p-6 space-y-10">
        <h1 className="text-3xl font-bold">Submit Report</h1>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            Select Your Scope
            <RequiredMark />
          </h2>
          <p className="text-sm text-gray-100">
            Select the scope under which the bug was identified.
          </p>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Choose scope --</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="api">API</option>
          </select>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            Vulnerable Endpoint / Affected URL (Optional)
          </h2>
          <p className="text-sm text-gray-100">
            If you have a specific endpoint or URL, enter it here.
          </p>
          <input
            type="url"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="https://example.com/endpoint"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            Vulnerability Type
            <RequiredMark />
          </h2>
          <p className="text-sm text-gray-100">
            Select the type of vulnerability that was found.
          </p>
          {/* <select
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Choose vulnerability --</option>
            <option value="xss">Cross Site Scripting (XSS)</option>
            <option value="sqli">SQL Injection</option>
            <option value="rce">Remote Code Execution</option>
          </select> */}

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex gap-4 mb-4 w-full items-start">
              

              <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                  <ListboxButton className="flex items-center justify-between w-full border border-gray-300 bg-black text-white p-2 rounded text-left">
                    {selected?.label || "Select Vulnerability Type"}
                    <ChevronDownIcon className="size-5 ml-2" />
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-black border border-gray-300 rounded shadow-lg">
                    {vulnerabilityTypes.map((type, index) => (
                      <ListboxOption
                        key={index}
                        value={type}
                        className={({ active }) =>
                          `cursor-default select-none py-2 pl-3 pr-9 ${
                            active ? "bg-indigo-600 text-white" : "text-white"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <span
                            className={`block truncate ${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {type.label}
                          </span>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
            <div>
              {filteredTypes.length > 0 ? (
                <div className="h-40 overflow-y-auto border border-gray-300 rounded p-2 space-y-2">
                  {filteredTypes.map((type, idx) => (
                    <div key={idx}>
                      
                      <div className="ml-4 flex flex-col gap-2">
                        {type.children.map((child, i) => (
                          <div
                            key={i}
                            onClick={() => setSelectedVulnerability(child.label)}
                            className={`cursor-pointer px-3 py-1 rounded border ${
                              selectedType === child.label
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-800 text-gray-200 hover:bg-indigo-500 hover:text-white"
                            }`}
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-300">No Vulnerability Found!</div>
              )}
            </div>

            <div>
              {selectedVulnerability && (
                <div className="mt-2 text-sm text-green-500">
                  Selected Vulnerability: <strong>{selectedVulnerability}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            Severity
            <RequiredMark />
          </h2>
          <p className="text-sm text-gray-100">
            Estimate how critical the bug is (e.g., using CVSS score).
          </p>
          <Severity />
        </div>

        {/* Report Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Report Details
            <RequiredMark />
          </h2>

          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Report Title"
            required
          />
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Report Summary"
            required
          />
          <textarea
            rows={5}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Describe the impact of the vulnerability..."
            required
          />

          {/* IP Address with button on the right */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="flex-1 border border-gray-300 p-2 rounded"
              placeholder="Your IP Address"
              value={ip}
              readOnly
            />
            <CTAButton onClick={fetchIP} text="Fetch IP" />
          </div>
        </div>

        {/* Submit */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Review and Submit</h2>
          <p className="text-sm text-gray-100">
            Please double-check all fields. You cannot edit after submission.
          </p>
          <CTAButton text="Submit Report " />
        </div>
      </div>
    </section>
  );
};

export default Report;
