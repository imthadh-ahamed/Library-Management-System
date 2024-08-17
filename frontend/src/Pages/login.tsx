import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../UI/Index";
import { Link } from "react-router-dom";
import axios from "axios";

// Define the props for the Login component
interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const LoginPage: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the default form submission
    e.preventDefault();
    setErrorMessage("");
    setErrors({});

    console.log({ email, password });

    // Validate the form fields
    let formIsValid = true;
    // Create a new errors object
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
      try {
        const response = await axios.post(
          "https://localhost:7105/api/users/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          // Extract the JWT from the response
          const { token } = response.data;
          // Save the JWT to localStorage
          localStorage.setItem("token", token);
          setIsAuthenticated(true);
          navigate("/home");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data); // Logs the error message from the server
          console.log(error.response.status); // Logs the status code
          console.log(error.response.headers); // Logs the response headers
          setErrorMessage(
            // Set the error message state variable
            error.response.data.message ||
              "Invalid email or password. Please try again."
          );
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
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
