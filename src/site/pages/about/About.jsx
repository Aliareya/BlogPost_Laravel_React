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

      {/* Header Section */}
      <header className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center animate-fadeInUp">
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

    </div>
  );
};

export default About;