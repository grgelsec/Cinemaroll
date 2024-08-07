import { useState } from "react";
import NavBar from "./navbar";
import useMovies from "../hooks/fetchMovies";
import { Link, useParams } from "react-router-dom";
import useSearchMovies from "../hooks/fetchSearchMovie";
import useRecommended from "../hooks/fetchRecommended";

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

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const elementID = event.currentTarget.id;
    return <p className="text-white">{elementID}</p>;
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
                    id={`${movie.id}`}
                    className="flex items-center lg:w-2/12 md:w-3/12 sm:w-4/12 xs:w-1/12 mt-3"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      id={`${movie.id}`}
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
                        fillRule="evenodd"
                        d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                        clipRule="evenodd"
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
                        fillRule="evenodd"
                        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                        clipRule="evenodd"
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
//what if i make the sky blue ring's background codblack and then do a gradient
export function Film() {
  const params = useParams();
  const scopedMovie = params.movieID;
  //this is how you have to grab an endpoint if you are returning a single object
  const { filmInfo } = useSearchMovies(scopedMovie);
  const { recommendedList } = useRecommended(scopedMovie);
  console.log(recommendedList);
  console.log(filmInfo);

  return (
    <div className="hide-scrollbar">
      <div
        className={"bg-fixed bg-center bg-no-repeat bg-cover w-screen absolute"}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500/${filmInfo?.backdrop_path})`,
        }}
      >
        <div>
          <NavBar></NavBar>
          <div className="flex justify-center w-screen text-white ring-2 ring-red-500 mt-5">
            <div className="flex justify-center bg-white/10 backdrop-blur-md rounded-lg w-4/12 p-5">
              <p className="flex text-white font-bold lg:text-2xl md:text-lg sm:text-md ring-2 ring-white">
                {filmInfo?.original_title}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center w-screen ring-2 ring-white mt-10">
            <div className="flex flex-wrap self-start justify-center ring-2 ring-green-500">
              <div className="flex justify-center space-x-5 lg:w-8/12 md:w-8/12 ring-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${filmInfo?.poster_path}`}
                  className="rounded-xl ring-2 ring-green-500"
                ></img>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 w-2/3 p-10 text-white font-sans">
              <div className="md:w-1/3 bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-300">{filmInfo?.overview}</p>
              </div>
              <div className="md:w-1/2 bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-purple-300 font-medium">Release Date</p>
                    <p>{filmInfo?.release_date}</p>
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium">
                      Original Language
                    </p>
                    <p>{filmInfo?.original_language}</p>
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium">
                      Origin Country
                    </p>
                    <p>{filmInfo?.origin_country}</p>
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium">Runtime</p>
                    <p>{filmInfo?.runtime} minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-screen p-5 ring-4 ring-green-500">
            <div className="flex flex-wrap justify-center p-5 w-2/3 bg-white/10 backdrop-blur-md rounded-lg ring-2">
              <h2 className="text-2xl text-white font-semibold mb-4">
                If you like {filmInfo?.original_title}...
              </h2>
              <div className="flex flex-wrap flex-row justify-center space-x-5 ring-2">
                {recommendedList.slice(0, 5).map((movie) => (
                  <Link
                    to={`/film/${movie.id}`}
                    id={`${movie.id}`}
                    className="flex items-center lg:w-2/12 md:w-2/12"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      id={`${movie.id}`}
                      className="hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy rounded-xl"
                    ></img>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
