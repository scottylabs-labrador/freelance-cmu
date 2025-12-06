import React, { useContext } from "react";
import { authContext } from "../AuthContext";
import { useNavigate } from "@tanstack/react-router";

const Profile = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logOut();
    navigate({ to: "/" });
  };

  return (
    <div className="flex flex-col pl-4 gap-4 pt-4">
      <div className="text-gray-900">contact info section</div>
      <div className="text-gray-900">job history</div>
      <div className="text-gray-900">payment stuff</div>
      <div className="text-gray-900">yo idk what else you do</div>
      <div className="text-gray-900">
        some edit profile method will go here eventually
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded w-32 bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
