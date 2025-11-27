import { useForm, type SubmitHandler } from "react-hook-form";
import type { FutsalInput, FutsalUpdateInput } from "../types";
import {
  usePostFutsalsMutation,
  useUpdateFutsalsMutation,
} from "../redux/api/futsal";
import { toast } from "react-toastify";

export default function FutsalForm({
  futsal,
  onClose,
}: {
  futsal?: FutsalUpdateInput;
  onClose: () => void;
}) {
  const [createFutsal] = usePostFutsalsMutation();
  const [updateFutsal] = useUpdateFutsalsMutation();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<FutsalInput>({
    defaultValues: {
      // name: futsal?.name,
      // location: futsal?.location,
      // imageURL: futsal?.imageURL,
      ...futsal,
    },
  });
  const onSubmit: SubmitHandler<FutsalInput> = async (futsalData) => {
    if (futsal) {
      const updatedFutsal = await updateFutsal({
        id: String(futsal.id),
        futsalInput: futsalData,
      });

      const { data } = updatedFutsal;

      if (data?.status === 200) {
        toast.success(data.message);
        // navigate("/futsal");
      }
    } else {
      const createdFutsal = await createFutsal(futsalData);

      const { data } = createdFutsal;

      if (data?.status === 201) {
        toast.success(data.message);
        // navigate("/futsal");
      }
    }
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 rounded shadow bg-[#0C0C0C]">
        <h2 className="font-[teko] text-3xl text-white font-semibold mb-4">
          {futsal ? `Edit ${futsal.name}` : "Add new futsal"}
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
          />
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
          />
          <input
            type="text"
            placeholder="Image URL"
            {...register("imageURL", { required: true })}
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
          />
          <button
            type="submit"
            className="cursor-pointer bg-[#24cfa6] text-black p-1 rounded ml-[70%]"
          >
            {futsal ? "Edit" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}
