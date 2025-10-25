import React from "react";
import { createContext } from "react";

interface authContextType {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}



export const authContext = createContext<authContextType | null>(null);

