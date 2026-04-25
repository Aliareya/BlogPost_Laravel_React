import React from 'react';
import { getDocs , collection } from 'firebase/firestore';
import { db } from '../../config/Firebase';



// Hero Component
const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-orange-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-sm font-medium">Welcome to Inkwell</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Stories that <span className="text-orange-500 italic">inspire</span> &amp; inform
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Discover thoughtful writing on technology, design, lifestyle and more. Fresh perspectives, curated for curious minds.
            </p>
            
            <div className="flex gap-4 pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors">
                Read Posts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-6 py-3 rounded-full font-medium transition-colors">
                About Us
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-orange-200 rounded-3xl transform rotate-3 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=600&fit=crop" 
              alt="Open book with candlelight" 
              className="relative rounded-3xl z-10 shadow-2xl w-full object-cover h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Post Component
const FeaturedPost = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Featured</h2>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-64 md:h-full">
              <img 
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop" 
                alt="Minimalist desk setup" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Design</span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Apr 15, 2026
                </span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                The Art of Minimalist Design in 2026
              </h3>
              
              <p className="text-gray-600 mb-6">
                Exploring how less truly becomes more in modern digital design. A deep dive into principles that shape the best interfaces.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600">Sarah Chen</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Post Card Component
const PostCard = ({ image, category, date, title, excerpt, author, likes }) => {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{category}</span>
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </span>
        </div>
        
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-600">{author}</span>
          <div className="flex items-center gap-1 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">{likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

// Recent Posts Component
const RecentPosts = () => {
  const posts = [
    {
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
      category: "Lifestyle",
      date: "Apr 15, 2026",
      title: "Building Creative Habits That Last",
      excerpt: "Creativity isn't a gift — it's a practice. Here are proven strategies to make creativity a...",
      author: "Marcus Rivera",
      likes: 8
    },
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      category: "Travel",
      date: "Apr 15, 2026",
      title: "Hidden Gems: Mountain Towns Worth Visiting",
      excerpt: "Skip the crowded tourist traps. These quiet mountain towns offer breathtaking scenery...",
      author: "Elena Vasquez",
      likes: 15
    },
    {
      image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=600&h=400&fit=crop",
      category: "Food",
      date: "Apr 15, 2026",
      title: "Simple Recipes for Busy Weeknights",
      excerpt: "Delicious meals that come together in under 30 minutes. Perfect for when life gets hecti...",
      author: "James Park",
      likes: 6
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Recent Posts</h2>
          <a href="#" className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1">
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};


// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <button onClick={()=>getPosts()}>Click</button>
      <Hero />
      <FeaturedPost />
      <RecentPosts />
    </div>
  );
};

export default Home;