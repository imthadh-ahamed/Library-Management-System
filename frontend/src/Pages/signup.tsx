import React, { FC, useState } from "react";
import axios from "axios";
import { Label, Input, Button } from "../UI/Index";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  // Validate the form fields
  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    return newErrors;
  };

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form fields
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // If there are errors, set the errors state variable and return
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7105/api/users/register",
        {
          Email: email, // Ensure casing matches the API
          Password: password, // Ensure casing matches the API
        }
      );

      if (response.status === 200) {
        alert("Account Created");
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle API errors
        setErrors({ email: error.response.data.message || "Signup failed" });
      } else {
        // Handle other errors
        setErrors({ email: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Library Management System</h1>
          <p className="text-muted-foreground">
            Create an account to manage your library.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
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
            Sign Up
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
