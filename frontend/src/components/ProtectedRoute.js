import React, { Redirect } from "react-router-dom";

function ProtectedRoute ({ component: Component, ...props  }) {
  return (
    props.loggedIn===true ? <Component {...props} /> : <Redirect to="/sign-in"/>
)}

export default ProtectedRoute;