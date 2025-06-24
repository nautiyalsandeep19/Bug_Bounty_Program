import React, { useEffect, useRef, useState } from 'react'
import CTAButton from '../../Common/Button/CTAButton'
import Severity from './SeveritySelector'
import { UploadCloud } from 'lucide-react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import vulnerabilityTypes from '../../assets/CWE_list.json'

import { createReport } from '../../Services/reportApi'
import TiptapEditor from '../../Common/Editor/TiptapEditor'
import { uploadFiles } from '../../Services/uploaderApi'
import toast from 'react-hot-toast'
import ReportTemplate from './ReportTemplate'
import '../../Common/Editor/TiptapEditor.css'
import { useSelector } from 'react-redux'
import { Bug } from 'lucide-react'

const Report = () => {
  const [scope, setScope] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [reportTitle, setReportTitle] = useState('')
  const [reportSummary, setReportSummary] = useState('')
  const [reportPOC, setReportPOC] = useState('')
  const [severityData, setSeverityData] = useState({})
  const [vulnerabilityType, setVulnerabilityType] = useState('')
  const [selected, setSelected] = useState('')
  const [selectedVulnerability, setSelectedVulnerability] = useState('')
  const [filteredTypes, setFilteredTypes] = useState(vulnerabilityTypes)
  const [vulnerabilityImpact, setVulnerabilityImpact] = useState('')
  const [attachments, setAttachments] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const program = useSelector((state) => state.program.programData)
  const [assets, setAssets] = useState([])

  const editorRef = useRef(null)

  const resetForm = () => {
    setScope('')
    setEndpoint('')
    setReportTitle('')
    setReportSummary('')
    setReportPOC('')
    setSeverityData({})
    setVulnerabilityType('')
    setSelected('')
    setSelectedVulnerability('')
    setFilteredTypes(vulnerabilityTypes)
    setVulnerabilityImpact('')
    setAttachments([])
    setShowPreview(false)
    editorRef.current?.editor?.commands.clearContent(true)
  }

  console.log('PRogramData : ', program)
  const MAX_TOTAL_SIZE_MB = 5

  const handleAttachmentsChange = async (e) => {
    const files = Array.from(e.target.files)
    const totalSize = files.reduce((acc, file) => acc + file.size, 0)

    if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      alert(`Total file size must not exceed ${MAX_TOTAL_SIZE_MB} MB.`)
      return
    }

    try {
      const uploadedFiles = []
      for (const file of files) {
        const fileUrl = await uploadFiles(file)

        if (fileUrl) {
          uploadedFiles.push({ name: file.name, url: fileUrl })
          toast.success('file uploaded successfully')
        }
      }

      setAttachments((prev) => [...prev, ...uploadedFiles])
    } catch (error) {
      console.error('File upload failed:', error)
      alert('One or more files failed to upload.')
    }
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
      vulnerabilityImpact,
      attachments,
      testingEmail: '',
      status: 'submitted',
      submitDate: new Date().toISOString(),
    }

    const payload = {
      programId: `${program._id}`,

      reportData,
    }

    try {
      await createReport(payload)
      resetForm()
    } catch (error) {
      console.error('Report submission failed:', error.message)
    }
  }

  const handleReportDraft = async () => {
    const reportData = {
      scope,
      vulnerableEndpoint: endpoint,
      vulnerabilityType,
      title: reportTitle,
      summary: reportSummary,
      POC: reportPOC,
      severity: severityData.severity,
      vulnerabilityImpact: vulnerabilityImpact,

      attachments: [],
      testingEmail: '',
      status: 'draft',
    }

    const payload = {
      programId: '6652f7c0d7289f1b443cc10a',
      reportType: 'vulnerability',
      reportData,
    }

    console.log('Submitting payload:', payload)

    try {
      await createReport(payload)
      resetForm()
    } catch (error) {
      console.error('Report submission failed:', error.message)
    }
  }
  const RequiredMark = () => <span className="text-red-700 ml-1">*</span>

  return (
    <section className="  border-[0.5px] border-green-500 ">
      <div className="sticky top-0 z-20 bg-black h-full w-full px-4 py-2">
        <h1 className="flex items-center gap-2 text-xl md:text-2xl ">
          <Bug className="text-green-500" />
          Submit Vulnerability Report
        </h1>
        <p>
          Submit a detailed vulnerability report to earn bounties and improve
          your reputation
        </p>
      </div>
      <div className="  mx-auto md:p-6 space-y-10  bg-secondarybg rounded-lg shadow-md ">
        {/* Scope */}
        <div className="space-y-2">
          {/* Responsive wrapper: side by side on large screens */}
          <div className="flex flex-col lg:flex-row gap-6 mb-4">
            {/* Scope Section */}
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-lg md:text-xl  flex items-center">
                Select Your Scope
                <RequiredMark />
              </h2>
              <select
                name="scope"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="select w-full border rounded-xl px-3 py-2 bg-primarybg"
              >
                <option disabled value="">
                  Select Scope
                </option>
                {program.assets.map((asset) => (
                  <option key={asset._id} value={asset.assetURL}>
                    {asset.assetURL}
                  </option>
                ))}
              </select>

              {scope && (
                <div className="text-sm text-green-500">
                  Selected Scope: <strong>{scope}</strong>
                </div>
              )}
            </div>

            {/* Vulnerability Section */}
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-lg md:text-xl ">
                Vulnerability Type
                <RequiredMark />
              </h2>

              <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                  <ListboxButton className="flex items-center justify-between w-full border border-gray-300 bg-black text-white p-2 text-left rounded-xl">
                    {selected?.label || 'Select Vulnerability Type'}
                    <ChevronDownIcon className="size-5 ml-2" />
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 w-full max-h-20 overflow-y-auto bg-black border border-gray-300 rounded-xl shadow-lg">
                    {vulnerabilityTypes.map((type, index) => (
                      <ListboxOption
                        key={index}
                        value={type}
                        className={({ active }) =>
                          `cursor-default select-none py-2 pl-3 pr-9 ${
                            active ? 'bg-green-600 text-white' : 'text-white'
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
                  <div className="h-20 overflow-y-auto border border-gray-300 space-y-2 py-2 rounded-xl">
                    {filteredTypes.map((type, idx) => (
                      <div key={idx} className="flex flex-col">
                        {type.children.map((child, i) => (
                          <div
                            key={i}
                            onClick={() =>
                              setSelectedVulnerability(child.label)
                            }
                            className={`cursor-pointer px-3 py-2 rounded ${
                              selectedVulnerability === child.label
                                ? 'bg-green-600 text-white'
                                : 'bg-black text-gray-200 hover:bg-green-500 hover:text-white'
                            }`}
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-300">No Vulnerability Found!</div>
                )}
              </div>

              {selectedVulnerability && (
                <div className="mt-2 text-sm text-green-500">
                  Selected Vulnerability:{' '}
                  <strong>{selectedVulnerability}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Affected URL * */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">
            Affected URL <RequiredMark />
          </h2>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full border border-gray-500 p-2   bg-primarybg rounded-xl"
            placeholder="https://example.com/Vulnerable-endpoint"
          />
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl ">
            Severity
            <RequiredMark />
          </h2>
          <Severity setSeverityData={setSeverityData} />
        </div>

        {/* start */}
        {/* Report Details */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl ">
            Vulnerability Description <RequiredMark />
          </h2>

          <textarea
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded-xl bg-primarybg"
            placeholder="Provide a detailed description of the vulnerability..."
            required
          />
          <h2 className="text-lg md:text-xl ">
            Impact Assessment <RequiredMark />
          </h2>
          <textarea
            value={reportSummary}
            onChange={(e) => setReportSummary(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded-xl bg-primarybg"
            placeholder="Describe the potential impact of this vulnerability..."
            required
          />
        </div>

        {/* hi */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl ">
            Vulnerability Impact
            <RequiredMark />
          </h2>
          <textarea
            value={vulnerabilityImpact}
            onChange={(e) => setVulnerabilityImpact(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded-xl bg-primarybg"
            placeholder="Explain the impact of the vulnerability"
            required
          />
        </div>
        {/* proof of concept */}
        <div>
          <h2 className="text-lg md:text-xl  mb-4">Proof of Concept</h2>
          <TiptapEditor
            ref={editorRef}
            setReportPOC={setReportPOC}
            className="border-1 !border-gray-400 h-40  !bg-black"
          />
        </div>
        {/* Add attachments */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl  flex items-center gap-1">
            Attachments
            <RequiredMark />
          </h2>

          <label
            htmlFor="attachments"
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-green-500 transition bg-primarybg"
          >
            <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
            <span className="text-secondaryText text-sm">
              Click or drag files here to upload
            </span>
            <input
              id="attachments"
              type="file"
              multiple
              onChange={handleAttachmentsChange}
              className="hidden"
            />
          </label>

          {attachments.length > 0 && (
            <div className=" bg-primarybg p-4 rounded-md">
              <h3 className="text-sm font-semibold mb-2">Selected Files:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {attachments.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-white dark:bg-gray-900 px-3 py-2 rounded shadow"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={() =>
                        setAttachments((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="text-red-500 hover:text-red-700 ml-3 text-sm font-bold"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Submit */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Review & Submit
          </h2>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <CTAButton
              className="!bg-gray-300 !text-green-500"
              text="Save As Draft"
              onClick={handleReportDraft}
            />
            <CTAButton text="Submit Report" onClick={handleReportSubmission} />
            <CTAButton text="Preview" onClick={() => setShowPreview(true)} />
          </div>

          {showPreview && (
            <ReportTemplate
              scope={scope}
              endpoint={endpoint}
              vulnerabilityType={vulnerabilityType}
              reportTitle={reportTitle}
              reportSummary={reportSummary}
              severityData={severityData}
              vulnerabilityImpact={vulnerabilityImpact}
              reportPOC={reportPOC}
              attachments={attachments}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Report
