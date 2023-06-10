import React, { Navigate } from "react-router-dom";

function ProtectedRoute ({ component: Component, ...props  }) {
  return (
    props.loggedIn===true ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRoute;