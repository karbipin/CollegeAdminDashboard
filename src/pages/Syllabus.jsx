import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SyllabusPage() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ syllabus_title: "", syllabus: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/syllabus");
      setSyllabusList(response.data);
    } catch (error) {
      console.error("Error fetching syllabus:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/syllabus/${id}`);
      fetchSyllabus();
    } catch (error) {
      console.error("Error deleting syllabus:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("syllabus_title", formData.syllabus_title);
    formDataToSend.append("syllabus", formData.syllabus);
    
    try {
      await axios.post("http://localhost:5000/syllabus", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowForm(false);
      fetchSyllabus();
    } catch (error) {
      console.error("Error adding syllabus:", error);
    }
  };

  return (
    <div className="p-6">
      <nav className="flex gap-4 mb-6">
        <button onClick={() => setShowForm(false)}>Syllabus</button>
        <button onClick={() => setShowForm(true)}>Add Syllabus</button>
      </nav>
      
      {!showForm ? (
        <table border="1" cellPadding="8" className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Syllabus</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {syllabusList.map((syllabus) => (
              <tr key={syllabus.syllabus_id}>
                <td>{syllabus.syllabus_id}</td>
                <td>{syllabus.syllabus_title}</td>
                <td>
                  <img src={`http://localhost:5000/uploads/${syllabus.syllabus}`} alt="Syllabus" width="100" />
                </td>
                <td>
                  <button onClick={() => navigate(`/edit/${syllabus.syllabus_id}`)}>Edit</button>
                  <button onClick={() => handleDelete(syllabus.syllabus_id)} className="ml-2">Delete</button>
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
            onChange={(e) => setFormData({ ...formData, syllabus_title: e.target.value })}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, syllabus: e.target.files[0] })}
            required
          />
          <button type="submit">Add Syllabus</button>
        </form>
      )}
    </div>
  );
}
