import { Link } from "react-router-dom";

export default function HomeHeader() {
  return (
    <div className="">
      <div className="flex justify-center">
        <header className="text-whitePurp font-bold text-7xl sm:text-6xl lg:p-20 md:p-10 sm:p-5 sm:px-2 my-10 ring-4 ring-indigo-500 rounded-xl transition-sexy">
          Welcome to Cinemaroll
        </header>
      </div>
      <div className="flex justify-center">
        <Link to="/createaccount" className="p-5 bg-indigo-500 rounded-xl text-whitePurp font-extrabold shadow-xl shadow-indigo-500 hover:shadow-indigo-700 transition-sexy">
          Sign up
        </Link>
      </div>
    </div>
  );
}
