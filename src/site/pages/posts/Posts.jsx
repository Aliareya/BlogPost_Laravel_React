import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";

export default function Posts() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState({}); // Track liked posts: { postId: boolean }
  const postsPerPage = 6;

  // Dummy data with likes & comments
  const categories = ["All", "Tech", "Design", "Business", "Lifestyle"];

  const allPosts = [
    {
      id: 1,
      title: "Modern Web Development",
      desc: "Learn the latest trends in web development with React, Next.js, and Tailwind CSS.",
      category: "Tech",
      date: "2026-03-15",
      image: "https://picsum.photos/seed/tech1/400/200",
      author: "Alex Chen",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      desc: "Master the fundamentals of user-centered design with practical examples.",
      category: "Design",
      date: "2026-03-12",
      image: "https://picsum.photos/seed/design1/400/200",
      author: "Sarah Kim",
      likes: 42,
      comments: 15,
    },
    {
      id: 3,
      title: "React Performance Tips",
      desc: "Optimize your React apps with memoization, code splitting, and lazy loading.",
      category: "Tech",
      date: "2026-03-10",
      image: "https://picsum.photos/seed/tech2/400/200",
      author: "Alex Chen",
      likes: 67,
      comments: 23,
    },
    {
      id: 4,
      title: "Startup Growth Strategies",
      desc: "Proven tactics to scale your business from zero to one million users.",
      category: "Business",
      date: "2026-03-08",
      image: "https://picsum.photos/seed/business1/400/200",
      author: "Mike Ross",
      likes: 31,
      comments: 12,
    },
    {
      id: 5,
      title: "Minimalist Living Guide",
      desc: "Simplify your life with these practical minimalist lifestyle tips.",
      category: "Lifestyle",
      date: "2026-03-05",
      image: "https://picsum.photos/seed/lifestyle1/400/200",
      author: "Emma Stone",
      likes: 19,
      comments: 6,
    },
    {
      id: 6,
      title: "Color Theory for Designers",
      desc: "Understand color psychology and create stunning visual compositions.",
      category: "Design",
      date: "2026-03-03",
      image: "https://picsum.photos/seed/design2/400/200",
      author: "Sarah Kim",
      likes: 55,
      comments: 18,
    },
    {
      id: 7,
      title: "TypeScript Best Practices",
      desc: "Write type-safe, maintainable code with advanced TypeScript patterns.",
      category: "Tech",
      date: "2026-03-01",
      image: "https://picsum.photos/seed/tech3/400/200",
      author: "Alex Chen",
      likes: 89,
      comments: 34,
    },
    {
      id: 8,
      title: "Remote Work Productivity",
      desc: "Stay focused and productive while working from anywhere in the world.",
      category: "Lifestyle",
      date: "2026-02-28",
      image: "https://picsum.photos/seed/lifestyle2/400/200",
      author: "Emma Stone",
      likes: 38,
      comments: 11,
    },
  ];

  // Toggle like for a post
  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Get current like count for a post (includes user's like)
  const getLikeCount = (post) => {
    const isLiked = likedPosts[post.id];
    return post.likes + (isLiked ? 1 : 0);
  };

  // Filter & sort posts
  const filteredPosts = useMemo(() => {
    let result = [...allPosts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.desc.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleFilterChange = () => setCurrentPage(1);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Reusable Engagement Bar Component
  const EngagementBar = ({ post }) => {
    const isLiked = likedPosts[post.id];
    const likeCount = getLikeCount(post);

    return (
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {/* Like Button */}
        <button
          onClick={() => toggleLike(post.id)}
          className={`flex items-center gap-1.5 text-sm font-medium transition group ${
            isLiked
              ? "text-red-500 hover:text-red-600"
              : "text-gray-500 hover:text-red-500"
          }`}
          aria-label={isLiked ? "Unlike post" : "Like post"}
        >
          <Icon
            icon={isLiked ? "mdi:heart" : "mdi:heart-outline"}
            className={`text-lg transition ${
              isLiked ? "fill-current" : ""
            } group-hover:scale-110`}
          />
          <span>{likeCount}</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => console.log(`Open comments for post ${post.id}`)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 font-medium transition group"
          aria-label="View comments"
        >
          <Icon
            icon="mdi:comment-outline"
            className="text-lg group-hover:scale-110 transition"
          />
          <span>{post.comments}</span>
        </button>

        {/* Share Button (Bonus) */}
        <button
          onClick={() => console.log(`Share post ${post.id}`)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 font-medium transition group"
          aria-label="Share post"
        >
          <Icon
            icon="mdi:share-variant-outline"
            className="text-lg group-hover:scale-110 transition"
          />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* ================= PAGE HEADER ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">All Posts</h1>
          <p className="text-blue-100">Browse our latest articles and insights</p>
        </div>
      </section>

      {/* ================= SEARCH & FILTERS ================= */}
      <section className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow p-4 md:p-6 space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, authors, topics..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); handleFilterChange(); }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); handleFilterChange(); }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); handleFilterChange(); }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">A-Z Title</option>
            </select>
          </div>

          {/* View Toggle & Clear */}
          <div className="flex items-center gap-2">
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
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 font-medium flex items-center gap-1 transition"
              >
                <Icon icon="mdi:close-circle" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Badges */}
        {(searchQuery || selectedCategory !== "all") && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="hover:text-blue-900">
                  <Icon icon="mdi:close" className="text-xs" />
                </button>
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("all")} className="hover:text-blue-900">
                  <Icon icon="mdi:close" className="text-xs" />
                </button>
              </span>
            )}
          </div>
        )}

        <div className="mt-4 text-gray-600">
          Showing <span className="font-semibold text-gray-800">{filteredPosts.length}</span> results
        </div>
      </section>

      {/* ================= POSTS GRID/LIST ================= */}
      <section className="max-w-6xl mx-auto py-4 px-4 pb-12">
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <Icon icon="mdi:file-search" className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="text-blue-600 font-medium hover:underline">
              Clear all filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          // GRID VIEW
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition group flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{post.desc}</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Icon icon="mdi:account" className="text-gray-400" />
                    <span>{post.author}</span>
                  </div>

                  {/* Engagement Bar */}
                  <EngagementBar post={post} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          // LIST VIEW
          <div className="space-y-4">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition group flex flex-col md:flex-row"
              >
                <div className="md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Icon icon="mdi:account" className="text-gray-400" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <EngagementBar post={post} />
                      <a href="#" className="text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition">
                        Read <Icon icon="mdi:arrow-right" className="text-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              <Icon icon="mdi:chevron-left" /> Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 text-gray-400">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              Next <Icon icon="mdi:chevron-right" />
            </button>
          </div>
        )}
      </section>

    </div>
  );
}