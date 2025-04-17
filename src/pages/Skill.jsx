import React, { useEffect, useState } from "react";
import axios from "axios";

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [view, setView] = useState("manage");
  const [newSkill, setNewSkill] = useState({ name: "", description: "", startDate: "", endDate: "" });
  const [editSkill, setEditSkill] = useState(null);

  // Fetch skills from API
  useEffect(() => {
    axios.get("http://localhost:5000/api/skills")
      .then((response) => setSkills(response.data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  // Handle Delete
  const handleDelete = (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      axios.delete(`http://localhost:5000/api/skills/${skillId}`)
        .then(() => {
          setSkills(skills.filter(skill => skill.skill_id !== skillId));
        })
        .catch((error) => console.error("Error deleting skill:", error));
    }
  };

  // Handle Form Submit (Add or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editSkill) {
      // Update Skill
      axios.put(`http://localhost:5000/api/skills/${editSkill.skill_id}`, newSkill)
        .then(() => {
          setSkills(skills.map(skill => (skill.skill_id === editSkill.skill_id ? newSkill : skill)));
          setEditSkill(null);
          setView("manage");
        })
        .catch((error) => console.error("Error updating skill:", error));
    } else {
      // Add New Skill
      axios.post("http://localhost:5000/api/skills", newSkill)
        .then((response) => {
          setSkills([response.data, ...skills]);
          setView("manage");
        })
        .catch((error) => console.error("Error adding skill:", error));
    }

    // Reset form
    setNewSkill({ name: "", description: "", startDate: "", endDate: "" });
  };

  // Handle Edit
  const handleEdit = (skill) => {
    setEditSkill(skill);
    setNewSkill(skill);
    setView("add");
  };

  return (
    <div className="container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <button onClick={() => setView("manage")}>Skills</button>
        <button onClick={() => { setView("add"); setEditSkill(null); }}>Add Skill</button>
        <button onClick={() => setView("recent")}>Recent</button>
      </div>

      {/* Manage Skills */}
      {view === "manage" && (
        <div>
          <h2>Skills List</h2>
          <table className="skill-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Skill Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <tr key={skill.skill_id}>
                    <td>{index + 1}</td>
                    <td>{skill.name}</td>
                    <td>{skill.description}</td>
                    <td>{skill.startDate}</td>
                    <td>{skill.endDate}</td>
                    <td>{new Date(skill.created_at).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleEdit(skill)}>Edit</button>
                      <button onClick={() => handleDelete(skill.skill_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No skills found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Skill Form */}
      {view === "add" && (
        <div>
          <h2>{editSkill ? "Edit Skill" : "Add Skill"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Skill Name:</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              required
            />

            <label>Description:</label>
            <textarea
              value={newSkill.description}
              onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
              required
            ></textarea>

            <label>Start Date:</label>
            <input
              type="date"
              value={newSkill.startDate}
              onChange={(e) => setNewSkill({ ...newSkill, startDate: e.target.value })}
              required
            />

            <label>End Date:</label>
            <input
              type="date"
              value={newSkill.endDate}
              onChange={(e) => setNewSkill({ ...newSkill, endDate: e.target.value })}
              required
            />

            <button type="submit">{editSkill ? "Update Skill" : "Add Skill"}</button>
          </form>
        </div>
      )}

      {/* Recent Skills */}
      {view === "recent" && (
        <div>
          <h2>Recent Skills</h2>
          <table className="recent-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Skill Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {skills.slice(0, 5).map((skill, index) => (
                <tr key={skill.skill_id}>
                  <td>{index + 1}</td>
                  <td>{skill.name}</td>
                  <td>{skill.description}</td>
                  <td>{skill.startDate}</td>
                  <td>{skill.endDate}</td>
                  <td>{new Date(skill.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Skill;
