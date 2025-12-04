import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";
import { selectLoggedInUserToken, selectUserChecked } from "../authSlice";

function ProtectedAdmin({ children }) {
  const userInfo = useSelector(selectUserInfo); 
  const user = useSelector(selectLoggedInUserToken); // Access the counter value from the Redux store
  const userChecked = useSelector(selectUserChecked)
   if (!userChecked) {
    return null; // or loading spinner
  }
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (userInfo && userInfo.role !== "admin") {  // this has been changed to userInfo from user in node last part 49.50
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children; // If the user is logged in AND is an admin:
  //   {user? children : <Redirect to="/login" />
}

export default ProtectedAdmin;
