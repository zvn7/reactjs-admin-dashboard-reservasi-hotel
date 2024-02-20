// ProtectedComponent.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedComponent = ({ children }) => {
  const navigate = useNavigate();

  // Check if the session token exists
  const hasToken = sessionStorage.getItem("token");

  // If no token, redirect to the logout page
  useEffect(() => {
    if (!hasToken) {
      // Redirect to the logout page or any other page
      navigate("/");
    }
  }, [hasToken, navigate]);

  // Render your protected component content if the token exists
  return hasToken ? <>{children}</> : null;
};

export default ProtectedComponent;
