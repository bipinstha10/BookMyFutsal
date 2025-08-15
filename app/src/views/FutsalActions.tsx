import {
  useGetFutsalsQuery,
  useDeleteFutsalMutation,
} from "../redux/api/futsal";
import Card from "../components/Card";
import { toast } from "react-toastify";

const FutsalActions = () => {
  const { data } = useGetFutsalsQuery();
  const [deleteFutsal] = useDeleteFutsalMutation();
  const futsals = data?.data;

  const handleDelete = async (id: string) => {
    const deletedFutsal = await deleteFutsal(Number(id));

    const { data } = deletedFutsal;

    if (data?.status === 200) {
      toast.success(data.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {futsals?.map((futsal) => (
        <Card
          key={futsal.id}
          imageURL={futsal.imageURL}
          name={futsal.name}
          location={futsal.location}
          adminActions={
            <>
              <button
                onClick={() => {}}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 cursor-pointer"
              >
                Edit
              </button>
              <button
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
