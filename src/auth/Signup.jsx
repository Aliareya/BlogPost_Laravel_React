import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 2️⃣ Save name in Auth profile
      await updateProfile(user, {
        displayName: formData.displayName
      });

      // 3️⃣ Save user in Firestore (DATABASE)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.displayName,
        email: formData.email,
        createdAt: new Date()
      });

      toast.success("User saved successfully");

      // reset form
      setFormData({
        displayName: "",
        email: "",
        password: ""
      });

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Sign Up</h1>

        {/* Name */}
        <input
          type="text"
          name="displayName"
          placeholder="Full Name"
          value={formData.displayName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;