import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Registration successful! Please check your email to verify your account.');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
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
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer group">
              <h1 className="text-2xl font-bold text-blue-600 group-hover:scale-105 transition-transform duration-300">
                BlogHub
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Posts</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</a>
              <a href="#" className="px-5 py-2.5 text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Log in
              </a>
            </div>

            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Illustration/Info */}
          <div className="hidden lg:block animate-slideInLeft">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
              
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop" 
                  alt="Community" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Our Community</h3>
                  <p className="text-gray-600">Connect with thousands of writers and readers from around the world.</p>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:check" className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Free to Join</p>
                    <p className="text-sm text-gray-500">No credit card required</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '3s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:account-group" className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">50K+ Members</p>
                    <p className="text-sm text-gray-500">Growing community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="animate-slideInRight">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
                <p className="text-gray-600">Join BlogHub and start sharing your stories today</p>
              </div>

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
                  <span className="px-4 bg-white text-gray-500">Or register with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon icon="mdi:account-outline" className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all duration-300 outline-none`}
                    />
                  </div>
                  {errors.fullName && <p className="mt-1 text-sm text-red-500 animate-fadeInUp">{errors.fullName}</p>}
                </div>

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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
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
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className={`ml-2 text-xs font-medium ${passwordStrength <= 2 ? 'text-red-500' : passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="mt-1 text-sm text-red-500 animate-fadeInUp">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon icon="mdi:lock-check-outline" className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-12 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all duration-300 outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Icon icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'} className="w-5 h-5" />
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500 animate-fadeInUp">{errors.confirmPassword}</p>}
                </div>

                {/* Terms and Conditions */}
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-all"
                      />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      I agree to the <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agreeToTerms && <p className="mt-1 text-sm text-red-500 animate-fadeInUp">{errors.agreeToTerms}</p>}
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
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <p className="mt-6 text-center text-gray-600">
                Already have an account?{' '}
                <a href="#" className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors">
                  Log in
                </a>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:shield-check" className="w-5 h-5" />
                <span className="text-sm">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:lock-outline" className="w-5 h-5" />
                <span className="text-sm">Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:account-check" className="w-5 h-5" />
                <span className="text-sm">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-blue-600">BlogHub</h2>
              <span className="text-gray-400">|</span>
              <p className="text-sm text-gray-600">Share your story with the world</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            © 2026 BlogHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;