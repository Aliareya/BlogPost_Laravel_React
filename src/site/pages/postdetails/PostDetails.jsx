import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(67);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=1",
      text: "Great article! Really helped me understand React performance optimization better.",
      date: "2026-03-16",
      likes: 12,
      liked: false,
      replies: [
        {
          id: 11,
          author: "Alex Chen",
          avatar: "https://i.pravatar.cc/150?u=2",
          text: "Thanks John! Glad you found it helpful.",
          date: "2026-03-16",
          likes: 3,
          liked: false,
        },
      ],
    },
    {
      id: 2,
      author: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?u=3",
      text: "Could you write more about code splitting? I'd love to see practical examples.",
      date: "2026-03-15",
      likes: 8,
      liked: false,
      replies: [],
    },
    {
      id: 3,
      author: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?u=4",
      text: "This is exactly what I needed for my current project. Bookmarked!",
      date: "2026-03-14",
      likes: 5,
      liked: false,
      replies: [],
    },
  ]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Dummy post data (in real app, fetch from API)
  const post = {
    id: 3,
    title: "React Performance Tips",
    desc: "Optimize your React apps with memoization, code splitting, and lazy loading.",
    category: "Tech",
    date: "2026-03-10",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/tech2/800/400",
    author: "Alex Chen",
    authorAvatar: "https://i.pravatar.cc/150?u=2",
    authorRole: "Senior Developer",
    content: `
      <p>React is fast by default, but as your application grows, you may encounter performance issues. In this comprehensive guide, we'll explore proven techniques to optimize your React applications.</p>
      
      <h3>1. Use React.memo for Component Memoization</h3>
      <p>React.memo is a higher-order component that prevents unnecessary re-renders by memoizing the rendered output. This is particularly useful for components that render the same output given the same props.</p>
      
      <h3>2. Implement Code Splitting with React.lazy</h3>
      <p>Code splitting allows you to split your code into smaller chunks that can be loaded on demand. This reduces the initial bundle size and improves load times.</p>
      
      <h3>3. Optimize Images and Assets</h3>
      <p>Large images and assets can significantly slow down your application. Use modern image formats like WebP, implement lazy loading, and consider using a CDN.</p>
      
      <h3>4. Use useCallback and useMemo</h3>
      <p>These hooks help prevent unnecessary re-renders by memoizing functions and values. Use them wisely to avoid performance degradation.</p>
      
      <h3>5. Virtualize Long Lists</h3>
      <p>For applications displaying large lists, consider using libraries like react-window or react-virtualized to render only the visible items.</p>
    `,
    likes: 67,
    comments: 23,
    tags: ["React", "Performance", "JavaScript", "Web Development"],
  };

  // Related posts
  const relatedPosts = [
    {
      id: 1,
      title: "Modern Web Development",
      image: "https://picsum.photos/seed/tech1/300/200",
      category: "Tech",
      date: "2026-03-15",
    },
    {
      id: 7,
      title: "TypeScript Best Practices",
      image: "https://picsum.photos/seed/tech3/300/200",
      category: "Tech",
      date: "2026-03-01",
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      image: "https://picsum.photos/seed/design1/300/200",
      category: "Design",
      date: "2026-03-12",
    },
  ];

  // Handlers
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "You",
      avatar: "https://i.pravatar.cc/150?u=you",
      text: commentText,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      liked: false,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      author: "You",
      avatar: "https://i.pravatar.cc/150?u=you",
      text: replyText,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      liked: false,
    };

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  const handleLikeComment = (commentId, replyId = null) => {
    setComments(
      comments.map((comment) => {
        if (replyId) {
          // Like a reply
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      liked: !reply.liked,
                      likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                    }
                  : reply
              ),
            };
          }
        } else {
          // Like a comment
          if (comment.id === commentId) {
            return {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            };
          }
        }
        return comment;
      })
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Comment Component
  const CommentItem = ({ comment, isReply = false }) => {
    const [showReplies, setShowReplies] = useState(true);

    return (
      <div className={`${isReply ? "ml-12 mt-4 " : ""}`}>
        <div className="flex gap-3">
          <img
            src={comment.avatar}
            alt={comment.author}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 ">
            <div className="bg-[#d9d7d5] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                  <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                </div>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
            
            <div className="flex items-center gap-4 mt-2 ml-2">
              <button
                onClick={() => handleLikeComment(comment.id, null)}
                className={`flex items-center gap-1 text-sm font-medium transition ${
                  comment.liked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-500 hover:text-red-500"
                }`}
              >
                <Icon
                  icon={comment.liked ? "mdi:heart" : "mdi:heart-outline"}
                  className={`text-sm ${comment.liked ? "fill-current" : ""}`}
                />
                {comment.likes}
              </button>
              
              {!isReply && (
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 font-medium transition"
                >
                  <Icon icon="mdi:reply" className="text-sm" />
                  Reply
                </button>
              )}
            </div>

            {/* Reply Form */}
            {replyingTo === comment.id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddReply(comment.id);
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Cancel
                </button>
              </form>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">
                {!showReplies ? (
                  <button
                    onClick={() => setShowReplies(true)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Show {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setShowReplies(false)}
                      className="text-blue-600 text-sm font-medium hover:underline mb-2"
                    >
                      Hide replies
                    </button>
                    {comment.replies.map((reply) => (
                      <CommentItem key={reply.id} comment={reply} isReply={true} />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">


      {/* ================= POST CONTENT ================= */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/posts")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 font-medium transition"
        >
          <Icon icon="mdi:arrow-left" />
          Back to Posts
        </button>

        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">{formatDate(post.date)}</span>
          <span className="text-gray-500 text-sm">•</span>
          <span className="text-gray-500 text-sm">{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{post.author}</h3>
            <p className="text-sm text-gray-500">{post.authorRole}</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-72 object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-8 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 cursor-pointer transition"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Engagement Bar */}
        <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 mb-8">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                liked
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon
                icon={liked ? "mdi:heart" : "mdi:heart-outline"}
                className={`text-xl ${liked ? "fill-current" : ""}`}
              />
              {likeCount} Likes
            </button>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Icon icon="mdi:comment-outline" className="text-xl" />
              <span className="font-medium">{comments.length} Comments</span>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">
            <Icon icon="mdi:share-variant" className="text-xl" />
            Share
          </button>
        </div>

        {/* ================= COMMENTS SECTION ================= */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex gap-3">
              <img
                src="https://i.pravatar.cc/150?u=you"
                alt="Your avatar"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </section>
      </article>

      {/* ================= RELATED POSTS ================= */}
      <section className="bg-white border-t py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/post/${relatedPost.id}`)}
              >
                <div className="h-48 rounded-xl overflow-hidden mb-3">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <span className="text-xs font-medium text-blue-600">
                  {relatedPost.category}
                </span>
                <h3 className="font-semibold text-gray-800 mt-1 group-hover:text-blue-600 transition line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(relatedPost.date)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto py-8 px-4 text-center text-gray-500 text-sm">
          © 2026 MyBlog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}