import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: 'mdi:message-text-outline',
      title: 'Send a Message',
      description: "We'll respond to your inquiry as soon as possible, typically within 24 hours.",
      color: 'blue'
    },
    {
      icon: 'mdi:email-outline',
      title: 'Email Us',
      items: ['contact@bloghub.com', 'support@bloghub.com'],
      color: 'cyan'
    },
    {
      icon: 'mdi:phone-outline',
      title: 'Call Us',
      items: ['+1 (555) 123-4567', 'Monday-Friday: 9am - 5pm'],
      color: 'green'
    },
    {
      icon: 'mdi:map-marker-outline',
      title: 'Visit Us',
      items: ['123 Blog Street', 'Content City, 94321', 'United States'],
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer group">
              <h1 className="text-2xl font-bold text-blue-600 group-hover:scale-105 transition-transform duration-300">
                BlogHub
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Posts', 'About', 'Contact'].map((item, index) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`font-medium transition-all duration-300 relative group ${
                    item === 'Contact' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    item === 'Contact' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              ))}
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer hover:border-blue-500 hover:scale-110 transition-all duration-200"
              />
            </div>

            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Have questions or want to collaborate? We'd love to hear from you! Fill out the form below and our team will respond promptly.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Contact Info Cards - Left Side */}
          <div className="lg:col-span-4 space-y-4">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 animate-slideInLeft"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${colorClasses[info.color]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon icon={info.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                    {info.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">{info.description}</p>
                    )}
                    {info.items && (
                      <div className="space-y-1">
                        {info.items.map((item, i) => (
                          <p key={i} className={`text-sm ${item.includes('@') || item.includes('+') ? 'text-blue-600 font-medium hover:underline cursor-pointer' : 'text-gray-600'}`}>
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-8 animate-slideInRight delay-200">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-bounce-in">
                  <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Your message..."
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none resize-none`}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Icon icon="mdi:send" className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 animate-fadeInUp delay-300">
          <div className="bg-gray-200 rounded-2xl h-96 overflow-hidden relative group">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Icon icon="mdi:map" className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-500 font-medium">Interactive Map Loading...</p>
              </div>
            </div>
            {/* Map Placeholder Overlay */}
            <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 max-w-xs animate-slideInLeft">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon icon="mdi:map-marker" className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">BlogHub HQ</p>
                  <p className="text-sm text-gray-600">123 Blog Street</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fadeInUp delay-100">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">BlogHub</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                A place to share your thoughts, ideas, and stories with the world.
              </p>
            </div>
            
            <div className="animate-fadeInUp delay-200">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-2">
                {['Home', 'All Posts', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="animate-fadeInUp delay-300">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Account</h3>
              <ul className="space-y-2">
                {['Log in', 'Sign up', 'Dashboard'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center animate-fadeIn delay-400">
            <p className="text-gray-500 text-sm">© 2026 BlogHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;