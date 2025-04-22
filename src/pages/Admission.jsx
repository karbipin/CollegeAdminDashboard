import React, { useEffect, useState } from "react";
import {
  fetchAdmissions,
  createAdmission,
  deleteAdmission,
  fetchCourses,
  fetchColleges,
  fetchUsers,
  fetchAdmins,
} from "../services/api"; // adjust path if needed

import styles from "./css/AdmissionsTable.module.css";

const Admission = () => {
  const [admissions, setAdmissions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState("table");

  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [adRes, crRes, coRes, usRes, adRes2] = await Promise.all([
        fetchAdmissions(),
        fetchCourses(),
        fetchColleges(),
        fetchUsers(),
        fetchAdmins(),
      ]);

      setAdmissions(adRes.data);
      setCourses(crRes.data);
      setColleges(coRes.data);
      setUsers(usRes.data);
      setAdmins(adRes2.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const filteredAdmissions =
    statusFilter === "All"
      ? admissions
      : admissions.filter((admission) => admission.status === statusFilter);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newAdmission = {
      user_id: parseInt(e.target.user_id.value),
      college_id: parseInt(e.target.college_id.value),
      course_id: parseInt(e.target.course_id.value),
      admin_id: e.target.admin_id.value ? parseInt(e.target.admin_id.value) : null,
      status: e.target.status.value,
      application_start: e.target.application_start.value,
      application_end: e.target.application_end.value,
    };

    try {
      const res = await createAdmission(newAdmission);
      setAdmissions([...admissions, res.data]);
      setView("table");
    } catch (err) {
      console.error("Add admission error:", err);
      alert("Failed to add admission.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admission?")) return;

    try {
      await deleteAdmission(id);
      setAdmissions((prev) => prev.filter((ad) => ad.admission_id !== id));
    } catch (err) {
      console.error("Delete admission error:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <button onClick={() => setView("table")}>Admissions</button>
        <button onClick={() => setView("form")}>Add Admission</button>
      </div>

      {view === "table" && (
        <>
          <h2>Admissions Management</h2>
          <div className={styles.filterContainer}>
            <label>Status Filter: </label>
            <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
              <option value="All">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="upcomming">Upcomming</option>
            </select>
          </div>

          <table className={styles.admissionsTable}>
            <thead>
              <tr>
                <th>SN</th>
                <th>User ID</th>
                <th>College</th>
                <th>Course</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmissions.length > 0 ? (
                filteredAdmissions.map((admission, index) => (
                  <tr key={admission.admission_id}>
                    <td>{index + 1}</td>
                    <td>{admission.user_id}</td>
                    <td>{colleges.find(c => c.college_id === admission.college_id)?.name || "N/A"}</td>
                    <td>{courses.find(c => c.course_id === admission.course_id)?.name || "N/A"}</td>
                    <td>{admission.status}</td>
                    <td>{admission.application_start}</td>
                    <td>{admission.application_end}</td>
                    <td>{admins.find(a => a.admin_id === admission.admin_id)?.name || "N/A"}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(admission.admission_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No admissions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {view === "form" && (
        <div className={styles.formContainer}>
          <h2>Add New Admission</h2>
          <form onSubmit={handleFormSubmit}>
            <label>User:</label>
            <select name="user_id" required>
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name} (ID: {user.user_id})
                </option>
              ))}
            </select>

            <label>College:</label>
            <select name="college_id" required>
              <option value="">Select College</option>
              {colleges.map((college) => (
                <option key={college.college_id} value={college.college_id}>
                  {college.name}
                </option>
              ))}
            </select>

            <label>Course:</label>
            <select name="course_id" required>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.name}
                </option>
              ))}
            </select>

            <label>Status:</label>
            <select name="status" required>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="upcomming">Upcomming</option>
            </select>

            <label>Start Date:</label>
            <input type="date" name="application_start" required />

            <label>End Date:</label>
            <input type="date" name="application_end" required />

            <label>Admin (optional):</label>
            <select name="admin_id">
              <option value="">None</option>
              {admins.map((admin) => (
                <option key={admin.admin_id} value={admin.admin_id}>
                  {admin.name}
                </option>
              ))}
            </select>

            <button type="submit" className={styles.submitBtn}>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admission;
