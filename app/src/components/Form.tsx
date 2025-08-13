type FormProps = {
  onClose: () => void;
};
const Form = ({ onClose }: FormProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form
        action=""
        className="relative bg-white p-6 rounded shadow-lg z-10 text-base-300 font-bold w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-black">Login</h2>

        <label className="block mb-1 text-black">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          required
        />

        <label className="block mb-1 text-black">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="btn bg-green-700 border-0 flex-3 hover:bg-green-500 transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn bg-red-700 ml-4 border-0 hover:bg-red-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
