import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="fixed inset-0 bg-gray-200 flex items-center justify-center">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <div className="flex items-center bg-gray-100 border rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500">
              <Icon icon="mdi:email-outline" className="text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="admin@gmail.com"
                className="w-full bg-transparent p-3 outline-none"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <div className="flex items-center bg-gray-100 border rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500">
              <Icon icon="mdi:lock-outline" className="text-gray-400 text-xl" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-transparent p-3 outline-none"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {/* Show/Hide Icon */}
              <Icon
                icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                className="text-gray-400 text-xl cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>

            <span className="text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Register
          </span>
        </p>

      </div>
    </div>
  );
}