import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Particles from "./ui/particles";
import ShineBorder from "./ui/ShineBorder";

const SignUp = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (phone.length !== 10) {
      return "Phone number must be 10 digits";
    }
    return "";
  };

  const validatePasswords = () => {
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phoneNumber);
    const passwordError = validatePasswords();

    setValidationErrors({
      email: emailError,
      phoneNumber: phoneError,
      password: passwordError,
    });

    if (emailError || phoneError || passwordError) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/login", {
        state: { message: "Registration successful! Please login." },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numbersOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
      password: name.includes("password") ? "" : prev.password,
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
              Create your trading account
            </h2>
          </div>

          {error && (
            <div className="mt-6 bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Form fields remain the same until password section */}

            <div className="rounded-md space-y-4">
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-white focus:ring-white focus:ring-2"
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
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
                  className={`mt-1 block w-full px-3 py-2 bg-black/50 border ${
                    validationErrors.email
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-md text-white placeholder-gray-500 focus:border-white focus:ring-white focus:ring-2`}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Password fields */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
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
                  className={`mt-1 block w-full px-3 py-2 bg-black/50 border ${
                    validationErrors.password
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-md text-white placeholder-gray-500 focus:border-white focus:ring-white focus:ring-2`}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 bg-black/50 border ${
                    validationErrors.password
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-md text-white placeholder-gray-500 focus:border-white focus:ring-white focus:ring-2`}
                />
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.password}
                  </p>
                )}
              </div>

              {/* Phone Number field */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  placeholder="Enter your mobile number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 bg-black/50 border ${
                    validationErrors.phoneNumber
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-md text-white placeholder-gray-500 focus:border-white focus:ring-white focus:ring-2`}
                />
                {validationErrors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border-2 border-white rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-white hover:text-gray-200"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </ShineBorder>
    </div>
  );
};

export default SignUp;
