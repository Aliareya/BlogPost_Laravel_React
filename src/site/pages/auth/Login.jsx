import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate error for demo
    if (formData.email === 'error@test.com') {
      setLoginError('Invalid email or password. Please try again.');
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(false);
    alert('Login successful! Welcome back.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>



      {/* Main Content */}
      <div className="min-h-[calc(100vh-4rem)] pt-28 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Illustration/Info */}
          <div className="hidden lg:block animate-slideInLeft order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
              
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop" 
                  alt="Team collaboration" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h3>
                  <p className="text-gray-600">Sign in to continue your journey with our community.</p>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">50K+ Users</p>
                    <p className="text-xs text-gray-500">Active now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="animate-slideInRight order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                  <Icon icon="mdi:account" className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your account to continue</p>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center animate-shake">
                  <Icon icon="mdi:alert-circle" className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-red-800 text-sm font-medium">{loginError}</span>
                </div>
              )}

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group">
                  <Icon icon="mdi:google" className="w-5 h-5 text-gray-600 group-hover:text-blue-600 mr-2" />
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">Google</span>
                </button>
                <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group">
                  <Icon icon="mdi:github" className="w-5 h-5 text-gray-600 group-hover:text-blue-600 mr-2" />
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">GitHub</span>
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon icon="mdi:email-outline" className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all duration-300 outline-none`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500 animate-fadeInUp">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon icon="mdi:lock-outline" className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-12 py-3 rounded-xl border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all duration-300 outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="w-5 h-5" />
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-500 animate-fadeInUp">{errors.password}</p>}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-all"
                  />
                  <label className="ml-2 text-sm text-gray-600 cursor-pointer select-none hover:text-gray-900 transition-colors">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Register Link */}
              <p className="mt-6 text-center text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors">
                  Create one now
                </a>
              </p>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-800 font-medium mb-2">Demo Credentials:</p>
                <p className="text-xs text-blue-600">Email: demo@bloghub.com</p>
                <p className="text-xs text-blue-600">Password: password123</p>
              </div>
            </div>

            {/* Security Badges */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <Icon icon="mdi:shield-check" className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                <span className="text-sm group-hover:text-gray-600 transition-colors">Secure Login</span>
              </div>
              <div className="flex items-center space-x-2 group cursor-pointer">
                <Icon icon="mdi:lock-outline" className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm group-hover:text-gray-600 transition-colors">256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Login;