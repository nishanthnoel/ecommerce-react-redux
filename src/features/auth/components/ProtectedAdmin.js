import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser); // Access the counter value from the Redux store
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children; // If the user is logged in AND is an admin:
  //   {user? children : <Redirect to="/login" />
}

export default ProtectedAdmin;
