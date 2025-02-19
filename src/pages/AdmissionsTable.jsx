import React, { useEffect, useState } from "react";

const AdmissionsTable = () => {
  const [admissions, setAdmissions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch admissions from API
  useEffect(() => {
    fetch("http://localhost:5000/api/admissions") // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => setAdmissions(data))
      .catch((error) => console.error("Error fetching admissions:", error));
  }, []);

  // Filter admissions by status
  const filteredAdmissions =
    statusFilter === "All"
      ? admissions
      : admissions.filter((admission) => admission.status === statusFilter);

  return (<>
    <div className="table-container">
      <h2>Admissions Management</h2>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label>Status Filter: </label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {/* Admissions Table */}
      <table className="admissions-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>College</th>
            <th>Course</th>
            <th>Exam</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmissions.length > 0 ? (
            filteredAdmissions.map((admission, index) => (
              <tr key={admission.admission_id}>
                <td>{index + 1}</td>
                <td>{admission.college_name}</td>
                <td>{admission.course_name}</td>
                <td>{admission.exam_id ? admission.exam_name : "N/A"}</td>
                <td>{admission.status}</td>
                <td>{admission.application_start}</td>
                <td>{admission.application_end}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No admissions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AdmissionsTable;
