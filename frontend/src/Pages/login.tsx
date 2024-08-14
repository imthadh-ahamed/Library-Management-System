import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../UI/Index";
import { Link } from "react-router-dom";

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const LoginPage: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset error message and errors
    setErrorMessage("");
    setErrors({});

    let formIsValid = true;
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required.";
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (formIsValid) {
      // Dummy check for email and password
      if (email === "user@example.com" && password === "password123") {
        // Redirect to home page on successful login
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        // Show error message on failure
        setErrorMessage("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-2 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Library Management System
        </h1>
        <p className="text-muted-foreground text-center">
          Login to manage your library.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        {errorMessage && (
          <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
