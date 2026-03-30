import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // 'name' | 'posts' | 'newest'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  // Category data with metadata
  const categories = [
    {
      id: 1,
      name: "Tech",
      slug: "tech",
      icon: "mdi:laptop",
      color: "blue",
      description: "Latest trends in web development, programming, and emerging technologies.",
      postCount: 42,
      subscriberCount: 1250,
      image: "https://picsum.photos/seed/tech-cat/600/300",
      featured: true,
      tags: ["React", "JavaScript", "AI", "Web Dev"],
    },
    {
      id: 2,
      name: "Design",
      slug: "design",
      icon: "mdi:palette",
      color: "purple",
      description: "UI/UX principles, design systems, typography, and creative inspiration.",
      postCount: 28,
      subscriberCount: 890,
      image: "https://picsum.photos/seed/design-cat/600/300",
      featured: true,
      tags: ["Figma", "UI", "UX", "Branding"],
    },
    {
      id: 3,
      name: "Business",
      slug: "business",
      icon: "mdi:briefcase",
      color: "emerald",
      description: "Startup strategies, marketing tactics, leadership, and entrepreneurship.",
      postCount: 35,
      subscriberCount: 2100,
      image: "https://picsum.photos/seed/business-cat/600/300",
      featured: false,
      tags: ["Startup", "Marketing", "Finance", "Growth"],
    },
    {
      id: 4,
      name: "Lifestyle",
      slug: "lifestyle",
      icon: "mdi:coffee",
      color: "orange",
      description: "Wellness, productivity, travel, and mindful living tips.",
      postCount: 19,
      subscriberCount: 650,
      image: "https://picsum.photos/seed/lifestyle-cat/600/300",
      featured: false,
      tags: ["Wellness", "Travel", "Productivity", "Mindfulness"],
    },
    {
      id: 5,
      name: "Tutorials",
      slug: "tutorials",
      icon: "mdi:book-open",
      color: "indigo",
      description: "Step-by-step guides, code examples, and hands-on learning resources.",
      postCount: 56,
      subscriberCount: 3400,
      image: "https://picsum.photos/seed/tutorials-cat/600/300",
      featured: true,
      tags: ["How-to", "Beginner", "Code", "Learning"],
    },
    {
      id: 6,
      name: "News",
      slug: "news",
      icon: "mdi:newspaper",
      color: "red",
      description: "Industry updates, tech news, and trending topics in the digital world.",
      postCount: 67,
      subscriberCount: 4200,
      image: "https://picsum.photos/seed/news-cat/600/300",
      featured: false,
      tags: ["Updates", "Trends", "Industry", "Announcements"],
    },
  ];

  // Sample posts per category (for preview)
  const categoryPosts = {
    tech: [
      { id: 101, title: "Modern Web Development", date: "Mar 15", image: "https://picsum.photos/seed/t1/200/120" },
      { id: 102, title: "React Performance Tips", date: "Mar 10", image: "https://picsum.photos/seed/t2/200/120" },
      { id: 103, title: "TypeScript Best Practices", date: "Mar 1", image: "https://picsum.photos/seed/t3/200/120" },
    ],
    design: [
      { id: 201, title: "UI/UX Design Principles", date: "Mar 12", image: "https://picsum.photos/seed/d1/200/120" },
      { id: 202, title: "Color Theory for Designers", date: "Mar 3", image: "https://picsum.photos/seed/d2/200/120" },
    ],
    business: [
      { id: 301, title: "Startup Growth Strategies", date: "Mar 8", image: "https://picsum.photos/seed/b1/200/120" },
    ],
    lifestyle: [
      { id: 401, title: "Minimalist Living Guide", date: "Mar 5", image: "https://picsum.photos/seed/l1/200/120" },
      { id: 402, title: "Remote Work Productivity", date: "Feb 28", image: "https://picsum.photos/seed/l2/200/120" },
    ],
    tutorials: [
      { id: 501, title: "Build a Blog with Next.js", date: "Mar 14", image: "https://picsum.photos/seed/tut1/200/120" },
      { id: 502, title: "Tailwind CSS Crash Course", date: "Mar 7", image: "https://picsum.photos/seed/tut2/200/120" },
    ],
    news: [
      { id: 601, title: "AI Breakthroughs in 2026", date: "Mar 16", image: "https://picsum.photos/seed/n1/200/120" },
    ],
  };

  // Filter & sort categories
  const filteredCategories = useMemo(() => {
    let result = [...categories];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (cat) =>
          cat.name.toLowerCase().includes(query) ||
          cat.description.toLowerCase().includes(query) ||
          cat.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sorting
    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "posts") {
      result.sort((a, b) => b.postCount - a.postCount);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.featured - a.featured);
    }

    return result;
  }, [searchQuery, sortBy]);

  // Color mapping for badges/buttons
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      hover: "hover:bg-blue-600",
      ring: "focus:ring-blue-500",
      border: "border-blue-200",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      hover: "hover:bg-purple-600",
      ring: "focus:ring-purple-500",
      border: "border-purple-200",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      hover: "hover:bg-emerald-600",
      ring: "focus:ring-emerald-500",
      border: "border-emerald-200",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      hover: "hover:bg-orange-600",
      ring: "focus:ring-orange-500",
      border: "border-orange-200",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      hover: "hover:bg-indigo-600",
      ring: "focus:ring-indigo-500",
      border: "border-indigo-200",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      hover: "hover:bg-red-600",
      ring: "focus:ring-red-500",
      border: "border-red-200",
    },
  };

  // Category Card Component
  const CategoryCard = ({ category }) => {
    const colors = colorClasses[category.color];
    const posts = categoryPosts[category.slug] || [];

    return (
      <article
        className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border ${colors.border}`}
        onClick={() => navigate(`/categories/${category.slug}`)}
      >
        {/* Featured Badge */}
        {category.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-3 py-1 ${colors.bg} ${colors.text} text-xs font-semibold rounded-full`}>
              Featured
            </span>
          </div>
        )}

        {/* Category Image */}
        <div className="h-40 overflow-hidden relative">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className={`p-3 ${colors.bg} rounded-xl`}>
              <Icon icon={category.icon} className={`text-2xl ${colors.text}`} />
            </div>
            <h3 className="text-xl font-bold text-white">{category.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {category.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 transition"
              >
                {tag}
              </span>
            ))}
            {category.tags.length > 3 && (
              <span className="px-2 py-1 text-gray-400 text-xs">+{category.tags.length - 3}</span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Icon icon="mdi:file-document" className="text-gray-400" />
              {category.postCount} posts
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:account-group" className="text-gray-400" />
              {category.subscriberCount.toLocaleString()} subscribers
            </span>
          </div>

          {/* Post Previews */}
          {posts.length > 0 && (
            <div className="border-t pt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Latest posts</p>
              <div className="space-y-2">
                {posts.slice(0, 2).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/post/${post.id}`);
                    }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-12 h-8 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{post.title}</p>
                      <p className="text-xs text-gray-400">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            className={`w-full mt-4 py-2.5 ${colors.bg} ${colors.text} font-medium rounded-lg ${colors.hover} text-white transition flex items-center justify-center gap-2 group/btn`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/categories/${category.slug}`);
            }}
          >
            Browse Posts
            <Icon icon="mdi:arrow-right" className="group-hover/btn:translate-x-1 transition" />
          </button>
        </div>
      </article>
    );
  };

  // List View Component
  const CategoryListItem = ({ category }) => {
    const colors = colorClasses[category.color];

    return (
      <article
        className={`bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex gap-4 cursor-pointer border ${colors.border}`}
        onClick={() => navigate(`/categories/${category.slug}`)}
      >
        {/* Icon */}
        <div className={`p-4 ${colors.bg} rounded-xl flex-shrink-0 self-start`}>
          <Icon icon={category.icon} className={`text-3xl ${colors.text}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                {category.featured && (
                  <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} text-xs font-medium rounded`}>
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {category.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Stats */}
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-gray-800">{category.postCount}</p>
              <p className="text-xs text-gray-500">posts</p>
            </div>
          </div>

          {/* Action */}
          <button
            className={`mt-2 px-4 py-2 ${colors.bg} ${colors.text} font-medium rounded-lg ${colors.hover} text-white transition text-sm inline-flex items-center gap-1`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/categories/${category.slug}`);
            }}
          >
            View Category
            <Icon icon="mdi:arrow-right" className="text-sm" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">


      {/* ================= PAGE HERO ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Icon icon="mdi:folder-multiple" className="text-5xl mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Explore Categories</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Discover content tailored to your interests. From tech tutorials to lifestyle tips, find your perfect read.
          </p>
        </div>
      </section>

      {/* ================= SEARCH & FILTERS ================= */}
      <section className="max-w-6xl mx-auto py-6 px-4">
        <div className="bg-white rounded-xl shadow p-4 md:p-5 flex flex-col md:flex-row gap-4 items-end">
          
          {/* Search */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Categories</label>
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, tag, or description..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon icon="mdi:close" className="text-sm" />
                </button>
              )}
            </div>
          </div>

          {/* Sort */}
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="posts">Most Posts</option>
              <option value="newest">Featured First</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 transition ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              aria-label="Grid view"
            >
              <Icon icon="mdi:view-grid" className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 transition ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              aria-label="List view"
            >
              <Icon icon="mdi:view-list" className="text-lg" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-gray-600">
          Showing <span className="font-semibold text-gray-800">{filteredCategories.length}</span> categories
        </div>
      </section>

      {/* ================= CATEGORIES GRID/LIST ================= */}
      <section className="max-w-6xl mx-auto py-4 px-4 pb-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <Icon icon="mdi:folder-search" className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-600 font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : viewMode === "grid" ? (
          // GRID VIEW
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          // LIST VIEW
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <CategoryListItem key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* ================= SUBSCRIBE CTA ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Icon icon="mdi:bell-ring" className="text-4xl mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Never Miss an Update</h2>
          <p className="text-blue-100 mb-6">
            Subscribe to your favorite categories and get notified when new posts are published.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2">
            <Icon icon="mdi:account-plus" />
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
}