import React, { useState } from "react";
import axios from "axios";
import './css/AddColleges.css';

function AddColleges() {
  const [college, setCollege] = useState({
    name: "",
    description: "",
    affiliation: "",
    image: null,
    location: "",
  });

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
    formData.append("name", college.name);
    formData.append("description", college.description);
    formData.append("affiliation", college.affiliation);
    formData.append("location", college.location);
    if (college.image) {
      formData.append("image", college.image);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/colleges", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("College added successfully!");
      console.log("Response:", response.data);

      setCollege({
        name: "",
        description: "",
        affiliation: "",
        image: null,
        location: "",
      });
    } catch (error) {
      console.error("Error adding college:", error);
      alert("Failed to add college. Please try again.");
    }
  };

  return (
    <main className="main-container">
      <h3>Add Colleges Page</h3>
      <form onSubmit={handleSubmit} className="college-form">
        <div>
          <label>College Name:</label>
          <input
            type="text"
            name="name"
            value={college.name}
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
            required
            rows="5"
            cols="50"
          ></textarea>
        </div>

        <div>
          <label htmlFor="affiliation">Affiliation:</label>
          <select
            id="affiliation"
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
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

        <button type="submit">Add College</button>
      </form>
    </main>
  );
}

export default AddColleges;
