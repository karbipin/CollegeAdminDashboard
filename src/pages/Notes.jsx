import React, { useState } from "react";

function Notes() {
  const [view, setView] = useState("manage"); // Default is "manage"
  const [currentNote, setCurrentNote] = useState(null);
  const [file, setFile] = useState(null); // For storing the selected file
  const [notes, setNotes] = useState([]); // Example notes data
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAffiliation, setSelectedAffiliation] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setCurrentNote(noteToEdit);
    setSelectedAffiliation(noteToEdit.affiliation);
    setView("add");
  };

  const handleAddOrUpdateNote = (noteData) => {
    if (currentNote) {
      const updatedNotes = notes.map((note) =>
        note.id === currentNote.id ? { ...note, ...noteData } : note
      );
      setNotes(updatedNotes);
    } else {
      const newNote = { id: notes.length + 1, ...noteData, createdAt: new Date() };
      setNotes([newNote, ...notes]);
    }
    setCurrentNote(null);
    setFile(null);
    setSelectedAffiliation("");
    setView("manage");
  };

  const handleNavigation = (view) => {
    setView(view);
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
                <th>Affiliation</th>
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
                    <td>{note.affiliation}</td>
                    <td>
                      <a href={`/${note.document}`} target="_blank" rel="noopener noreferrer">
                        {note.document || "No File"}
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
              const documentName = file ? file.name : "";
              handleAddOrUpdateNote({
                note: e.target.note.value,
                affiliation: selectedAffiliation,
                document: documentName,
              });
            }}
          >
            <label>Note:</label>
            <input
              type="text"
              name="note"
              defaultValue={currentNote ? currentNote.note : ""}
              required
            />

            <label>Affiliation:</label>
            <select
              name="affiliation"
              value={selectedAffiliation}
              onChange={(e) => setSelectedAffiliation(e.target.value)}
              required
            >
              <option value="">Select Affiliation</option>
              <option value="PU">PU</option>
              <option value="TU">TU</option>
            </select>

            <label>Document (PDF):</label>
            <input type="file" name="document" accept="application/pdf" onChange={handleFileChange} />

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
                <th>Affiliation</th>
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
                    <td>{note.affiliation}</td>
                    <td>
                      <a href={`/${note.document}`} target="_blank" rel="noopener noreferrer">
                        {note.document || "No File"}
                      </a>
                    </td>
                    <td>{note.createdAt.toLocaleDateString()}</td>
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
