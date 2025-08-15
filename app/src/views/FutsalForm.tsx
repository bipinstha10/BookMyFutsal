import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import type { FutsalInput } from "../types";
import { usePostFutsalsMutation } from "../redux/api/futsal";
import { toast } from "react-toastify";

export default function FutsalForm() {
  const navigate = useNavigate();
  const [createFutsal, { isLoading: isFutsalCreating }] =
    usePostFutsalsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FutsalInput>();
  const onSubmit: SubmitHandler<FutsalInput> = async (futsal) => {
    const createdFutsal = await createFutsal(futsal);

    const { data } = createdFutsal;

    if (data?.status === 201) {
      toast.success(data.message);
      // navigate("/futsal");
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8 p-4 border rounded shadow bg-white">
        <h2 className="text-xl text-green-700 font-semibold mb-4">
          Add New Futsal
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="border px-3 py-2 rounded w-full placeholder-gray-700 text-black"
          />
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
            className="border px-3 py-2 rounded w-full placeholder-gray-700 text-black"
          />
          <input
            type="text"
            placeholder="Image URL"
            {...register("imageURL", { required: true })}
            className="border px-3 py-2 rounded w-full placeholder-gray-700 text-black"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500 transition cursor-pointer"
          >
            Add Futsal
          </button>
        </div>
      </div>
    </form>
  );
}
