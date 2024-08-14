// Desc: Sign up page for the library management system
import { FC } from "react";
import { Label, Input, Button } from "../UI/Index";
import { Link } from "react-router-dom";

const SignUpPage: FC = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Library Management System</h1>
          <p className="text-muted-foreground">
            Create an account to manage your library.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          {/* Link to the login page */}
          <Link to="/" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
