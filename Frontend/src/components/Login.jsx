import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Particles from "./ui/particles";
import ShineBorder from "./ui/ShineBorder";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        credentials: 'include', // Add this line to enable cookies
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store user info in localStorage
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);

      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={70}
        color="#ffffff"
        refresh={false}
      />
      <ShineBorder
        borderRadius={12}
        borderWidth={2}
        duration={10}
        color={["#ffffff", "#6366f1", "#ffffff"]}
      >
        <div className="relative max-w-md w-full bg-black backdrop-blur-sm p-8 rounded-lg shadow-[0_0_100px_rgba(255,255,255,0.2)]">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Login to your account
            </h2>
          </div>

          {success && (
            <div className="mt-6 bg-green-900/30 border border-green-500 text-green-200 px-4 py-3 rounded relative">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-white focus:ring-white focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-white focus:ring-white focus:ring-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border-2 border-white rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-white hover:text-gray-200">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </ShineBorder>
    </div>
  );
};

export default Login;