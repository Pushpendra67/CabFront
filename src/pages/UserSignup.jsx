
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { motion } from "framer-motion";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
          Join QuickRide Today 🚗
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
          Create your account and start riding with ease!
        </p>
      </motion.div>

      {/* Signup Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-12 w-full max-w-2xl mx-auto hover:shadow-green-400/10 transition-all duration-300"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            className="w-24 drop-shadow-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt="QuickRide Logo"
          />
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
          Create Account
        </h2>

        {/* Signup Form */}
        <form onSubmit={submitHandler}>
          {/* Name */}
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-white/20 w-1/2 rounded-xl px-5 py-4 border border-white/20 text-white text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-white/20 w-1/2 rounded-xl px-5 py-4 border border-white/20 text-white text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/20 mb-7 rounded-xl px-5 py-4 border border-white/20 w-full text-white text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            type="email"
            placeholder="email@example.com"
          />

          {/* Password */}
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/20 mb-7 rounded-xl px-5 py-4 border border-white/20 w-full text-white text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            type="password"
            placeholder="password"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-black font-semibold text-lg shadow-md hover:scale-[1.03] transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-400 text-base">
          Already have an account?{" "}
          <Link className="text-green-400 hover:underline" to="/login">
            Login here
          </Link>
        </p>

        {/* Captain Join */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-4 text-base">
            Want to drive with us?
          </p>
          <Link
            className="w-full p-4 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-black font-semibold text-lg shadow-md hover:scale-[1.03] transition-all duration-300"
            to="/captain-login"
          >
            Join as Captain
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSignup;
