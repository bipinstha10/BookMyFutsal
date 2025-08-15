import { useState } from "react";
import Card from "../components/Card";
import futsalsData from "../data/futsals";
import type { FutsalProps } from "../data/futsals";

const AdminDashboard = () => {
  const [futsals, setFutsals] = useState<FutsalProps[]>(futsalsData);
  const [editingFutsal, setEditingFutsal] = useState<FutsalProps | null>(null);
  const [newFutsal, setNewFutsal] = useState<Omit<FutsalProps, "id">>({
    img: "",
    name: "",
    location: "",
  });

  // Add new futsal
  const handleAdd = () => {
    if (!newFutsal.name || !newFutsal.location || !newFutsal.img) {
      return;
    }
    const nextId = futsals.length
      ? Math.max(...futsals.map((f) => f.id)) + 1
      : 1;
    setFutsals([...futsals, { id: nextId, ...newFutsal }]);
    setNewFutsal({ img: "", name: "", location: "" });
  };

  // Delete futsal
  const handleDelete = (id: number) => {
    setFutsals(futsals.filter((f) => f.id !== id));
    if (editingFutsal?.id === id) {
      setEditingFutsal(null);
    }
  };

  // Start editing
  const handleEdit = (futsal: FutsalProps) => {
    setEditingFutsal(futsal);
  };

  // Save edited futsal
  const handleSaveEdit = () => {
    if (!editingFutsal) {
      return;
    }
    setFutsals(
      futsals.map((f) => (f.id === editingFutsal.id ? editingFutsal : f))
    );
    setEditingFutsal(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add New Futsal */}
      <div className="mb-8 p-4 border rounded shadow bg-white">
        <h2 className="text-xl text-green-700 font-semibold mb-4">
          Add New Futsal
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newFutsal.name}
            onChange={(e) =>
              setNewFutsal({ ...newFutsal, name: e.target.value })
            }
            className="border px-3 py-2 rounded w-full placeholder-gray-700 text-black"
          />
          <input
            type="text"
            placeholder="Location"
            value={newFutsal.location}
            onChange={(e) =>
              setNewFutsal({ ...newFutsal, location: e.target.value })
            }
            className="border px-3 py-2 rounded w-full placeholder-gray-700 text-black"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newFutsal.img}
            onChange={(e) =>
              setNewFutsal({ ...newFutsal, img: e.target.value })
            }
            className="border px-3 py-2 rounded w-full placeholder-gray-700 text-black"
          />
          <button
            onClick={handleAdd}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500 transition"
          >
            Add Futsal
          </button>
        </div>
      </div>

      {/* Futsal List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              img={f.img}
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
      </div>
    </div>
  );
};

export default AdminDashboard;
