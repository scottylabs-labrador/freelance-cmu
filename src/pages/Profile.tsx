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
    <div className="flex flex-col pl-4 gap-4">
      <div>contact info section</div>
      <div>job history</div>
      <div>payment stuff</div>
      <div>yo idk what else you do</div>
      <div>some edit profile method will go here eventually</div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded w-32"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
