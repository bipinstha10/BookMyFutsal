import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { UserInput, UserLoginInput } from "../types";

import {
  usePostUsersMutation,
  usePostUsersLoginMutation,
} from "../redux/api/user";

import { toast } from "react-toastify";

type FormProps = {
  type: string;
};

export default function Form({ type }: FormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [createUser] = usePostUsersMutation();
  const [validUser] = usePostUsersLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserInput>();

  const onSubmit: SubmitHandler<UserInput> = async (userData) => {
    try {
      const response = await createUser(userData).unwrap();

      if (response.status === 201) {
        toast.success(response.message);
        navigate("/");
        reset();
      }
    } catch (err: any) {
      if ("status" in err && err.status === 409) {
        toast.error("Email already registered");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const onLogin: SubmitHandler<UserLoginInput> = async (userData) => {
    try {
      const response = await validUser(userData).unwrap();

      if (response.status === 201) {
        toast.success(response.message);
        navigate("/");
        reset();
      }
    } catch (err: any) {
      if ("status" in err && err.status === 401) {
        toast.error(err.data?.message ?? "Invalid Credentials.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      {type === "signup" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label className="text-sm text-[#9e9e9e]">Name *</label>
          <input
            type="text"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
          <label className="text-sm text-[#9e9e9e]">Email*</label>
          <input
            type="text"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
          <label className="text-sm text-[#9e9e9e]">Mobile Number *</label>
          <input
            type="text"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your mobile number"
            {...register("phone", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
          <label className="text-sm text-[#9e9e9e]">Password *</label>
          <input
            type={showPassword ? "text" : "password"}
            className="text-sm w-full flex-9/10 bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          <label className="text-sm text-[#9e9e9e]">Confirm Password *</label>
          <input
            type="password"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Password do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
          <button
            type="submit"
            className="cursor-pointer bg-[#24cfa6] text-black p-1 rounded ml-[70%]"
          >
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onLogin)} className="flex flex-col">
          <label className="text-sm text-[#9e9e9e]">Email address</label>
          <input
            type="email"
            className="text-sm bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
          <label className="text-sm text-[#9e9e9e]">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="text-sm w-full flex-9/10 bg-[#1e1e1e] border-0 outline-0 p-2 mb-6"
              placeholder="Enter your password here"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
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
}
