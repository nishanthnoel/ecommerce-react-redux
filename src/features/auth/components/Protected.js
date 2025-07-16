import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../authSlice";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUserToken); // Access the counter value from the Redux store
  if(!user){
      return <Navigate to= "/login" replace={true} ></Navigate>
  }
  return children;
//   {user? children : <Redirect to="/login" />
}

export default Protected;
