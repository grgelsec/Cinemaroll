import { Link } from "react-router-dom";

export default function NavBar() {

  return (
    <header className="w-screen">
      <nav className="flex row w-full lg:w-full items-center justify-center mt-5 gap-x-10">
        <div className="flex row items-center text-white text-3xl gap-x-1 font-semibold ring-4 ring-indigo-500 rounded-xl p-2 hover:shadow-lg hover:shadow-white transition-sexy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
            />
          </svg>
          Cinemaroll
        </div>
        <div className="">
          <ul className="flex row space-x-3">
            <li key={'home'} className="text-white font-medium p-3 hover:opacity-100 rounded-xl opacity-70 transition duration-300 ease-in-out">
              <Link to={'/'}>Home</Link>
            </li>
            <li key={'signin'} className="text-white font-medium p-3 hover:opacity-100 rounded-xl opacity-70 transition duration-300 ease-in-out">
              <Link to={'/sign-in'}>Sign In</Link>
            </li>
            <li key={'createaccount'} className="text-white font-medium p-3 hover:opacity-100 rounded-xl opacity-70 transition duration-300 ease-in-out">
              <Link to={'/createaccount'}>Create Account</Link>
            </li>
            <li key={'films'} className="text-white font-medium p-3 hover:opacity-100 rounded-xl opacity-70 transition duration-300 ease-in-out">
              <Link to={'/films'}>Films</Link>
            </li>
            <li key={'lists'} className="text-white font-medium p-3 hover:opacity-100 rounded-xl opacity-70 transition duration-300 ease-in-out">
              <Link to={'/lists'}>Lists</Link>
            </li>
            <li key={'members'} className="text-white font-medium p-3 hover:opacity-100 rounded-xl opacity-70 transition duration-300 ease-in-out">
              <Link to={'/films'}>Members</Link>
            </li>
          </ul>
        </div>
        <form className="flex items-center gap-x-3">
          <input
            type="text"
            className="px-4 py-1 rounded-lg opacity-70 hover:opacity-100 hover:ring-4 hover:outline-none hover:border-transparent hover:ring-indigo-500 transition-sexy"
          />
          <button
            type="submit"
            className="px-2 py-1 bg-white border rounded-lg opacity-70 hover:opacity-100 hover:ring-4 hover:outline-none hover:border-transparent hover:ring-indigo-500 transition-sexy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </nav>
    </header>
  );
}
