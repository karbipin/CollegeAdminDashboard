import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api"; // Adjust the path based on your project structure
import './css/Users.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");

  // Fetch user data from API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      const formattedData = response.data.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location || "Unknown", // fallback if no address
        role: user.role || "User", // fallback role
      }));
      setUsers(formattedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Get unique locations for the dropdown filter
  const locations = ["All", ...new Set(users.map(user => user.location))];

  // Filter users based on selected city
  const filteredUsers = selectedCity === "All" 
    ? users 
    : users.filter(user => user.location === selectedCity);

  return (
    <div className="table-container">
      <h2>User Information</h2>

      {/* Filter Dropdown  */}
      <div className="filter-container">
        <label>Filter by Location: </label>
        <select onChange={(e) => setSelectedCity(e.target.value)}>
          {locations.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Location</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
