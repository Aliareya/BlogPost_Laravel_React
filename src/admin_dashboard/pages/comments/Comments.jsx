import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/Firebase';
import React, { useEffect, useState } from 'react';

// Page Header
const PageHeader = () => {
  return (
    <div className="mb-8">
      <div className="mb-2 text-sm text-gray-600 font-medium">Dashboard</div>
      <h1 className="text-3xl font-serif font-bold text-gray-900">Comments</h1>
    </div>
  );
};

// Category Filter
const CategoryFilter = ({ activeCategory, onCategoryChange, counts }) => {
  const categories = [
    { name: 'All', count: counts.all },
    { name: 'Positive', count: counts.positive },
    { name: 'Negative', count: counts.negative },
    { name: 'Spam', count: counts.spam }
  ];

  const categoryStyles = {
    All: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    Positive: 'bg-green-100 text-green-700 hover:bg-green-200',
    Negative: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    Spam: 'bg-red-100 text-red-700 hover:bg-red-200'
  };

  const activeStyles = {
    All: 'bg-gray-800 text-white',
    Positive: 'bg-green-600 text-white',
    Negative: 'bg-gray-600 text-white',
    Spam: 'bg-red-600 text-white'
  };

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
            activeCategory === category.name
              ? activeStyles[category.name]
              : categoryStyles[category.name]
          }`}
        >
          {category.name}
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeCategory === category.name
              ? 'bg-white/20'
              : 'bg-white/50'
          }`}>
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
};

// Table Header
const TableHeader = () => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
      <div className="col-span-2">Author</div>
      <div className="col-span-2">Post</div>
      <div className="col-span-2">Comment</div>
      <div className="col-span-2">Category</div>
      <div className="col-span-2">Status</div>
      <div className="col-span-1 text-right">Actions</div>
    </div>
  );
};

// Comment Row
const CommentRow = ({ comment, onView, onStatusChange, onCategoryChange }) => {

  const statusColors = {
    Approved: 'bg-orange-100 text-orange-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Rejected: 'bg-red-100 text-red-700'
  };

  const categoryColors = {
    Positive: 'bg-green-100 text-green-700',
    Negative: 'bg-gray-100 text-gray-700',
    Spam: 'bg-red-100 text-red-700'
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
      
      <div className="col-span-2 font-medium text-gray-900">
        {comment.name}
      </div>
      <div className="col-span-2 font-medium text-gray-900">
        {comment.post_name}
      </div>

      <div className="col-span-2 text-gray-700 truncate">
        {comment.message}
      </div>

      {/* CATEGORY */}
      <div className="col-span-2">
        <span>{comment.category}</span>
      </div>

      {/* STATUS */}
      <div className="col-span-2">
        <span>{comment.status}</span>
      </div>

      <div className="col-span-1 flex justify-end">
        <button
          onClick={() => onView(comment)}
          className="text-blue-500 hover:text-blue-700"
        >
          View
        </button>
      </div>

    </div>
  );
};

// Modal
const CommentModal = ({ comment, onClose, onPublish, onRemove }) => {
  if (!comment) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl">

        <div className="flex justify-between px-6 py-5 border-b">
          <h3 className="text-lg font-semibold">Comment Details</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-6 space-y-3">
          <p><b>Author:</b> {comment.name}</p>
          <p><b>Comment:</b> {comment.message}</p>
          <p><b>Category:</b> {comment.category}</p>
          <p><b>Status:</b> {comment.status}</p>
          {comment.category === 'negative' ?
          <p><b>Suggested Replies:</b> {comment.replays.message}</p>
          :
          <p><b>replay message:</b> {comment.replays.message}</p>
          }
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 bg-gray-50">
          <button
            onClick={() => onRemove(comment.id)}
            className="text-red-600"
          >
            Remove
          </button>

          <button
            onClick={() => onPublish(comment.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        </div>

      </div>
    </div>
  );
};

// Table Component
const CommentsTable = ({
  comments,
  activeCategory,
  setActiveCategory,
  onView,
  onStatusChange,
  onCategoryChange
}) => {

  // FIXED COUNTS
  const counts = {
    all: comments.length,
    positive: comments.filter(c => c.category?.toLowerCase() === 'positive').length,
    negative: comments.filter(c => c.category?.toLowerCase() === 'negative').length,
    spam: comments.filter(c => c.category?.toLowerCase() === 'spam').length
  };

  // FIXED FILTER (case safe)
  const filteredComments =
    activeCategory === 'All'
      ? comments
      : comments.filter(
          c => c.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <>
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        counts={counts}
      />

      <div className="bg-white rounded-xl border overflow-hidden">
        <TableHeader />

        {filteredComments.length > 0 ? (
          filteredComments.map(comment => (
            <CommentRow
              key={comment.id}
              comment={comment}
              onView={onView}
              onStatusChange={onStatusChange}
              onCategoryChange={onCategoryChange}
            />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No comments found
          </div>
        )}
      </div>
    </>
  );
};

// MAIN
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const snap = await getDocs(collection(db, "comments"));

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(data);
      setLoading(false);
      console.log(data)
    };

    fetchData();
  }, []);

  const handleStatusChange = (id, status) => {
    setComments(prev =>
      prev.map(c => c.id === id ? { ...c, status } : c)
    );
  };

  const handleCategoryChange = (id, category) => {
    setComments(prev =>
      prev.map(c => c.id === id ? { ...c, category } : c)
    );
  };

  const handlePublish = (id) => {
    setComments(prev =>
      prev.map(c => c.id === id ? { ...c, status: 'Approved' } : c)
    );
  };

  const handleRemove = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="ml-64 p-8">

        <PageHeader />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <CommentsTable
            comments={comments}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onView={setSelectedComment}
            onStatusChange={handleStatusChange}
            onCategoryChange={handleCategoryChange}
          />
        )}

        <CommentModal
          comment={selectedComment}
          onClose={() => setSelectedComment(null)}
          onPublish={handlePublish}
          onRemove={handleRemove}
        />

      </main>
    </div>
  );
};

export default Comments;