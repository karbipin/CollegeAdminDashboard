import React, { useEffect, useState } from "react";
import { fetchApplications } from "../services/api";  
import "../pages/css/common.css"; 

const AdmissionApplicationsTable = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await fetchApplications();
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admission Applications</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Program</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Application Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app, index) => (
              <tr key={app.application_id}>
                <td>{index + 1}</td>
                <td>{app.fullname}</td>
                <td>{app.email}</td>
                <td>{app.contact}</td>
                <td>{app.program}</td>
                <td>{new Date(app.dob).toLocaleDateString()}</td>
                <td>{app.address}</td>
                <td>{new Date(app.application_date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No admission applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdmissionApplicationsTable;
