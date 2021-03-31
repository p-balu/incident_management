import React, { createContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import Loader from "react-loader-spinner";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoading(true);
    });
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div className="loaderDiv">
          <Loader
            type="Puff"
            className="loader"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
