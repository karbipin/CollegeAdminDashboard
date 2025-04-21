import React, { useState, useEffect } from "react";
import {
  fetchTrainings,
  createTraining,
  updateTraining,
  deleteTraining
} from "../services/api";
import "../pages/css/common.css";

const Training = () => {
  const [trainings, setTrainings] = useState([]);
  const [newTraining, setNewTraining] = useState({
    training_name: "",
    training_description: "",
    duration: "",
  });
  const [editTrainingId, setEditTrainingId] = useState(null);
  const [editedTraining, setEditedTraining] = useState({
    training_name: "",
    training_description: "",
    duration: "",
  });
  const [view, setView] = useState("form");

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    try {
      const res = await fetchTrainings();
      setTrainings(res.data);
    } catch (err) {
      console.error("Failed to fetch trainings:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTraining(newTraining);
      setNewTraining({
        training_name: "",
        training_description: "",
        duration: "",
      });
      loadTrainings();
    } catch (err) {
      console.error("Failed to create training:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTraining(id);
      loadTrainings();
    } catch (err) {
      console.error("Failed to delete training:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTraining(editTrainingId, editedTraining);
      setEditTrainingId(null);
      setEditedTraining({
        training_name: "",
        training_description: "",
        duration: "",
      });
      loadTrainings();
    } catch (err) {
      console.error("Failed to update training:", err);
    }
  };

  const startEditing = (training) => {
    setEditTrainingId(training.training_id);
    setEditedTraining({
      training_name: training.training_name,
      training_description: training.training_description,
      duration: training.duration,
    });
  };

  const renderForm = () => (
    <>
      <h2 className="text-2xl font-bold mb-4">Add New Training</h2>
      <form onSubmit={handleCreate} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Training Name"
          value={newTraining.training_name}
          onChange={(e) =>
            setNewTraining({ ...newTraining, training_name: e.target.value })
          }
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Description"
          value={newTraining.training_description}
          onChange={(e) =>
            setNewTraining({
              ...newTraining,
              training_description: e.target.value,
            })
          }
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Duration"
          value={newTraining.duration}
          onChange={(e) =>
            setNewTraining({ ...newTraining, duration: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Training
        </button>
      </form>
    </>
  );

  const renderTable = () => (
    <>
      <h2 className="text-2xl font-bold mb-4">Training List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training) => (
              <tr key={training.training_id}>
                <td className="border p-2">{training.training_id}</td>
                <td className="border p-2">
                  {editTrainingId === training.training_id ? (
                    <input
                      className="border p-1"
                      type="text"
                      value={editedTraining.training_name}
                      onChange={(e) =>
                        setEditedTraining({
                          ...editedTraining,
                          training_name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    training.training_name
                  )}
                </td>
                <td className="border p-2">
                  {editTrainingId === training.training_id ? (
                    <input
                      className="border p-1"
                      type="text"
                      value={editedTraining.training_description}
                      onChange={(e) =>
                        setEditedTraining({
                          ...editedTraining,
                          training_description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    training.training_description
                  )}
                </td>
                <td className="border p-2">
                  {editTrainingId === training.training_id ? (
                    <input
                      className="border p-1"
                      type="text"
                      value={editedTraining.duration}
                      onChange={(e) =>
                        setEditedTraining({
                          ...editedTraining,
                          duration: e.target.value,
                        })
                      }
                    />
                  ) : (
                    training.duration
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  {editTrainingId === training.training_id ? (
                    <>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={() => setEditTrainingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => startEditing(training)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(training.training_id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderRecent = () => {
    const recentTrainings = [...trainings].slice(-3).reverse();
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Trainings</h2>
        <ul className="space-y-2">
          {recentTrainings.map((training) => (
            <li
              key={training.training_id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">
                {training.training_name}
              </h3>
              <p className="text-sm text-gray-600">
                {training.training_description}
              </p>
              <p className="text-sm font-medium mt-1">
                Duration: {training.duration}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            view === "table" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("table")}
        >
          Show Table
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "form" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("form")}
        >
          Show Form
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "recent" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("recent")}
        >
          Show Recent
        </button>
      </div>

      {view === "form" && renderForm()}
      {view === "table" && renderTable()}
      {view === "recent" && renderRecent()}
    </div>
  );
};

export default Training;
