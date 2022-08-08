import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/signin" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;
