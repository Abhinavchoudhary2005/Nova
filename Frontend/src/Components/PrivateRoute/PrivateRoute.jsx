import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../utils/auth";
import BeatLoader from "react-spinners/BeatLoader";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
    };

    authenticate();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="loader-container">
        <BeatLoader color="#53d8d8" />
      </div>
    );
  }

  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/E-commerce/Login" />
  );
};

export default PrivateRoute;
