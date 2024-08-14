import NavBar from "./navbar";
import { Link } from "react-router-dom";
import deleteSessionID from "../hooks/deleteSessionID";

export default function Profile() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="flex flex-wrap justify-center w-full py-10 mt-5">
        <div className="">
          <Link
            to={`http://localhost:5173/`}
            className="flex flex-wrap p-3 text-white bg-mediumPurp font-mono rounded-lg"
            onClick={() => deleteSessionID()}
          >
            Log Out
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-full ring-white">
        <div className="flex justify-center w-2/12 rounded-full space-x-2 font-mono text-lightPurp bg-white/10 transition-sexy py-2">
          <button className="w-1/3 rounded-full transition-sexy focus:bg-white/10 focus:backdrop-blur-md py-1">
            Films
          </button>
          <button className="w-1/3 rounded-full focus:bg-white/10 focus:backdrop-blur-md">
            Lists
          </button>
        </div>
      </div>
    </div>
  );
}
