import { useState, useEffect } from "react";

type FormProps = {
  onClose: () => void;
};

type InputProps = {
  id: string;
  label: string;
  type: string;
};

const InputField = ({ id, label, type }: InputProps) => (
  <>
    <label htmlFor={id} className="block mb-1 text-black">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={label}
      className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      required
    />
  </>
);

const Form = ({ onClose }: FormProps) => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Registering...");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay click closes modal */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-6 rounded shadow-lg z-10 text-base-300 font-bold max-w-sm w-full"
      >
        <h2 className="text-xl font-semibold mb-4 text-black">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Common fields */}
        <InputField id="email" label="Email" type="email" />
        <InputField id="password" label="Password" type="password" />

        {/* Extra field only for Register */}
        {!isLogin && (
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        )}

        {/* Switch between Login/Register */}
        <div className="flex justify-center items-center mb-4 text-black">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-green-700 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="btn bg-green-700 border-0 hover:bg-green-500 transition"
          >
            {isLogin ? "Login" : "Register"}
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
