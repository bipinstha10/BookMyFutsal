import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  location: string;
  imageURL: string;
};

export default function FutsalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log("futsal data", data);

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
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500 transition"
          >
            Add Futsal
          </button>
        </div>
      </div>
    </form>
  );
}
