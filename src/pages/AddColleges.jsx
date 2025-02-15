import React, { useState } from "react";
import './css/AddColleges.css'

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("College Data:", college);
    alert("College added successfully!");
    setCollege({ name: "", description: "", image: null, location: "" , affiliation:"" });
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
            rows="5"   // Increases height
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
