import { useState } from "react";
import NavBar from "./navbar";
import useMovies from "../hooks/fetchMovies";
import { Link } from "react-router-dom";

//TODO: Need buttons to change the page while simutaniusly chaging the fetched page

export default function Films() {
  const [pageNum, setPage] = useState(1);
  const { filmList } = useMovies(pageNum);

  const decrementPage = () => {
    if (pageNum > 0) {
      setPage((page) => page - 1);
    }
  };

  const incrementPage = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <NavBar></NavBar>
      <div>
        <header>
          <div className="flex justify-center py-4">
            <div className="text-3xl font-extrabold border-b text-whitePurp font-mono">
              Films
            </div>
          </div>
        </header>
        <div className="">
          <body className="flex col justify-center flex-wrap lg:px-40 md:px-20 sm:px-20 ring- ring-red-500">
            <div className="flex col flex-wrap justify-center text-xl text-whitePurp w-11/12 ring- ring-white">
              <h1 className="py-1 font-extrabold"></h1>
              <div className="flex col flex-wrap justify-center gap-3 ">
                {filmList.slice(0, 20).map((movie) => (
                  <Link
                    to={`/film/${movie.id}`}
                    className="flex items-center lg:w-2/12 md:w-3/12 sm:w-4/12 xs:w-1/12 mt-3"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      id={`${movie.title}`}
                      className="hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy rounded-xl"
                    ></img>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center gap-5 space-y-3 mb-3 flex-wrap lg:w-1/12">
                <div className="flex justify-center gap-2 space-y-3 w-8/12 lg:w-6/12 md:w-8/12 sm:w-10/12 xs:w-/12">
                  <button
                    className="flex p-2 bg-whitePurp mt-3 rounded-lg"
                    onClick={() => decrementPage()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="flex p-2 bg-whitePurp rounded-lg"
                    onClick={() => incrementPage()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <h3 className="flex font-mono text-sm">Page {pageNum}</h3>
              </div>
            </div>
          </body>
        </div>
      </div>
    </>
  );
}
