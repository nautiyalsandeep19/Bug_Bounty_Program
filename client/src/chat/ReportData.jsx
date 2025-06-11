import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router';

const ReportData = () => {
  const [report, setReport] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { reportId } = useParams();
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL || 'http://localhost:8000';

  // Status options from your enum
  const statusOptions = [
    'submitted',
    'underreview',
    'triage',
    'completed',
    'rejected',
    'draft'
  ];

  const fetchReportDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found');
        return;
      }

      const res = await axios.get(`${BASE_URL}/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success) {
        setReport(res.data.report);
      } else {
        toast.error(res.data.message || 'Failed to load report');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      if (error.response?.status === 401) {
        toast.error('Please login again');
      } else {
        toast.error(error.response?.data?.message || 'Error loading report');
      }
    }
  };

  useEffect(() => {
    if (reportId) fetchReportDetails();
  }, [reportId]);

  const handleStatusUpdate = async (newStatus) => {
    if (!reportId || !newStatus || isUpdating) return;
    
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/api/reports/updateStatus/${reportId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setReport(prev => ({ ...prev, status: newStatus }));
      } else {
        toast(response.data.message, { icon: 'ℹ️' });
      }
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!report) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Severity color mapping
  const severityColors = {
    Critical: 'bg-red-600',
    High: 'bg-red-500',
    Moderate: 'bg-yellow-500',
    Low: 'bg-blue-500',
    Informational: 'bg-gray-500'
  };

  // Status color mapping
  const statusColors = {
    submitted: 'bg-blue-100 text-blue-800',
    underreview: 'bg-purple-100 text-purple-800',
    triage: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800'
  };

  // Status display names
  const statusDisplayNames = {
    submitted: 'Submitted',
    underreview: 'Under Review',
    triage: 'Triage',
    completed: 'Completed',
    rejected: 'Rejected',
    draft: 'Draft'
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] py-8 px-4">
      <div className="max-w-4xl m-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Report Header */}
        <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  severityColors[report.severity] || 'bg-gray-500'
                }`}>
                  {report.severity}
                </span>
                <div className="relative group">
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusUpdate(e.target.value)}
                    disabled={isUpdating}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[report.status] || 'bg-gray-100 text-gray-800'
                    } appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                      isUpdating ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                  >
                    {statusOptions.map((status) => (
                      <option 
                        key={status} 
                        value={status}
                        className="bg-white text-gray-800"
                      >
                        {statusDisplayNames[status]}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {isUpdating ? (
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Submitted on</p>
              <p className="font-medium">
                {new Date(report.submitDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Report Body */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Vulnerability Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium text-gray-600">Type:</span> {report.vulnerabilityType}</p>
                <p><span className="font-medium text-gray-600">Scope:</span> {report?.scope}</p>
                <p><span className="font-medium text-gray-600">Endpoint:</span> {report.vulnerableEndpoint}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Reporter</h2>
              <div className="flex items-center space-x-3">
                <img 
                  src={report.hackerId?.image} 
                  alt={report.hackerId?.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{report.hackerId?.name}</p>
                  <p className="text-sm text-gray-600">{report.hackerId?.email}</p>
                  <p className="text-xs text-gray-500">Rank: #{report.hackerId?.globalRank}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Summary</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{report.summary}</p>
          </div>

          {/* Impact */}
          {report.vulnerabilityImpact && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Impact</h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{report.vulnerabilityImpact}</p>
            </div>
          )}

          {/* Proof of Concept */}
          <div className='text-black'>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Proof of Concept</h2>
            <div 
              className="prose max-w-none bg-gray-50 p-4 mt-5 rounded-lg border border-gray-200"
              dangerouslySetInnerHTML={{ __html: report.POC }}
            />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><span className="font-medium">Created:</span> {new Date(report.createdAt).toLocaleString()}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(report.updatedAt).toLocaleString()}</p>
            </div>
            {report.tags && report.tags.length > 0 && (
              <div>
                <p className="font-medium">Tags:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {report.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportData;