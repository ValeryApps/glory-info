import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SpinnerComponent } from "../components/loader/SpinnerComponent";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { loggedInAsAdmin, loggedInAsMod, loading } = useAuthStatus();

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      {loggedInAsAdmin || loggedInAsMod ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export const UserPrivateRoute = () => {
  const { loading, loggedIn } = useAuthStatus();
  if (loading) {
    return <SpinnerComponent />;
  }
  return <div>{loggedIn ? <Outlet /> : <Navigate to="/" />}</div>;
};
