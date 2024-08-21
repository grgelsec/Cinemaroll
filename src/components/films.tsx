import { useState } from "react";
import NavBar from "./navbar";
import useMovies from "../hooks/fetchMovies";
import { Link, useParams } from "react-router-dom";
import useSearchMovies from "../hooks/fetchSearchMovie";
import useRecommended from "../hooks/fetchRecommended";
import useReviews from "../hooks/fetchReviews";

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
          <body className="flex col justify-center flex-wrap">
            <div className="flex col flex-wrap justify-center text-xl text-whitePurp w-2/3 bg-white/10 backdrop-blur-md rounded-lg">
              <h1 className="font-extrabold"></h1>
              <div className="flex flex-wrap justify-center gap-3 p-6">
                {filmList.slice(0, 20).map((movie) => (
                  <Link
                    to={`/film/${movie.id}`}
                    id={`${movie.id}`}
                    className="flex items-center w-3/12 md:w-3/12 lg:w-2/12"
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
            <div className="w-full p-3 mt-4">
              <div className="flex justify-center space-x-2 text-white">
                <button
                  onClick={() => decrementPage()}
                  className="hover:text-lightPurp p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => incrementPage()}
                  className="hover:text-lightPurp p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="flex justify-center text-white font-mono text-xs mt-3">
                Page {pageNum}
              </h3>
            </div>
          </body>
        </div>
      </div>
    </>
  );
}
//what if i make the sky blue ring's background codblack and then do a gradient
export function Film() {
  const [pageNum, setPage] = useState(1);
  const params = useParams();
  const scopedMovie = params.movieID;
  //this is how you have to grab an endpoint if you are returning a single object
  const { filmInfo } = useSearchMovies(scopedMovie);
  const { recommendedList } = useRecommended(scopedMovie);
  const { reviewList } = useReviews(scopedMovie, pageNum);
  console.log(recommendedList);
  console.log(filmInfo);
  console.log(reviewList);

  const decrementPage = () => {
    if (pageNum > 0) {
      setPage((page) => page - 1);
    }
  };

  const incrementPage = () => {
    if (reviewList.length % 10 != 0) {
      setPage((page) => page + 1);
    }
  };

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
          <div className="flex justify-center w-screen text-white mt-5">
            <div className="flex justify-center bg-white/10 backdrop-blur-md rounded-lg w-4/12 p-5">
              <p className="flex text-white font-bold lg:text-2xl md:text-lg sm:text-md">
                {filmInfo?.original_title}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center w-full mt-5  p-5">
            <div className="flex flex-wrap self-start justify-center ">
              <div className="flex justify-center space-x-5 w-10/12 md:w-8/12 lg:w-8/12 ">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${filmInfo?.poster_path}`}
                  className="rounded-xl"
                ></img>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row gap-8 w-2/3 p-5 text-white font-sans ">
              <div className="md:w-2/3 bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg ">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-300">{filmInfo?.overview}</p>
              </div>
              <div className="md:w-1/3 bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
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
                  <div>
                    <p className="text-purple-300 font-medium">Rating</p>
                    <p>{Math.floor(filmInfo?.vote_average)}/10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-screen p-5 space-x-5">
            <div className="flex flex-wrap justify-center p-5 w-2/3 bg-white/10 backdrop-blur-md rounded-lg">
              <h2 className="text-2xl text-white font-semibold">
                If you like {filmInfo?.original_title}...
              </h2>
              <div className="flex flex-wrap justify-center gap-3 mt-3">
                {recommendedList.slice(0, 6).map((movie) => (
                  <Link
                    to={`/film/${movie.id}`}
                    id={`${movie.id}`}
                    className="flex justify-center mt-1 w-5/12 md:w-3/12 lg:w-3/12"
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
          <div className="flex justify-center w-screen mb-5">
            <div className="flex flex-wrap justify-center w-9/12 bg-white/10 backdrop-blur-md rounded-lg p-5">
              <h2 className="text-2xl text-white font-semibold mb-4">
                Reviews
              </h2>
              <div className="flex flex-wrap justify-center w-full p-5">
                {reviewList.slice(0, 10).map((review) => (
                  <div className="flex flex-wrap w-full p-5 space-y-4 border-b justify-start text-white">
                    <h2 className="flex justify-start text-md text-lightPurp  w-full">
                      {review.author_details.username} -{" "}
                      {review.author_details.rating}/10
                    </h2>
                    <p className="flex justify-center text-gray-300 w-full">
                      {review.content}
                    </p>
                    <h2 className="flex justify-end text-sm text-lightPurp font-semibold w-full">
                      {review.created_at.slice(0, 10)}
                    </h2>
                  </div>
                ))}
              </div>
              <div className="flex justify-end w-full p-5">
                <div className="flex justify-center space-x-2 text-white">
                  <button
                    onClick={() => decrementPage()}
                    className="hover:text-lightPurp p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => incrementPage()}
                    className="hover:text-lightPurp p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
