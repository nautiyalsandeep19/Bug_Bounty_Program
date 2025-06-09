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
export const updateReportStatus = async ({ reportId, status }) => {
  try {
    const response = await apiConnector(
      'PUT',
      `${endPoints.UPDATE_REPORT_STATUS}/${reportId}`,
      { status }
    );

    console.log('Update Report Status Response:', response);

    // Backend returns success: false with a 200 status if status is unchanged
    if (response?.success === false && response?.message?.includes('already')) {
      toast(response.message); // Show toast like: "Status is already 'In Progress'"
      return null;
    }

    if (!response?.success) {
      toast.error(response.message || 'Unknown error occurred');
      throw new Error(response.message);
    }

    toast.success('Report status updated successfully');
    return response.report;
  } catch (error) {
    console.error('Error updating report status:', error);
    toast.error('Failed to update report status');
    return null;
  }
};
