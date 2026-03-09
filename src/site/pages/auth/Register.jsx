import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch("password", "");
  const [serverErorr, setServerErorr] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    general: "",
  });

 const onSubmit = async (data) => {
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/register",
      data
    );

    setServerErorr({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    toast.success("Registration successful! Please log in.");
    navigate("/login");

  } catch (error) {
    if (error.response) {
      const serverErrors = error.response.data.errors;
      console.log(serverErrors)

      if (serverErrors) {
        const newErrors = {
          name: serverErrors.name ? serverErrors.name[0] : "",
          email: serverErrors.email ? serverErrors.email[0] : "",
          password: serverErrors.password ? serverErrors.password[0] : "",
          password_confirmation: serverErrors.password_confirmation ? serverErrors.password_confirmation[0] : "",
        };
        setServerErorr(newErrors);
        
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } else {
       toast.error("Network error. Please check your connection and try again.");
    }
  }
};

  return (
    <div className="min-h-screen pt-28 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            {serverErorr.name && (
              <p className="text-red-500 text-sm">{serverErorr.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            {serverErorr.email && (
              <p className="text-red-500 text-sm">{serverErorr.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("password_confirmation", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("agreeToTerms", {
                required: "You must agree to the terms",
              })}
            />
            <label className="text-sm">
              I agree to the Terms and Privacy Policy
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm">
              {errors.agreeToTerms.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-70"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
