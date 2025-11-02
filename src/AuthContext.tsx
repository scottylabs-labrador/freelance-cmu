// src/AuthContext.tsx

import React, { createContext, useState, ReactNode } from "react";

// The type interface remains the same
interface authContextType {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

// The context export remains the same
export const authContext = createContext<authContextType | null>(null);

// --- ADD THIS ---
// Create the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => {
    // In a real app, you'd do validation here
    console.log("User logged in");
    setIsLoggedIn(true);
  };

  const logOut = () => {
    console.log("User logged out");
    setIsLoggedIn(false);
  };

  // Pass the state and functions to all children
  return (
    <authContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};
