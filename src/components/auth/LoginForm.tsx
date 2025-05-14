
import React from "react";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const LoginForm: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-au-neutral-100 w-full">
      <div className="fixed top-4 left-4 z-10">
        <Button asChild variant="ghost" size="sm" className="flex items-center gap-1">
          <Link to="/">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-md px-4">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginForm;
