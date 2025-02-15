import React, { useState } from "react";

function Settings() {
  const [view, setView] = useState("manage");
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);

  const handleNavigation = (view) => setView(view);

  const handleDelete = (id) => setExams(exams.filter((exam) => exam.id !== id));

  const handleEdit = (id) => {
    setCurrentExam(exams.find((exam) => exam.id === id));
    setView("add");
  };

  const handlePublish = (id) => alert(`Exam ID ${id} published!`);

  const handleAddOrUpdateExam = (examData) => {
    if (currentExam) {
      setExams(exams.map((exam) => (exam.id === currentExam.id ? { ...exam, ...examData } : exam)));
    } else {
      setExams([...exams, { id: exams.length + 1, ...examData }]);
    }
    setCurrentExam(null);
    setView("manage");
  };

  return (
    <main className="main-container">
      <h3>Exam Page</h3>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <button onClick={() => handleNavigation("manage")}>Manage Exam</button>
        <button onClick={() => handleNavigation("add")}>Add Exam</button>
        <button onClick={() => handleNavigation("recent")}>Recent Exams</button>
      </div>

      {/* Manage Exams Section */}
      {view === "manage" && (
        <div>
          <h4>Manage Exams</h4>
          <table className="exam-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Exam Name</th>
                <th>Edit Exam</th>
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
                      <button onClick={() => handlePublish(exam.id)}>Publish</button>
                      <button onClick={() => handleEdit(exam.id)}>Edit</button>
                      <button onClick={() => handleDelete(exam.id)}>Delete</button>
                    </td>
                    <td>{exam.dateFrom}</td>
                    <td> {exam.dateTo}</td>
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
                <tr>
                  <td colSpan="6">No exams available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Exam Section */}
      {view === "add" && (
        <div>
          <h4>{currentExam ? "Edit Exam" : "Add New Exam"}</h4>
          <form
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

            <button type="submit">{currentExam ? "Update Exam" : "Add Exam"}</button>
          </form>
        </div>
      )}

      {/* Recent Exams Section */}
      {view === "recent" && (
        <div>
          <h4>Recent Exams</h4>
          <table className="exam-table">
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
                <tr>
                  <td colSpan="4">No recent exams</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Settings;
