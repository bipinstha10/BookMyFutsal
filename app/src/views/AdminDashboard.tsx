import FutsalForm from "./FutsalForm";
import FutsalActions from "./FutsalActions";

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add New Futsal */}
      <FutsalForm />

      {/* Futsal List */}
      <FutsalActions />
    </div>
  );
};

export default AdminDashboard;
