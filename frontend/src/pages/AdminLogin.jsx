import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminLogin() {
  const location = useLocation();
  const from = location.state?.from || "/admin/dashboard";
  return <Navigate to="/login" replace state={{ from }} />;
}
