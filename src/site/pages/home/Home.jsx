import React from "react";
import { Icon } from "@iconify/react";

export default function Home() {
  // Dummy data
  const categories = [
    { name: "Tech", icon: "mdi:laptop", count: 12 },
    { name: "Design", icon: "mdi:palette", count: 8 },
    { name: "Business", icon: "mdi:briefcase", count: 15 },
    { name: "Lifestyle", icon: "mdi:coffee", count: 6 },
  ];

  const posts = [
    {
      id: 1,
      title: "Modern Web Development",
      desc: "Learn the latest trends in web development with React, Next.js, and Tailwind CSS.",
      date: "Mar 15, 2026",
      readTime: "5 min read",
      image: "https://picsum.photos/seed/tech/400/200",
    },
    {
      id: 2,
      title: "UI/UX Design Tips",
      desc: "Improve your design skills with these practical tips and real-world examples.",
      date: "Mar 12, 2026",
      readTime: "4 min read",
      image: "https://picsum.photos/seed/design/400/200",
    },
    {
      id: 3,
      title: "React Best Practices",
      desc: "Write clean, scalable, and maintainable React applications with these proven patterns.",
      date: "Mar 10, 2026",
      readTime: "6 min read",
      image: "https://picsum.photos/seed/react/400/200",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover articles, tutorials, and insights on tech, design, business, and lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Explore Posts
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section id="categories" className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Browse Categories</h2>
          <p className="text-gray-600">Find content that interests you</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center group"
            >
              <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition">
                <Icon icon={cat.icon} className="text-2xl text-blue-600 group-hover:text-white transition" />
              </div>
              <p className="font-semibold text-gray-800">{cat.name}</p>
              <span className="text-sm text-gray-500">{cat.count} posts</span>
            </a>
          ))}
        </div>
      </section>

      {/* ================= LATEST POSTS ================= */}
      <section id="posts" className="max-w-6xl mx-auto py-16 px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Posts</h2>
            <p className="text-gray-600">Fresh content just for you</p>
          </div>
          <a href="#" className="text-blue-600 font-medium hover:underline hidden sm:block">
            View All →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.desc}</p>
                <a href="#" className="text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition">
                  Read More <Icon icon="mdi:arrow-right" className="text-sm" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <a href="#" className="text-blue-600 font-medium hover:underline">
            View All Posts →
          </a>
        </div>
      </section>

      {/* ================= SUBSCRIBE ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Icon icon="mdi:email-newsletter" className="text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-6">
            Get the latest posts and updates delivered straight to your inbox. No spam, ever.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-blue-200 mt-4">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </section>

      

    </div>
  );
}