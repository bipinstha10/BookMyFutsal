import FutsalForm from "./FutsalForm";
import FutsalActions from "./FutsalActions";
import Modal from "../components/Modal";
import { useState } from "react";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex-1 p-6 max-w-5xl mx-auto md:mt-[50px]">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex justify-end m-3">
        <button
          className="cursor-pointer bg-[#24cfa6] text-black p-2 rounded ml-[70%]"
          onClick={() => setOpen(true)}
        >
          Add Futsal
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <FutsalForm onClose={() => setOpen(false)} />
      </Modal>

      <FutsalActions />
    </div>
  );
};

export default AdminDashboard;
