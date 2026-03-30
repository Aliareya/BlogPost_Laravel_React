import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  // Team data
  const team = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Founder & Lead Developer",
      bio: "Passionate about React and modern web technologies. 10+ years of experience.",
      avatar: "https://i.pravatar.cc/150?u=2",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      id: 2,
      name: "Sarah Kim",
      role: "Head of Design",
      bio: "UI/UX enthusiast focused on creating beautiful and accessible digital experiences.",
      avatar: "https://i.pravatar.cc/150?u=3",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        dribbble: "https://dribbble.com",
      },
    },
    {
      id: 3,
      name: "Mike Ross",
      role: "Content Strategist",
      bio: "Expert in technical writing and content marketing. Helps make complex topics simple.",
      avatar: "https://i.pravatar.cc/150?u=4",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 4,
      name: "Emma Stone",
      role: "Community Manager",
      bio: "Connects with readers and builds engagement across all social platforms.",
      avatar: "https://i.pravatar.cc/150?u=5",
      social: {
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
  ];

  // Stats data
  const stats = [
    { label: "Articles Published", value: "500+", icon: "mdi:file-document" },
    { label: "Monthly Readers", value: "50K+", icon: "mdi:account-eye" },
    { label: "Countries Reached", value: "120+", icon: "mdi:web" },
    { label: "Newsletter Subscribers", value: "15K+", icon: "mdi:email-newsletter" },
  ];

  // Values data
  const values = [
    {
      title: "Quality Content",
      desc: "Every article is thoroughly researched and reviewed for accuracy.",
      icon: "mdi:star-circle",
      color: "yellow",
    },
    {
      title: "Community First",
      desc: "We build for our readers, encouraging feedback and discussion.",
      icon: "mdi:account-group",
      color: "blue",
    },
    {
      title: "Continuous Learning",
      desc: "We stay updated with the latest trends to share fresh insights.",
      icon: "mdi:school",
      color: "purple",
    },
    {
      title: "Open Source",
      desc: "We believe in sharing knowledge and contributing back to the community.",
      icon: "mdi:code-tags",
      color: "green",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Icon icon="mdi:information-outline" className="text-5xl mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're a team of passionate developers, designers, and writers dedicated to sharing knowledge and empowering the tech community.
          </p>
        </div>
      </section>

      {/* ================= STORY / MISSION ================= */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2024, MyBlog started with a simple mission: to make quality tech education accessible to everyone. What began as a small personal blog has grown into a thriving community of learners and professionals.
              </p>
              <p>
                We believe that knowledge should be free, clear, and practical. Our team works tirelessly to create content that not only informs but inspires action. Whether you're a beginner taking your first steps or a seasoned pro looking to stay updated, there's something here for you.
              </p>
              <p>
                Today, we serve readers in over 120 countries, covering topics from web development to design, business, and lifestyle.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/posts")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Browse Articles
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Contact Us
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl transform rotate-3" />
            <img
              src="https://picsum.photos/seed/team/600/400"
              alt="Our Team"
              className="relative rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-white py-16 px-4 border-y">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon={stat.icon} className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const colorClasses = {
              yellow: "bg-yellow-50 text-yellow-600",
              blue: "bg-blue-50 text-blue-600",
              purple: "bg-purple-50 text-purple-600",
              green: "bg-green-50 text-green-600",
            };
            
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[value.color]}`}>
                  <Icon icon={value.icon} className="text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="bg-white py-16 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Meet the Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The people behind the content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.id} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition group">
                <div className="relative inline-block mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-md"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-500 transition">
                      <Icon icon="mdi:twitter" className="text-xl" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-700 transition">
                      <Icon icon="mdi:linkedin" className="text-xl" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-400 hover:text-gray-800 transition">
                      <Icon icon="mdi:github" className="text-xl" />
                    </a>
                  )}
                  {member.social.dribbble && (
                    <a href={member.social.dribbble} className="text-gray-400 hover:text-pink-500 transition">
                      <Icon icon="mdi:dribbble" className="text-xl" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} className="text-gray-400 hover:text-pink-600 transition">
                      <Icon icon="mdi:instagram" className="text-xl" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Join Our Journey?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            We're always looking for talented writers and contributors. If you have a passion for sharing knowledge, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Become a Writer
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}