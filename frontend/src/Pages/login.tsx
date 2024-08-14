// Desc: Login page for the library management system
import { FC } from "react";
import { Label, Input, Button } from "../UI/Index";
import { Link } from "react-router-dom";

const Login: FC = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Library Management System</h1>
          <p className="text-muted-foreground">
            Sign in to your account to manage your library.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" />
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
            Login
          </Button>
        </div>
        <div className="text-center text-sm">
          If you don't have an account?{" "}
          {/* Link to the signup page */}
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
