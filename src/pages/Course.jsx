import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCourse,
  fetchCourses,
  deleteCourse,
  fetchColleges,
  fetchAdmins,
} from "../services/api"; // Adjust path as needed

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    course_name: "",
    description: "",
    college_id: "",
    admin_id: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [courseRes, collegeRes, adminRes] = await Promise.all([
        fetchCourses(),
        fetchColleges(),
        fetchAdmins(),
      ]);
      setCourses(courseRes.data);
      setColleges(collegeRes.data);
      setAdmins(adminRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      loadAllData();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse(formData);
      setShowForm(false);
      setFormData({
        course_name: "",
        description: "",
        college_id: "",
        admin_id: ""
      });
      loadAllData();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const getCollegeName = (id) => {
    const college = colleges.find((c) => c.college_id === parseInt(id));
    return college ? college.name : "Unknown";
  };

  const getAdminName = (id) => {
    const admin = admins.find((a) => a.admin_id === parseInt(id));
    return admin ? admin.name : "Unknown";
  };

  return (
    <div className="p-6">
      <nav className="flex gap-4 mb-6">
        <button onClick={() => setShowForm(false)}>Courses</button>
        <button onClick={() => setShowForm(true)}>Add Course</button>
      </nav>

      {!showForm ? (
        <table border="1" cellPadding="8" className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>College</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_id}</td>
                <td>{course.course_name}</td>
                <td>{course.description}</td>
                <td>{getCollegeName(course.college_id)}</td>
                <td>{getAdminName(course.admin_id)}</td>
                <td>
                  <button onClick={() => navigate(`/add/${course.course_id}`)}>Edit</button>
                  <button onClick={() => handleDelete(course.course_id)} className="ml-2">
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
            placeholder="Course Name"
            value={formData.course_name}
            onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <select
            value={formData.college_id}
            onChange={(e) => setFormData({ ...formData, college_id: e.target.value })}
            required
          >
            <option value="">Select College</option>
            {colleges.map((college) => (
              <option key={college.college_id} value={college.college_id}>
                {college.name}
              </option>
            ))}
          </select>

          <select
            value={formData.admin_id}
            onChange={(e) => setFormData({ ...formData, admin_id: e.target.value })}
            required
          >
            <option value="">Select Admin</option>
            {admins.map((admin) => (
              <option key={admin.admin_id} value={admin.admin_id}>
                {admin.name}
              </option>
            ))}
          </select>

          <button type="submit">Add Course</button>
        </form>
      )}
    </div>
  );
}
