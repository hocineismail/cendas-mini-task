import React from "react";

import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes: React.FC = (): JSX.Element => {
  // localStorage contains the current user
  // if exist it should redirect to home page
  // if no user should sign in or signup from login page
  const username = localStorage.getItem("username");
  return username ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
