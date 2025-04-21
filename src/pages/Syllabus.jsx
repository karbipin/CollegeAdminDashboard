import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchSyllabus,
  createSyllabus,
  deleteSyllabus
} from "../services/api";

export default function SyllabusPage() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    syllabus_title: "",
    syllabus: null,
    course_code: "",
    credit_hr: "",
    lecture_hr: "",
    tutorial_hr: "",
    lab_hr: "",
    program_name: "",
    semester: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadSyllabus();
  }, []);

  const loadSyllabus = async () => {
    try {
      const response = await fetchSyllabus();
      setSyllabusList(response.data);
    } catch (error) {
      console.error("Error fetching syllabus:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSyllabus(id);
      loadSyllabus();
    } catch (error) {
      console.error("Error deleting syllabus:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await createSyllabus(formDataToSend);
      setShowForm(false);
      setFormData({
        syllabus_title: "",
        syllabus: null,
        course_code: "",
        credit_hr: "",
        lecture_hr: "",
        tutorial_hr: "",
        lab_hr: "",
        program_name: "",
        semester: ""
      });
      loadSyllabus();
    } catch (error) {
      console.error("Error adding syllabus:", error);
    }
  };

  return (
    <div className="p-6">
      <nav className="flex gap-4 mb-6">
        <button onClick={() => setShowForm(false)}>View Syllabus</button>
        <button onClick={() => setShowForm(true)}>Add Syllabus</button>
      </nav>

      {!showForm ? (
        <table className="w-full border">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Course Code</th>
              <th>Credit Hr</th>
              <th>Program</th>
              <th>Semester</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {syllabusList.map((syllabus) => (
              <tr key={syllabus.syllabus_id}>
                <td>{syllabus.syllabus_id}</td>
                <td>{syllabus.syllabus_title}</td>
                <td>{syllabus.course_code}</td>
                <td>{syllabus.credit_hr}</td>
                <td>{syllabus.program_name}</td>
                <td>{syllabus.semester}</td>
                <td>
                  {syllabus.syllabus_file ? (
                    <a
                      href={`http://localhost:5000/uploads/${syllabus.syllabus_file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View File
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/edit/${syllabus.syllabus_id}`)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(syllabus.syllabus_id)}
                    className="text-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Syllabus Title"
            value={formData.syllabus_title}
            onChange={(e) =>
              setFormData({ ...formData, syllabus_title: e.target.value })
            }
            required
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setFormData({ ...formData, syllabus: e.target.files[0] })
            }
            required
          />
          <input
            type="text"
            placeholder="Course Code"
            value={formData.course_code}
            onChange={(e) =>
              setFormData({ ...formData, course_code: e.target.value })
            }
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Credit Hours"
            value={formData.credit_hr}
            onChange={(e) =>
              setFormData({ ...formData, credit_hr: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Lecture Hours"
            value={formData.lecture_hr}
            onChange={(e) =>
              setFormData({ ...formData, lecture_hr: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Tutorial Hours"
            value={formData.tutorial_hr}
            onChange={(e) =>
              setFormData({ ...formData, tutorial_hr: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Lab Hours"
            value={formData.lab_hr}
            onChange={(e) =>
              setFormData({ ...formData, lab_hr: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Program Name"
            value={formData.program_name}
            onChange={(e) =>
              setFormData({ ...formData, program_name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Semester"
            value={formData.semester}
            onChange={(e) =>
              setFormData({ ...formData, semester: e.target.value })
            }
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Add Syllabus
          </button>
        </form>
      )}
    </div>
  );
}
