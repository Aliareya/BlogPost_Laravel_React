import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { useNavigate } from "react-router-dom";

/* =========================
   PAGE HEADER
========================= */
const PageHeader = ({ postssize }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-serif font-bold text-gray-900">Posts</h1>

      <button
        onClick={() =>
          navigate(`/admin/posts/create?postssize=${postssize}`)
        }
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Post
      </button>
    </div>
  );
};

/* =========================
   TABLE HEADER
========================= */
const TableHeader = () => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
      <div className="col-span-3">Title</div>
      <div className="col-span-2">Category</div>
      <div className="col-span-2">Likes</div>
      <div className="col-span-2">Date</div>
      <div className="col-span-2 text-right">Actions</div>
    </div>
  );
};

/* =========================
   POST ROW
========================= */
const PostRow = ({ title, category, likes, date }) => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">

      <div className="col-span-3">
        <span className="font-medium text-gray-900">{title}</span>
      </div>

      <div className="col-span-2">
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {category}
        </span>
      </div>

      <div className="col-span-2 text-sm text-gray-700">
        {likes || 0}
      </div>

      <div className="col-span-2 text-sm text-gray-600">
        {date}
      </div>

      <div className="col-span-2 flex items-center justify-end gap-2">
        <button className="p-2 text-gray-400 hover:text-gray-600">👁</button>
        <button className="p-2 text-gray-400 hover:text-blue-600">✏️</button>
        <button className="p-2 text-gray-400 hover:text-red-600">🗑</button>
      </div>

    </div>
  );
};

/* =========================
   POSTS TABLE
========================= */
const PostsTable = ({ setPostsCount }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "posts"),
          orderBy("create_at", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => {
          const d = doc.data();

          return {
            id: doc.id,
            title: d.title,
            category: d.category,
            likes: d.likes,
            date: d.create_at
              ? d.create_at.toDate().toDateString()
              : "No date",
          };
        });

        setPosts(data);

        // 👇 send length to parent
        setPostsCount(data.length);

      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading posts...</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <TableHeader />

      <div className="divide-y divide-gray-100">
        {posts.length === 0 ? (
          <div className="p-6 text-gray-500">No posts found</div>
        ) : (
          posts.map((post) => (
            <PostRow key={post.id} {...post} />
          ))
        )}
      </div>
    </div>
  );
};

/* =========================
   MAIN PAGE
========================= */
const Posts = () => {
  const [postsCount, setPostsCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="ml-64">
        <div className="p-8">
          <div className="mb-2 text-sm text-gray-600 font-medium">
            Dashboard
          </div>

          {/* 👇 pass count here */}
          <PageHeader postssize={postsCount} />

          {/* 👇 update count from here */}
          <PostsTable setPostsCount={setPostsCount} />
        </div>
      </main>
    </div>
  );
};

export default Posts;