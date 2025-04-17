import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/Settings.module.css";

function Settings() {
  const [view, setView] = useState("manage");
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);

  // Fetch exams on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/exams")
      .then(res => setExams(res.data))
      .catch(err => console.error("Error fetching exams:", err));
  }, []);

  const handleNavigation = (view) => setView(view);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exams/${id}`);
      setExams(exams.filter((exam) => exam.id !== id));
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleEdit = (id) => {
    const exam = exams.find((exam) => exam.id === id);
    setCurrentExam(exam);
    setView("add");
  };

  const handlePublish = (id) => {
    alert(`Exam ID ${id} published!`);
    // You can also make an API call here if needed
  };

  const handleAddOrUpdateExam = async (examData) => {
    try {
      if (currentExam) {
        const res = await axios.put(`http://localhost:5000/api/exams/${currentExam.id}`, examData);
        setExams(exams.map((exam) => (exam.id === currentExam.id ? res.data : exam)));
      } else {
        const res = await axios.post("http://localhost:5000/api/exams", examData);
        setExams([...exams, res.data]);
      }
      setCurrentExam(null);
      setView("manage");
    } catch (error) {
      console.error("Error saving exam:", error);
    }
  };

  return (
    <main className={styles.mainContainer}>
      <h3>Exam Page</h3>

      <div className={styles.navBar}>
        <button onClick={() => handleNavigation("manage")}>Manage Exam</button>
        <button onClick={() => handleNavigation("add")}>Add Exam</button>
        <button onClick={() => handleNavigation("recent")}>Recent Exams</button>
      </div>

      {view === "manage" && (
        <div>
          <h4>Manage Exams</h4>
          <table className={styles.examTable}>
            <thead>
              <tr>
                <th>SN</th>
                <th>Exam Name</th>
                <th>Actions</th>
                <th>Date (From)</th>
                <th>Date (To)</th>
                <th>Routine</th>
              </tr>
            </thead>
            <tbody>
              {exams.length > 0 ? (
                exams.map((exam, index) => (
                  <tr key={exam.id}>
                    <td>{index + 1}</td>
                    <td>{exam.name}</td>
                    <td>
                      <button className={styles.publishBtn} onClick={() => handlePublish(exam.id)}>Publish</button>
                      <button className={styles.editBtn} onClick={() => handleEdit(exam.id)}>Edit</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(exam.id)}>Delete</button>
                    </td>
                    <td>{exam.dateFrom}</td>
                    <td>{exam.dateTo}</td>
                    <td>
                      {exam.routine ? (
                        <img src={exam.routine} alt="Routine" width="50" height="50" />
                      ) : (
                        "No Routine"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No exams available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "add" && (
        <div>
          <h4>{currentExam ? "Edit Exam" : "Add New Exam"}</h4>
          <form className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const examData = {
                name: e.target.examName.value,
                dateFrom: e.target.dateFrom.value,
                dateTo: e.target.dateTo.value,
                routine: e.target.routine.files[0]
                  ? URL.createObjectURL(e.target.routine.files[0])
                  : null,
              };
              handleAddOrUpdateExam(examData);
            }}
          >
            <label>Exam Name:</label>
            <input type="text" name="examName" defaultValue={currentExam?.name || ""} required />

            <label>Start Date:</label>
            <input type="date" name="dateFrom" defaultValue={currentExam?.dateFrom || ""} required />

            <label>End Date:</label>
            <input type="date" name="dateTo" defaultValue={currentExam?.dateTo || ""} required />

            <label>Exam Routine (Upload Image):</label>
            <input type="file" name="routine" accept="image/*" />

            <button className={styles.submitBtn} type="submit">
              {currentExam ? "Update Exam" : "Add Exam"}
            </button>
          </form>
        </div>
      )}

      {view === "recent" && (
        <div>
          <h4>Recent Exams</h4>
          <table className={styles.examTable}>
            <thead>
              <tr>
                <th>SN</th>
                <th>Exam Name</th>
                <th>Date (From - To)</th>
                <th>Routine</th>
              </tr>
            </thead>
            <tbody>
              {exams.length > 0 ? (
                exams.slice(-5).map((exam, index) => (
                  <tr key={exam.id}>
                    <td>{index + 1}</td>
                    <td>{exam.name}</td>
                    <td>{exam.dateFrom} - {exam.dateTo}</td>
                    <td>
                      {exam.routine ? (
                        <img src={exam.routine} alt="Routine" width="50" height="50" />
                      ) : (
                        "No Routine"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">No recent exams</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Settings;
