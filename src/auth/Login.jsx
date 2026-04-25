import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔐 1. Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🧠 2. Get full user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User data not found!");
        return;
      }

      const userData = userSnap.data();

      // 📦 3. Build full user object
      const fullUser = {
        uid: user.uid,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        createdAt: userData.createdAt,
      };

      console.log("FULL USER DATA:", fullUser);

      // 🧠 4. Save in Zustand
      setUser(fullUser);

      // 💾 5. Local storage
      localStorage.setItem("blog_user_islogin", "1");

      // ✅ success message
      toast.success("Login successful");

      // 🚀 redirect
      navigate("/");

    } catch (error) {
      console.log(error.message);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-md p-8 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Welcome back
          </h1>
          <p className="text-stone-600">
            Sign in to continue reading and writing.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-amber-800 text-white py-2 rounded-lg"
          >
            Sign in
          </button>

        </form>

        {/* Footer */}
        <div className="text-center text-stone-600">
          New here?{" "}
          <a href="/signup" className="text-amber-800 font-medium">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;