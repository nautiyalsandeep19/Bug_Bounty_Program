import React from "react";
import { updateReportStatus } from "../Services/reportApi";

const TriagerDashboard = () => {
  const updateReport = ()=>{updateReportStatus({
    reportId: "683edea9dc6aa4314fc5e527", status: "completed"})}


    return <div>Triager Dashboard 

      <button  className="p-2 border cursor-pointer" onClick={updateReport}>Update Report</button>
    </div>
};
export default TriagerDashboard;
