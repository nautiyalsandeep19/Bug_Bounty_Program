import { endPoints, apiConnector } from "./ApiConnector/api";
import toast from 'react-hot-toast';

export const createReport = async (reportData) => {
  try {
    const response = await apiConnector('POST', endPoints.CREATE_REPORT, reportData);
    console.log('Create Report Response:', response);

    if (!response.success) {
      toast.error(response.message);
      throw new Error(response.message);
    }

    toast.success('Report created successfully');
    return response.report;
  } catch (error) {
    console.error('Error creating report:', error);
    toast.error('Failed to create report');
    return null;
  }
}

export const updateReportStatus = async (statusData) => {
  try {
    const response = await apiConnector('POST', endPoints.UPDATE_REPORT_STATUS, statusData);
    console.log('Update Report Status Response:', response);

    if (!response.success) {
      toast.error(response.message);
      throw new Error(response.message);
    }

    toast.success('Report status updated successfully');
    return response.updatedReport;
  } catch (error) {
    console.error('Error updating report status:', error);
    toast.error('Failed to update report status');
    return null;
  }
}