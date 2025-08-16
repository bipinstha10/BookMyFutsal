import { useForm, type SubmitHandler } from "react-hook-form";
import type { FutsalInput, FutsalUpdateInput } from "../types";
import { usePostFutsalsMutation } from "../redux/api/futsal";
import { toast } from "react-toastify";

export default function FutsalForm({
  futsal,
  onClose,
}: {
  futsal?: FutsalUpdateInput;
  onClose: () => void;
}) {
  const [createFutsal] = usePostFutsalsMutation();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<FutsalInput>();
  const onSubmit: SubmitHandler<FutsalInput> = async (futsalData) => {
    if (futsal) {
      console.log(futsalData);
    } else {
      const createdFutsal = await createFutsal(futsalData);

      const { data } = createdFutsal;

      if (data?.status === 201) {
        toast.success(data.message);
        // navigate("/futsal");
      }
      reset();
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8 p-4 border rounded shadow bg-white">
        <h2 className="text-xl text-green-700 font-semibold mb-4">
          {futsal ? `Edit ${futsal.name}` : "Add new futsal"}
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
            {futsal ? "Edit" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}
