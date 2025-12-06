// src/components/header/Header.tsx

import {
  BiSolidHome,
  BiSolidPaperPlane,
  BiSolidLockOpenAlt,
  BiSolidMeh,
  BiSolidDollarCircle,
} from "react-icons/bi";
import { Link } from "@tanstack/react-router";
import { useContext } from "react"; // <-- 1. Import useContext
import { authContext } from "../../AuthContext"; // <-- 2. Import your authContext

export default function Header() {
  // 3. Get the auth state from the context
  const auth = useContext(authContext);

  // A good safety check in case the context is somehow null
  if (!auth) {
    return null; // Or a loading/fallback header
  }

  const { isLoggedIn } = auth; // 4. Destructure isLoggedIn for easier use

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-100">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex flex-row items-center">
          <h1 className="text-lg font-bold"> freelance cmu </h1>
          <BiSolidDollarCircle />
        </div>
        <div className="flex space-x-4">
          {/* This link is always visible */}
          <Link
            to="/"
            className="flex flex-row px-2 py-1 bg-gray-200 rounded items-center"
          >
            <>
              <p className="px-1 text-1xl font-bold">home</p>
              <BiSolidHome />
            </>
          </Link>

          {/* This link is always visible */}
          <Link
            to="/searchjobs"
            className="flex flex-row px-2 py-1 bg-gray-200 rounded items-center"
          >
            <>
              <p className="px-1 text-1xl font-bold">search jobs</p>
              <BiSolidPaperPlane />
            </>
          </Link>

          {/* 5. Use conditional (ternary) rendering */}
          {isLoggedIn ? (
            <>
              {/* Show these links ONLY if logged in */}
              <Link
                to="/postjob"
                className="flex flex-row px-2 py-1 bg-gray-200 rounded items-center"
              >
                <>
                  <p className="px-1 text-1xl font-bold">post job</p>
                  <BiSolidPaperPlane />
                </>
              </Link>

              <Link
                to="/profile"
                className="flex flex-row px-2 py-1 bg-gray-200 rounded items-center"
              >
                <>
                  <p className="px-1 text-1xl font-bold">profile</p>
                  <BiSolidMeh />
                </>
              </Link>
            </>
          ) : (
            <>
              {/* Show this link ONLY if NOT logged in */}
              <Link
                to="/login"
                className="flex flex-row px-2 py-1 bg-gray-200 rounded items-center"
              >
                <>
                  <p className="px-1 text-1xl font-bold">login</p>
                  <BiSolidLockOpenAlt />
                </>
              </Link>
            </>
          )}

          <div />
        </div>
      </div>
    </header>
  );
}
