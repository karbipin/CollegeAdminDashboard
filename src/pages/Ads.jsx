import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./css/AdsPage.module.css";

export default function AdsPage() {
  const [adsList, setAdsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", banner: null, position: "horizontal_1", banner_url: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/ads");
      setAdsList(response.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ads/${id}`);
      fetchAds();
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("banner", formData.banner);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("banner_url", formData.banner_url);
    
    try {
      await axios.post("http://localhost:5000/ads", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowForm(false);
      fetchAds();
    } catch (error) {
      console.error("Error adding ad:", error);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <button onClick={() => setShowForm(false)}>Ads</button>
        <button onClick={() => setShowForm(true)}>Add Ad</button>
      </nav>
      
      {!showForm ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Banner</th>
              <th>Position</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adsList.map((ad) => (
              <tr key={ad.ad_id}>
                <td>{ad.ad_id}</td>
                <td>{ad.title}</td>
                <td>
                  <img src={`http://localhost:5000/uploads/${ad.banner}`} alt="Ad Banner" className={styles.banner} />
                </td>
                <td>{ad.position}</td>
                <td><a href={ad.banner_url} target="_blank" rel="noopener noreferrer">Visit</a></td>
                <td>
                  <button onClick={() => navigate(`/edit/${ad.ad_id}`)}>Edit</button>
                  <button onClick={() => handleDelete(ad.ad_id)} className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Ad Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, banner: e.target.files[0] })}
            required
          />
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          >
            <option value="horizontal_1">Horizontal 1</option>
            <option value="horizontal_2">Horizontal 2</option>
            <option value="horizontal_3">Horizontal 3</option>
            <option value="vertical_1">Vertical 1</option>
            <option value="vertical_2">Vertical 2</option>
            <option value="vertical_3">Vertical 3</option>
            <option value="vertical_4">Vertical 4</option>
          </select>
          <input
            type="text"
            placeholder="Banner URL"
            value={formData.banner_url}
            onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
            required
          />
          <button type="submit">Add Ad</button>
        </form>
      )}
    </div>
  );
}
