import React, { useContext } from "react";
import { authContext } from "../AuthContext";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    auth?.logIn();
    navigate({ to: "/" });
  };

  return (
    <div className="flex justify-center pt-16">
      <button
        onClick={handleLogin}
        className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Click to Log In
      </button>
    </div>
  );
};

export default Login;
