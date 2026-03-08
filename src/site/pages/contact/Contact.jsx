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
  

      {/* Header Section */}
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center animate-fadeInUp">
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

      </div>
    </div>
  );
};

export default Contact;