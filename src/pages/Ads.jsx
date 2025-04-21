import { useState, useEffect } from "react";
import {
  fetchAds,
  createAd,
  updateAd,
  deleteAd,
  fetchAdById,
} from "../services/api"; // Adjust the path as needed
import styles from "./css/AdsPage.module.css";

export default function AdsPage() {
  const [adsList, setAdsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAdId, setEditingAdId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    banner: null,
    position: "horizontal_1",
    banner_url: "",
    status: "active",
  });

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    try {
      const response = await fetchAds();
      setAdsList(response.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAd(id);
      loadAds();
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetchAdById(id);
      const ad = response.data;
      setFormData({
        title: ad.title,
        banner: null, // image not prefilled
        position: ad.position,
        banner_url: ad.banner_url,
        status: ad.status || "active",
      });
      setEditingAdId(id);
      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      console.error("Error loading ad for edit:", error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";
      const form = new FormData();
      form.append("status", updatedStatus);
      await updateAd(id, form);
      loadAds();
    } catch (error) {
      console.error("Error toggling ad status:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    if (formData.banner) {
      formDataToSend.append("banner", formData.banner);
    }
    formDataToSend.append("position", formData.position);
    formDataToSend.append("banner_url", formData.banner_url);
    formDataToSend.append("status", formData.status);

    try {
      if (isEditing) {
        await updateAd(editingAdId, formDataToSend);
      } else {
        await createAd(formDataToSend);
      }
      setShowForm(false);
      setIsEditing(false);
      setEditingAdId(null);
      setFormData({
        title: "",
        banner: null,
        position: "horizontal_1",
        banner_url: "",
        status: "active",
      });
      loadAds();
    } catch (error) {
      console.error("Error saving ad:", error);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <button onClick={() => {
          setShowForm(false);
          setIsEditing(false);
          setFormData({
            title: "",
            banner: null,
            position: "horizontal_1",
            banner_url: "",
            status: "active",
          });
        }}>Ads</button>
        <button onClick={() => {
          setShowForm(true);
          setIsEditing(false);
          setFormData({
            title: "",
            banner: null,
            position: "horizontal_1",
            banner_url: "",
            status: "active",
          });
        }}>Add Ad</button>
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adsList.map((ad) => (
              <tr key={ad.ad_id}>
                <td>{ad.ad_id}</td>
                <td>{ad.title}</td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${ad.banner}`}
                    alt="Ad Banner"
                    className={styles.banner}
                  />
                </td>
                <td>{ad.position}</td>
                <td>
                  <a href={ad.banner_url} target="_blank" rel="noopener noreferrer">
                    Visit
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(ad.ad_id, ad.status)}
                    className={ad.status === "active" ? styles.active : styles.inactive}
                  >
                    {ad.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(ad.ad_id)}>Edit</button>
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
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit">{isEditing ? "Update Ad" : "Add Ad"}</button>
        </form>
      )}
    </div>
  );
}
