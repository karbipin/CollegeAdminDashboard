import React, { useEffect, useState } from "react";
import {
  createCollege,
  fetchColleges as getColleges,
  fetchCollegeById,
  updateCollege,
  deleteCollege,
} from "../services/api"; // Adjust path if needed

const College = () => {
  const [view, setView] = useState("table");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [college, setCollege] = useState({
    clz_name: "",
    description: "",
    affiliation: "",
    image: null,
    location: "",
    offered_program: "",
  });

  const [colleges, setColleges] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");

  useEffect(() => {
    fetchAllColleges();
  }, []);

  const fetchAllColleges = async () => {
    try {
      const res = await getColleges();
      setColleges(res.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollege({ ...college, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCollege({ ...college, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("clz_name", college.clz_name);
    formData.append("description", college.description);
    formData.append("affiliation", college.affiliation);
    formData.append("location", college.location);
    formData.append("offered_program", college.offered_program);
    if (college.image) {
      formData.append("image", college.image);
    }

    try {
      if (isEditMode && editingId) {
        await updateCollege(editingId, formData);
        alert("College updated successfully!");
      } else {
        await createCollege(formData);
        alert("College added successfully!");
      }

      setCollege({
        clz_name: "",
        description: "",
        affiliation: "",
        image: null,
        location: "",
        offered_program: "",
      });
      setIsEditMode(false);
      setEditingId(null);
      setView("table");
      fetchAllColleges();
    } catch (error) {
      console.error("Error saving college:", error);
      alert("Failed to save college. Please try again.");
    }
  };

  const handleEdit = async (college) => {
    try {
      const res = await fetchCollegeById(college._id);
      const data = res.data;

      setCollege({
        clz_name: data.clz_name,
        description: data.description,
        affiliation: data.affiliation,
        image: null, // No pre-filling file input
        location: data.location,
        offered_program: data.offered_program,
      });

      setIsEditMode(true);
      setEditingId(college._id);
      setView("form");
    } catch (error) {
      console.error("Error fetching college by ID:", error);
      alert("Failed to load college for editing.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      try {
        await deleteCollege(id);
        alert("College deleted successfully!");
        fetchAllColleges();
      } catch (error) {
        console.error("Error deleting college:", error);
        alert("Failed to delete college.");
      }
    }
  };

  const locations = ["All", ...new Set(colleges.map((c) => c.location))];
  const filteredColleges =
    selectedLocation === "All"
      ? colleges
      : colleges.filter((c) => c.location === selectedLocation);

  return (
    <div className="college-page">
      {/* Toggle buttons */}
      <div className="toggle-buttons">
        <button
          className={view === "table" ? "active" : ""}
          onClick={() => {
            setView("table");
            setIsEditMode(false);
            setEditingId(null);
          }}
        >
          Colleges
        </button>
        <button
          className={view === "form" ? "active" : ""}
          onClick={() => {
            setView("form");
            setIsEditMode(false);
            setEditingId(null);
            setCollege({
              clz_name: "",
              description: "",
              affiliation: "",
              image: null,
              location: "",
              offered_program: "",
            });
          }}
        >
          {isEditMode ? "Edit College" : "Add College"}
        </button>
      </div>

      {/* College Table */}
      {view === "table" && (
        <div className="table-container">
          <h2>College Information</h2>

          <div className="filter-container">
            <label>Filter by Location: </label>
            <select
              onChange={(e) => setSelectedLocation(e.target.value)}
              value={selectedLocation}
            >
              {locations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <table className="college-table">
            <thead>
              <tr>
                <th>College Name</th>
                <th>Location</th>
                <th>Affiliation</th>
                <th>Offered Program</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <tr key={college._id}>
                    <td>{college.clz_name}</td>
                    <td>{college.location}</td>
                    <td>{college.affiliation}</td>
                    <td>{college.offered_program}</td>
                    <td>
                      <button onClick={() => handleEdit(college)}>Edit</button>
                      <button onClick={() => handleDelete(college._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No colleges found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* College Form */}
      {view === "form" && (
        <form onSubmit={handleSubmit} className="college-form">
          <h3>{isEditMode ? "Edit College" : "Add College"}</h3>

          <div>
            <label>College Name:</label>
            <input
              type="text"
              name="clz_name"
              value={college.clz_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={college.description}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          <div>
            <label>Affiliation:</label>
            <select
              name="affiliation"
              value={college.affiliation}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Affiliation</option>
              <option value="TU">Tribhuvan.U</option>
              <option value="PU">Pokhara.U</option>
              <option value="KU">Kathmandu.U</option>
              <option value="PUR">Purbanchal.U</option>
            </select>
          </div>

          <div>
            <label>College Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={college.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Offered Programs:</label>
            <textarea
              name="offered_program"
              value={college.offered_program}
              onChange={handleChange}
              rows="3"
              placeholder="E.g., BSc CSIT, BBA, BCA"
              required
            ></textarea>
          </div>

          <button type="submit">
            {isEditMode ? "Update College" : "Add College"}
          </button>
        </form>
      )}
    </div>
  );
};

export default College;
