import { useState } from "react";
import Card from "../components/Card";
import FutsalForm from "./FutsalForm";

const AdminDashboard = () => {
  // Add new futsal
  const handleAdd = () => {};

  // Delete futsal
  const handleDelete = () => {};

  // Start editing
  const handleEdit = () => {};

  // Save edited futsal
  const handleSaveEdit = () => {};

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add New Futsal */}
      <FutsalForm />

      {/* Futsal List */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {futsals.map((f) =>
          editingFutsal?.id === f.id ? (
            <div
              key={f.id}
              className="p-4 border rounded shadow bg-white flex flex-col gap-2"
            >
              <input
                type="text"
                value={editingFutsal.name}
                onChange={(e) =>
                  setEditingFutsal({ ...editingFutsal, name: e.target.value })
                }
                className="border px-2 py-1 rounded w-full placeholder-gray-700 text-black"
                placeholder="Name"
              />
              <input
                type="text"
                value={editingFutsal.location}
                onChange={(e) =>
                  setEditingFutsal({
                    ...editingFutsal,
                    location: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded w-full placeholder-gray-700 text-black"
                placeholder="Location"
              />
              <input
                type="text"
                value={editingFutsal.img}
                onChange={(e) =>
                  setEditingFutsal({ ...editingFutsal, img: e.target.value })
                }
                className="border px-2 py-1 rounded w-full placeholder-gray-700 text-black"
                placeholder="Image URL"
              />
              <div className="flex justify-between mt-2">
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingFutsal(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <Card
              key={f.id}
              imageURL={f.imageURL}
              name={f.name}
              location={f.location}
              adminActions={
                <>
                  <button
                    onClick={() => handleEdit(f)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                </>
              }
            />
          )
        )}
      </div> */}
    </div>
  );
};

export default AdminDashboard;
