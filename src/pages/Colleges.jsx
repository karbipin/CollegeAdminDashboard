import React, { useEffect, useState } from "react";
import './css/Colleges.css';

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Fetch college data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/colleges") 
      .then((response) => response.json())
      .then((data) => setColleges(data))
      .catch((error) => console.error("Error fetching colleges:", error));
  }, []);

  // Get unique locations for dropdown filter
  const locations = ["All", ...new Set(colleges.map(college => college.location))];

  // Filter colleges based on selected location
  const filteredColleges = selectedLocation === "All" 
    ? colleges 
    : colleges.filter(college => college.location === selectedLocation);

  return (
    <div className="table-container">
      <h2>College Information</h2>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label>Filter by Location: </label>
        <select onChange={(e) => setSelectedLocation(e.target.value)}>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* College Table */}
      <table className="college-table">
        <thead>
          <tr>
            <th>College Name</th>
            <th>Location</th>
            <th>Affiliation</th>
          </tr>
        </thead>
        <tbody>
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
              <tr key={college._id}>
                <td>{college.name}</td>
                <td>{college.location}</td>
                <td>{college.ranking}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No colleges found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeTable;
