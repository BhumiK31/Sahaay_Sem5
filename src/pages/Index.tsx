import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Default to caregiver dashboard
    navigate("/caregiver/dashboard");
  }, [navigate]);
  
  return null;
};

export default Index;
