
import React, { useEffect, useState } from 'react'
import CTAButton from '../../Components/Button/CTAButton'
import Severity from './SeveritySelector'

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,

} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import vulnerabilityTypes from '../../assets/CWE_list.json'

import { createReport } from '../../Services/reportApi'

const Report = () => {
  const [ip, setIp] = useState("");
  const [ip, setIp] = useState('')
  const [scope, setScope] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [reportTitle, setReportTitle] = useState('')
  const [reportSummary, setReportSummary] = useState('')
  const [reportPOC, setReportPOC] = useState('')
  const [severityData, setSeverityData] = useState({
    baseScore: 0,
    severity: 'None',
  })

  const [vulnerabilityType, setVulnerabilityType] = useState('')
  const [selected, setSelected] = useState('')
  const [selectedVulnerability, setSelectedVulnerability] = useState('')
  const [filteredTypes, setFilteredTypes] = useState(vulnerabilityTypes)

  const fetchIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setIp(data.ip);
    } catch (err) {
      console.error("Failed to fetch IP:", err);
    }
  };
  }

  useEffect(() => {
    if (!selected?.label) {
      setFilteredTypes(vulnerabilityTypes)
    } else {
      const filter = vulnerabilityTypes.filter(
        (type) => type.label.toLowerCase() === selected.label.toLowerCase()
      )
      setFilteredTypes(filter)
    }
  }, [selected])

  useEffect(() => {
    setVulnerabilityType(selectedVulnerability)
  }, [selectedVulnerability])

  const handleReportSubmission = async () => {
    const reportData = {
      scope,
      vulnerableEndpoint: endpoint,
      vulnerabilityType,
      title: reportTitle,
      summary: reportSummary,
      POC: reportPOC,
      severity: severityData.severity,
      vulnerabilityImpact: reportSummary,
      ip,
      attachments: [],
      testingEmail: '',
      status: 'submitted',
    }

    const payload = {
      programId: '6652f7c0d7289f1b443cc10a',
      reportType: 'vulnerability',
      reportData,
    }

    console.log('Submitting payload:', payload)

    try {
      await createReport(payload)
      // Optionally reset form here
    } catch (error) {
      console.error('Report submission failed:', error.message)
    }
  }

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
    <section className="max-w-5xl w-full h-full mx-auto">
      <div className="w-full md:max-w-3xl mx-auto md:p-6 space-y-10 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">Submit Report</h1>

        {/* Scope */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Select Your Scope
            <RequiredMark />
          </h2>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded"
            required
          >
            <option value="">-- Choose scope --</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="api">API</option>
          </select>
        </div>

        {/* Endpoint */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Vulnerable Endpoint / Affected URL (Optional)
          </h2>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded"
            placeholder="https://example.com/endpoint"
          />
        </div>

        {/* Vulnerability Type */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Vulnerability Type
            <RequiredMark />
          </h2>


          <div className="flex flex-col gap-2 mb-4">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative w-full">
                <ListboxButton className="flex items-center justify-between w-full border border-gray-300 bg-black text-white p-2 rounded text-left">
                  {selected?.label || 'Select Vulnerability Type'}
                  <ChevronDownIcon className="size-5 ml-2" />
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-black border border-gray-300 rounded shadow-lg">
                  {vulnerabilityTypes.map((type, index) => (
                    <ListboxOption
                      key={index}
                      value={type}
                      className={({ active }) =>
                        `cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-indigo-600 text-white' : 'text-white'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ${
                            selected ? 'font-semibold' : 'font-normal'
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


            <div>
              {filteredTypes.length > 0 ? (
                <div className="h-40 overflow-y-auto border border-gray-300 rounded  space-y-2 py-2 ">
                  {filteredTypes.map((type, idx) => (
                    <div key={idx}>

                      <div className=" flex flex-col  ">

                        {type.children.map((child, i) => (
                          <div
                            key={i}

                            onClick={() =>
                              setSelectedVulnerability(child.label)
                            }
                            className={`cursor-pointer px-3 py-2 rounded ${
                              selectedVulnerability === child.label
                                ? 'bg-indigo-600 text-white'

                                : 'bg-black text-gray-200 hover:bg-indigo-500 hover:text-white'

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


            {selectedVulnerability && (
              <div className="mt-2 text-sm text-blue-500">
                Selected Vulnerability: <strong>{selectedVulnerability}</strong>
              </div>
            )}

          </div>
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Severity
            <RequiredMark />
          </h2>
          <Severity setSeverityData={setSeverityData} />
        </div>

        {/* Report Details */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Report Details
            <RequiredMark />
          </h2>

          <input
            type="text"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded"
            placeholder="Report Title"
            required
          />
          <input
            type="text"
            value={reportSummary}
            onChange={(e) => setReportSummary(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded"
            placeholder="Report Summary"
            required
          />
          <textarea
            rows={5}
            value={reportPOC}
            onChange={(e) => setReportPOC(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded"
            placeholder="Describe the impact of the vulnerability..."
            required
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              type="text"
              className="flex-1 border border-gray-500 p-2 rounded"
              placeholder="Your IP Address"
              value={ip}
              readOnly
            />
            <CTAButton onClick={fetchIP} text="Fetch IP" />
          </div>
        </div>

        {/* Submit */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Review and Submit
          </h2>
          <CTAButton text="Submit Report" onClick={handleReportSubmission} />
        </div>
      </div>
    </section>
  );
};

export default Report;
