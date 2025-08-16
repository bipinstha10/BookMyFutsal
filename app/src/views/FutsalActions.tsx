import {
  useGetFutsalsQuery,
  useDeleteFutsalMutation,
  useLazyGetFutsalQuery,
} from "../redux/api/futsal";
import Card from "../components/Card";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import FutsalForm from "./FutsalForm";
import { useState } from "react";

const FutsalActions = () => {
  const [open, setOpen] = useState(false);

  const { data } = useGetFutsalsQuery();
  const [fetchFutsal, { data: futsalData }] = useLazyGetFutsalQuery();
  const [deleteFutsal] = useDeleteFutsalMutation();
  const futsals = data?.data;

  const handleDelete = async (id: string) => {
    const deletedFutsal = await deleteFutsal(Number(id));

    const { data } = deletedFutsal;

    if (data?.status === 200) {
      toast.success(data.message);
    }
  };

  const handleEdit = async (id: string) => {
    await fetchFutsal(id);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Modal open={open} onClose={() => setOpen(false)}>
        <FutsalForm futsal={futsalData?.data} onClose={() => setOpen(false)} />
      </Modal>
      {futsals?.map((futsal) => (
        <Card
          key={futsal.id}
          imageURL={futsal.imageURL}
          name={futsal.name}
          location={futsal.location}
          adminActions={
            <>
              <button
                key={"edit"}
                onClick={() => handleEdit(futsal.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 cursor-pointer"
              >
                Edit
              </button>
              <button
                key={"delete"}
                onClick={() => handleDelete(futsal.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 cursor-pointer"
              >
                Delete
              </button>
            </>
          }
        />
      ))}
    </div>
  );
};

export default FutsalActions;
