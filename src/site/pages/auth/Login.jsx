import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const {setUserDate , setToken} = useAuth();
  const [serverErorr, setServerErorr] = React.useState({
    email: "",
    password: "",
    general :''
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try{
      await axios.post('http://127.0.0.1:8000/api/login', data).then((response) => {
        const {access_token , user } = response.data;
        setToken(access_token);
        setUserDate(user);
      });

      toast.success("Login successful!");
      navigate("/");

    }catch(error){
      console.error("Login error:", error);
      if(error.response){
        const serverErrors = error.response.data.errors;
        if(serverErrors){
          const newErrors = {
            email: serverErrors.email ? serverErrors.email[0] : "",
            password: serverErrors.password ? serverErrors.password[0] : "",
            general: serverErrors.message ? serverErrors.message : "",
          };
          setServerErorr(newErrors);
        } else {
          const errorMessage = error.response.data;
          toast.error(errorMessage.message || "Please try again.");
        }
      }else{
        toast.error("Please check your connection and try again.");
      }
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', {
                required: 'Email is required',
                // pattern: {
                //   value: /\S+@\S+\.\S+/,
                //   message: 'Email is invalid',
                // },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            {serverErorr.email && <p className="text-red-500 text-sm mt-1">{serverErorr.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            {serverErorr.password && <p className="text-red-500 text-sm mt-1">{serverErorr.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-70"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;