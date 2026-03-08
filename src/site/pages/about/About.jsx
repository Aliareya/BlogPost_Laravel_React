import React from 'react';
import { Icon } from '@iconify/react';

const About = () => {
  const values = [
    {
      title: 'Authenticity',
      description: 'We encourage genuine expression and honest perspectives.'
    },
    {
      title: 'Respect',
      description: 'We promote respectful discourse and constructive feedback.'
    },
    {
      title: 'Inclusivity',
      description: 'We welcome diverse voices and viewpoints from all backgrounds.'
    },
    {
      title: 'Quality',
      description: 'We prioritize well-crafted content that informs, engages, and inspires.'
    },
    {
      title: 'Growth',
      description: 'We support the continuous learning and development of our community members.'
    }
  ];

  const readerFeatures = [
    'Access to diverse perspectives and knowledge',
    'Ability to engage with content through likes and comments',
    'Discover new ideas and insights across various topics',
    'Connect with writers whose work resonates with you'
  ];

  const writerFeatures = [
    'A platform to share your knowledge and stories',
    'Tools to create, edit, and manage your content',
    'Analytics to understand your audience',
    'Engagement through comments and likes'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer group">
              <h1 className="text-2xl font-bold text-blue-600 group-hover:scale-105 transition-transform duration-300">
                BlogHub
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Posts', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`font-medium transition-all duration-300 relative group ${
                    item === 'About' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    item === 'About' ? 'w-full' : 'w-0 group-hover:w-full'
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
      <header className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          About BlogHub
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          A community-driven platform for sharing knowledge, stories, and insights on a variety of topics.
        </p>
      </header>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-fadeInUp delay-100">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=600&fit=crop" 
            alt="Workspace with coffee and notebook" 
            className="w-full h-64 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Our Mission */}
        <section className="mb-16 animate-fadeInUp delay-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            At BlogHub, we believe in the power of shared knowledge and stories. Our mission is to create a space where writers can share their expertise, experiences, and perspectives with a global audience. We strive to build a platform that empowers voices, encourages meaningful discussions, and fosters a sense of community among our users.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-16 animate-fadeInUp delay-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Readers Card */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Icon icon="mdi:book-open-page-variant" className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Readers</h3>
              </div>
              <ul className="space-y-3">
                {readerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start group">
                    <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Writers Card */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Icon icon="mdi:pencil-outline" className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Writers</h3>
              </div>
              <ul className="space-y-3">
                {writerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start group">
                    <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16 animate-fadeInUp delay-400">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
          <p className="text-gray-700 mb-8 text-lg">We believe in fostering a community that values:</p>
          <div className="grid gap-4">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform" />
                <div>
                  <span className="font-bold text-gray-900">{value.title}:</span>
                  <span className="text-gray-700 ml-2">{value.description}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Our Community */}
        <section className="mb-16 animate-fadeInUp delay-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Community</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            Whether you're a seasoned writer looking to share your expertise or a curious reader seeking new perspectives, BlogHub is the place for you. Sign up today to become part of our growing community and start exploring the wealth of knowledge and stories our platform has to offer.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="animate-fadeInUp delay-100">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">BlogHub</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                A place to share your thoughts, ideas, and stories with the world.
              </p>
            </div>

            {/* Navigation */}
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

            {/* Account */}
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

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-12 pt-8 text-center animate-fadeIn delay-400">
            <p className="text-gray-500 text-sm">
              © 2026 BlogHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;