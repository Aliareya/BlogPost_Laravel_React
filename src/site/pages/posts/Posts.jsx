import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Posts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Technology', 'Travel', 'Design', 'Business'];

  const articles = [
    {
      id: 1,
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development and digital experiences.',
      author: 'John Doe',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      articleImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      date: 'almost 3 years ago',
      likes: 42,
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Mastering CSS Grid Layout',
      excerpt: 'A comprehensive guide to using CSS Grid for modern web layouts.',
      author: 'John Doe',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      articleImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
      date: 'almost 3 years ago',
      likes: 39,
      category: 'Technology'
    },
    {
      id: 3,
      title: 'React Hooks: A Practical Guide',
      excerpt: 'Learn how to effectively use React Hooks to simplify your components and manage state.',
      author: 'Jane Smith',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      articleImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      date: 'almost 3 years ago',
      likes: 27,
      category: 'Technology'
    },
    {
      id: 4,
      title: 'Building Accessible Web Applications',
      excerpt: 'Essential practices for creating web applications that work for everyone, including users with disabilities.',
      author: 'Alex Johnson',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      articleImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      date: 'almost 3 years ago',
      likes: 19,
      category: 'Technology'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <main className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-center font-bold text-gray-900 mb-8">Explore Our Articles</h1>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon icon="mdi:magnify" className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article 
              key={article.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
            >
              {/* Article Image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={article.articleImage} 
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Author and Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={article.authorImage} 
                      alt={article.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{article.author}</p>
                      <p className="text-xs text-gray-500">{article.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Icon icon="mdi:heart" className="w-5 h-5" />
                    <span className="text-sm font-medium">{article.likes}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <Icon icon="mdi:file-search" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredArticles.length > 0 && (
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
              Load More Articles
            </button>
          </div>
        )}
      </main>

    </div>
  );
};

export default Posts;