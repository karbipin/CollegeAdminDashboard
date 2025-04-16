import React, { useEffect, useState } from "react";
import axios from "axios";

const EnrollmentRequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/enrollment-requests")
      .then((response) => setRequests(response.data))
      .catch((error) => console.error("Error fetching enrollment requests:", error));
  }, []);

  return (
    <div>
      <h2>Enrolled Students</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>SN</th>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req, index) => (
              <tr key={req.request_id}>
                <td>{index + 1}</td>
                <td>{req.fullname}</td>
                <td>{req.contact}</td>
                <td>{req.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students enrolled yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentRequestsTable;
