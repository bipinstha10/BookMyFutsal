import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

type FormProps = {
  type: string;
};

const Form = ({ type }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {type === "signup" ? (
        <form className="flex flex-col">
          <label className="text-sm text-[#9e9e9e]">Name *</label>
          <input
            type="text"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your name"
          />
          <label className="text-sm text-[#9e9e9e]">Email*</label>
          <input
            type="text"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your email address"
          />
          <label className="text-sm text-[#9e9e9e]">Mobile Number *</label>
          <input
            type="text"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your mobile number"
          />
          <label className="text-sm text-[#9e9e9e]">Password *</label>
          <input
            type="text"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your password"
          />
          <label className="text-sm text-[#9e9e9e]">Confirm Password *</label>
          <input
            type="text"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your password"
          />
        </form>
      ) : (
        <form className="flex flex-col">
          <label className="text-sm text-[#9e9e9e]">Email address</label>
          <input
            type="email"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your email address"
          />
          <label className="text-sm text-[#9e9e9e]">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="text-sm w-full flex-9/10 bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
              placeholder="Enter your password here"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer absolute top-2 right-2 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-[#24cfa6] text-black p-1 rounded ml-[70%]"
            value="continue"
          >
            Continue
          </button>
        </form>
      )}
    </>
  );
};

export default Form;
