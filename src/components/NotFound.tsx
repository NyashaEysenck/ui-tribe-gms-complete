
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound: React.FC = () => {
  let isAuthenticated = false;
  
  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
  } catch (error) {
    console.error("Auth context error in NotFound:", error);
    // Assume not authenticated if context error
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-au-neutral-100" aria-labelledby="error-title" role="alert">
      <div className="text-center p-6 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-red-100 p-4">
            <AlertTriangle className="h-16 w-16 text-red-500" aria-hidden="true" />
          </div>
        </div>
        <h1 id="error-title" className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-au-purple hover:bg-au-purple-dark">
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
              {isAuthenticated ? "Back to Dashboard" : "Back to Home"}
            </Link>
          </Button>
          {!isAuthenticated && (
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
