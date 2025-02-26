import React, { useEffect, useState } from "react";
import styles from "./css/AdmissionsTable.module.css"; // Import CSS Module 

const AdmissionsTable = () => {
  const [admissions, setAdmissions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState("table"); // Toggle between "table" and "form"

  // Fetch admissions from API
  useEffect(() => {
    fetch("http://localhost:5000/api/admissions") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => setAdmissions(data))
      .catch((error) => console.error("Error fetching admissions:", error));
  }, []);

  // Filter admissions by status
  const filteredAdmissions =
    statusFilter === "All"
      ? admissions
      : admissions.filter((admission) => admission.status === statusFilter);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newAdmission = {
      course_name: e.target.course.value,
      exam_name: e.target.exam.value,
      status: e.target.status.value,
      application_start: e.target.startDate.value,
      application_end: e.target.endDate.value,
    };
    setAdmissions([...admissions, newAdmission]); // Add new admission to list
    setView("table"); // Switch back to table view
  };

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <div className={styles.navBar}>
        <button onClick={() => setView("table")}>Admissions</button>
        <button onClick={() => setView("form")}>Add Admission</button>
      </div>

      {/* Table View */}
      {view === "table" && (
        <>
          <h2>Admissions Management</h2>

          {/* Filter Dropdown */}
          <div className={styles.filterContainer}>
            <label>Status Filter: </label>
            <select onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          {/* Admissions Table */}
          <table className={styles.admissionsTable}>
            <thead>
              <tr>
                <th>SN</th>
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
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{admission.course_name}</td>
                    <td>{admission.exam_name || "N/A"}</td>
                    <td>{admission.status}</td>
                    <td>{admission.application_start}</td>
                    <td>{admission.application_end}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No admissions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/* Form View */}
      {view === "form" && (
        <div className={styles.formContainer}>
          <h2>Add New Admission</h2>
          <form onSubmit={handleFormSubmit}>
            <label>Course Name:</label>
            <input type="text" name="course" required />

            <label>Exam Name:</label>
            <input type="text" name="exam" required />

            <label>Status:</label>
            <select name="status" required>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="upcoming">Upcoming</option>
            </select>

            <label>Start Date:</label>
            <input type="date" name="startDate" required />

            <label>End Date:</label>
            <input type="date" name="endDate" required />

            <button type="submit" className={styles.submitBtn}>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdmissionsTable;
