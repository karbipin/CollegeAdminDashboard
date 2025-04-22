// src/pages/EnrollmentRequestsTable.jsx
import React, { useEffect, useState } from "react";
import { fetchEnrollments } from "../services/api"; // Update path as needed

const EnrollmentRequestsTable = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      const response = await fetchEnrollments();
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Enrollment Requests</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Request Date</th>
            <th>Admin ID</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.length > 0 ? (
            enrollments.map((req, index) => (
              <tr key={req.request_id}>
                <td>{index + 1}</td>
                <td>{req.fullname}</td>
                <td>{req.contact}</td>
                <td>{req.email}</td>
                <td>{new Date(req.request_date).toLocaleString()}</td>
                <td>{req.admin_id ?? "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No enrollment requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentRequestsTable;
