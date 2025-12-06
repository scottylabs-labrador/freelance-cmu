import {
  BiSolidHome,
  BiSolidPaperPlane,
  BiSolidLockOpenAlt,
  BiSolidMeh,
  BiSolidDollarCircle,
} from "react-icons/bi";
import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-200">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex flex-row items-center">
          <h1 className="text-lg font-bold"> Freelance CMU </h1>
          <BiSolidDollarCircle />
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="flex flex-row px-2 py-1 bg-blue-400 rounded items-center"
          >
            <>
              <p className="px-1 text-1xl font-bold">Home</p>
              <BiSolidHome />
            </>
          </Link>
          <Link
            to="/postjob"
            className="flex flex-row px-2 py-1 bg-blue-400 rounded items-center"
          >
            <>
              <p className="px-1 text-1xl font-bold">Post Job</p>
              <BiSolidPaperPlane />
            </>
          </Link>

          <Link
            to="/login"
            className="flex flex-row px-2 py-1 bg-blue-400 rounded items-center"
          >
            <>
              <p className="px-1 text-1xl font-bold">Login</p>
              <BiSolidLockOpenAlt />
            </>
          </Link>

          <Link
            to="/profile"
            className="flex flex-row px-2 py-1 bg-blue-400 rounded items-center"
          >
            <>
              <p className="px-1 text-1xl font-bold">Profile</p>
              <BiSolidMeh />
            </>
          </Link>

          <div />
        </div>
      </div>
    </header>
  );
}
