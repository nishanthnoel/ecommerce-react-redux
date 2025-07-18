import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken, selectUserChecked } from "../authSlice";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUserToken);
  const userChecked = useSelector(selectUserChecked);
  useEffect(() => {
    console.log("userChecked:", userChecked);
    console.log("user:", user);
  }, [userChecked, user]);

  // ✅ Wait for checkAuthAsync to finish
  if (!userChecked) {
    return null; // or loading spinner
  }

  // ✅ Only decide *after* userChecked is true
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default Protected;
