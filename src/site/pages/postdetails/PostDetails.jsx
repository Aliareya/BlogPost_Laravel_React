import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const PostDetails = () => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      date: 'almost 3 years ago',
      text: 'Great article! Very informative.',
      likes: 5,
      replies: []
    },
    {
      id: 2,
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: 'almost 3 years ago',
      text: 'I learned a lot from this. Thanks for sharing!',
      likes: 3,
      replies: []
    },
    {
      id: 3,
      author: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      date: 'less than a minute ago',
      text: '',
      likes: 0,
      replies: []
    }
  ]);
  
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ['👍', '❤️', '😂', '🎉', '🔥', '👏'];

  const handlePostComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        date: 'just now',
        text: commentText,
        likes: 0,
        replies: []
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const handleReply = (commentId) => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        author: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        date: 'just now',
        text: replyText
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      ));
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleDeleteComment = (commentId, isReply = false, parentCommentId = null) => {
    if (isReply && parentCommentId) {
      setComments(comments.map(comment => 
        comment.id === parentCommentId
          ? { ...comment, replies: comment.replies.filter(reply => reply.id !== commentId) }
          : comment
      ));
    } else {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const addEmoji = (emoji) => {
    setCommentText(commentText + emoji);
    setShowEmojiPicker(false);
  };

  // Scroll animation on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const articleContent = `# The Future of Web Development

Web development has come a long way since the early days of static HTML pages. Today, we're seeing a rapid evolution in how websites and web applications are built, deployed, and maintained.

## The Rise of JAMstack

JAMstack architecture has gained significant popularity in recent years. By decoupling the frontend from the backend, developers can create faster, more secure websites that are easier to scale.

## AI-Powered Development

Artificial intelligence is transforming how we build software. From code completion to automated testing, AI tools are helping developers work more efficiently and with fewer errors.

## WebAssembly

WebAssembly (Wasm) is enabling high-performance applications in the browser. This powerful technology allows developers to run code written in languages like C, C++, and Rust directly in the browser at near-native speeds.

## Conclusion

The future of web development looks exciting. With new tools and technologies emerging, developers have more options than ever to create fast, secure, and engaging web experiences.`;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer group">
              <h1 className="text-2xl font-bold text-blue-600 group-hover:scale-105 transition-transform">
                BlogHub
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Posts', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
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

      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=600&fit=crop" 
          alt="Blog post header" 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            The Future of Web Development
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                alt="John Doe" 
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-500">almost 3 years ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  liked 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon 
                  icon={liked ? "mdi:heart" : "mdi:heart-outline"} 
                  className={`w-5 h-5 ${liked ? 'fill-current' : ''}`}
                />
                <span className="font-medium">{likeCount}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200">
                <Icon icon="mdi:pencil" className="w-4 h-4" />
                <span className="font-medium">Edit</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200">
                <Icon icon="mdi:trash-can" className="w-4 h-4" />
                <span className="font-medium">Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 animate-fadeIn animation-delay-200">
          {articleContent.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            return <p key={index} className="leading-relaxed">{paragraph}</p>;
          })}
        </div>

        {/* Comments Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 animate-fadeIn animation-delay-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
          
          {/* Comment Input */}
          <div className="mb-8 bg-gray-50 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
            <div className="relative">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[120px]"
              />
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <div className="relative">
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Icon icon="mdi:emoticon-happy-outline" className="w-5 h-5 text-green-600" />
                  </button>
                  
                  {showEmojiPicker && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 grid grid-cols-6 gap-1 animate-fadeIn">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => addEmoji(emoji)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button 
                onClick={handlePostComment}
                disabled={!commentText.trim()}
                className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Post Comment
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="animate-slideIn">
                <div className="flex space-x-4 group">
                  <img 
                    src={comment.avatar} 
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                          <p className="text-sm text-gray-500">{comment.date}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all duration-200"
                        >
                          <Icon icon="mdi:trash-can-outline" className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-4 ml-2">
                      <button 
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors"
                      >
                        Reply
                      </button>
                      <span className="text-sm text-gray-400">{comment.likes} likes</span>
                    </div>

                    {/* Reply Input */}
                    {replyingTo === comment.id && (
                      <div className="mt-4 ml-4 animate-fadeIn">
                        <div className="flex space-x-3">
                          <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                            alt="Current user"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[80px]"
                              autoFocus
                            />
                            <div className="mt-2 flex justify-end space-x-2">
                              <button 
                                onClick={() => setReplyingTo(null)}
                                className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={() => handleReply(comment.id)}
                                disabled={!replyText.trim()}
                                className="px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4 ml-4 pl-4 border-l-2 border-gray-200">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex space-x-3 group animate-slideIn">
                            <img 
                              src={reply.avatar} 
                              alt={reply.author}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <h5 className="font-semibold text-gray-900 text-sm">{reply.author}</h5>
                                  <p className="text-xs text-gray-500">{reply.date}</p>
                                </div>
                                <button 
                                  onClick={() => handleDeleteComment(reply.id, true, comment.id)}
                                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded transition-all"
                                >
                                  <Icon icon="mdi:trash-can-outline" className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">BlogHub</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                A place to share your thoughts, ideas, and stories with the world.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-2">
                {['Home', 'All Posts', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Account</h3>
              <ul className="space-y-2">
                {['Log in', 'Sign up', 'Dashboard'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2026 BlogHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default PostDetails;