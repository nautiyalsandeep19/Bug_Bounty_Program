import React from 'react'
import '../../Common/Editor/TiptapEditor.css'

const ReportTemplate = ({
  scope,
  endpoint,
  vulnerabilityType,
  reportTitle,
  reportSummary,
  severityData,
  vulnerabilityImpact,
  reportPOC,
  attachments = [],
}) => {
  return (
    <div className="shadow-lg border border-gray-200 rounded-xl p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2 mt-4">
        📝 Vulnerability Report Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p>
          <span className="font-semibold text-blue-500"> Scope:</span> {scope}
        </p>
        <p>
          <span className="font-semibold text-blue-500"> Endpoint:</span>{' '}
          {endpoint || 'N/A'}
        </p>
        <p>
          <span className="font-semibold text-blue-500">
            Vulnerability Type:
          </span>{' '}
          {vulnerabilityType}
        </p>
        <p>
          <span className="font-semibold text-blue-500"> Report Title:</span>{' '}
          {reportTitle}
        </p>
        <p className="sm:col-span-2">
          <span className="font-semibold text-blue-500"> Summary:</span>{' '}
          {reportSummary}
        </p>
        <p>
          <span className="font-semibold text-blue-500"> Severity:</span>{' '}
          {severityData?.severity || 'N/A'}
        </p>
        <p>
          <span className="font-semibold text-blue-500"> Impact:</span>{' '}
          {vulnerabilityImpact}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-700 mb-2 flex items-center gap-2">
          Proof of Concept (POC)
        </h3>
        <div className="ProseMirror ">
          <div dangerouslySetInnerHTML={{ __html: reportPOC }} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-700 mb-2 flex items-center gap-2">
          📎 Attachments
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {attachments.length > 0 ? (
            attachments.map((file, idx) => (
              <li key={idx}>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" transition"
                >
                  {file.name}
                </a>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No attachments</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ReportTemplate
