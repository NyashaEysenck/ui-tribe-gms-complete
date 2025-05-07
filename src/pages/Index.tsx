
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Display any redirected messages to provide system feedback
    if (location.state?.message) {
      toast.success(location.state.message);
      
      // Clean up the location state after showing the message
      navigate("/", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  return <LandingPage />;
};

export default Index;
