import React from 'react';

// About Header Component
const AboutHeader = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
        About Inkwell
      </h1>
      
      <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
        <p>
          Inkwell is a home for curious minds. We bring together writers, thinkers, and creators to share stories that matter — from technology and design to lifestyle and beyond.
        </p>
        
        <p>
          Founded on the belief that great writing has the power to inform, inspire, and connect, we curate content that goes beyond the surface. Whether you're here to learn something new or find a fresh perspective, you're in the right place.
        </p>
      </div>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

// Values Grid Component
const ValuesGrid = () => {
  const values = [
    {
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: "Thoughtful Writing",
      description: "Every piece is crafted with care, bringing depth and clarity to every topic."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Driven",
      description: "We believe in the power of shared perspectives and meaningful conversations."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Lifelong Learning",
      description: "Curiosity is at our core. We explore, discover, and share what we learn."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Fresh Perspectives",
      description: "We challenge the ordinary, offering unique viewpoints on everyday topics."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, index) => (
          <ValueCard
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </div>
  );
};

// Join Community Component
const JoinCommunity = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We're always looking for new voices. If you're passionate about writing and sharing ideas, we'd love to hear from you.
        </p>
      </div>
    </div>
  );
};



// Main About Component
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutHeader />
      <ValuesGrid />
      <JoinCommunity />
    </div>
  );
};

export default About;