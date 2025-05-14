
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-au-neutral-100 w-full px-4">
      <div className="text-center p-6 max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-red-100 p-5 inline-flex items-center justify-center">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-10 text-center mx-auto max-w-sm">
          We couldn't find the page you were looking for. The page may have been moved, 
          deleted, or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
