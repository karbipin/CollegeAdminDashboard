import React, { useState, useEffect } from "react";
import {
  createNote,
  fetchNotes,
  updateNote,
  deleteNote,
  fetchRecentNotes
} from "../services/api"; // Adjust path to your api.js
import "../pages/css/common.css";

function Notes() {
  const [view, setView] = useState("manage");
  const [currentNote, setCurrentNote] = useState(null);
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const res = await fetchNotes();
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setCurrentNote(noteToEdit);
    setDescription(noteToEdit.description || "");
    setView("add");
  };

  const handleAddOrUpdateNote = async (noteData) => {
    try {
      const formData = new FormData();
      formData.append("note", noteData.note);
      formData.append("description", noteData.description);
      if (file) {
        formData.append("file", file);
      }

      if (currentNote) {
        await updateNote(currentNote.id, formData);
      } else {
        await createNote(formData);
      }

      await loadNotes();
      setCurrentNote(null);
      setFile(null);
      setDescription("");
      setView("manage");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleNavigation = (targetView) => {
    setSearchTerm("");
    setView(targetView);

    if (targetView === "recent") {
      fetchRecentNotes()
        .then((res) => setNotes(res.data))
        .catch((err) => console.error("Error loading recent notes:", err));
    } else {
      loadNotes();
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <main className="main-container">
      <h3>Notes Page</h3>

      <div className="nav-bar">
        <button onClick={() => handleNavigation("manage")}>Manage Notes</button>
        <button onClick={() => handleNavigation("add")}>Add Notes</button>
        <button onClick={() => handleNavigation("recent")}>Recent Notes</button>
      </div>

      {view === "manage" && (
        <div>
          <h4>Manage Notes</h4>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Note Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="notes-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Note</th>
                <th>Description</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <tr key={note.id}>
                    <td>{index + 1}</td>
                    <td>{note.note}</td>
                    <td>{note.description}</td>
                    <td>
                      <a href={note.document} target="_blank" rel="noopener noreferrer">
                        {note.document ? "View File" : "No File"}
                      </a>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(note.id)}>Edit</button>
                      <button onClick={() => handleDelete(note.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No notes found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "add" && (
        <div>
          <h4>{currentNote ? "Edit Note" : "Add New Note"}</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const noteData = {
                note: e.target.note.value,
                description: description,
              };
              handleAddOrUpdateNote(noteData);
            }}
          >
            <label>Note:</label>
            <input
              type="text"
              name="note"
              defaultValue={currentNote?.note || ""}
              required
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            ></textarea>

            <label>Document (PDF):</label>
            <input
              type="file"
              name="document"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <button type="submit">{currentNote ? "Update Note" : "Add Note"}</button>
          </form>
        </div>
      )}

      {view === "recent" && (
        <div>
          <h4>Recent Notes</h4>
          <table className="notes-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Note</th>
                <th>Description</th>
                <th>Document</th>
                <th>Added On</th>
              </tr>
            </thead>
            <tbody>
              {recentNotes.length > 0 ? (
                recentNotes.map((note, index) => (
                  <tr key={note.id}>
                    <td>{index + 1}</td>
                    <td>{note.note}</td>
                    <td>{note.description}</td>
                    <td>
                      <a href={note.document} target="_blank" rel="noopener noreferrer">
                        {note.document ? "View File" : "No File"}
                      </a>
                    </td>
                    <td>{new Date(note.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No recent notes found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Notes;
