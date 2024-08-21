/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "./navbar";
import useMovies from "../hooks/fetchMovies";
import useMultipleMovieData from "../hooks/fetchListContainingMovieID";
import useListDetails from "../hooks/fetchListDetails";
import useSinlgeListDetails from "../hooks/fetchSingleListDetails";

export default function BrowseLists() {
  //keeps track of page #
  const [pageNum, setPage] = useState(1);

  //contains all latest movies
  const { filmList } = useMovies(pageNum);

  // contains list details (created_by, description, item_count)
  // takes page # and listID

  // goes back one page
  const decrementPage = () => {
    if (pageNum > 0) {
      setPage((page) => page - 1);
    }
  };
  // go foward one page
  const incrementPage = () => {
    setPage((page) => page + 1);
  };

  // array of movie ids that need to be used to find lists containing the movie id
  const movieIds: number[] = useMemo(
    () => filmList.map((movie) => movie.id),
    [filmList]
  );
  console.log(movieIds);

  const { multipleMovieLists } = useMultipleMovieData(movieIds);
  // useMemo keeps this from re-calculating everytime something is change by remebering the results of the api call,
  // and only re-calculating when the dependencies change
  // so if the page number changes then this is recalled
  const listIds: number[] = useMemo(
    () => multipleMovieLists.slice(0, 10).map((list) => list.id),
    [multipleMovieLists]
  );

  console.log(listIds);

  const { listDetails } = useListDetails(listIds);
  const listInfo = listDetails.map((listest) => listest);
  console.log(listInfo);

  //problem fixed: first render, useMovies is called and results are saved to the state which triggers a re-render
  // second  re-render triggered the second api call which saves to the state causing another re-reder
  // the last re-render restarted the whole process which is why each repeated result returned the first data.

  return (
    <div className="hide-scrollbar mb-10">
      <NavBar></NavBar>
      <header className="flex py-6 justify-center">
        <h1 className="text-whitePurp font-extrabold text-3xl border-b font-mono">
          Lists
        </h1>
      </header>
      <div className="flex justify-center col-2-start flex-wrap w-full space-x-5 p-5">
        <div className="flex flex-wrap justify-center w-2/3 md:w-1/3 space-y-4 mb-5">
          {listInfo.slice(0, 10).map((list) => (
            <Link
              className="flex flex-row w-full bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-5 space-x-3 self-starthover:opacity-50 
              hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy"
              to={`/list/${list.id}`}
            >
              <div className="flex flex-wrap w-full space-y-2 border-b =">
                <p className="w-full text-lightPurp font-semibold">
                  {list.created_by}
                </p>
                <p className="flex font-semibold justify-center w-full text-gray-300">
                  {list.name}
                </p>
                <p className="flex justify-center w-full text-gray-300">
                  {list.description}
                </p>
                <p className="flex justify-end text-sm w-full text-gray-300">
                  {list.item_count} Movies
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap col justify-center w-2/3 md:w-1/3 space-y-4 self-start">
          <div className="w-full justify-center bg-whitePurp backdrop-blur-md rounded-lg p-5">
            <h2 className="flex justify-center text-lightPurp text-xl font-semibold mb-4 w-full">
              What are Lists?
            </h2>
            <p className="flex justify-center font-mono text-black">
              Lists are a way for you to show what you have been watching or
              make groups of films that you think go together.
            </p>
          </div>
          <div className="w-full justify-center bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-5">
            <h2 className="flex justify-center text-lightPurp text-xl font-semibold mb-4 w-full">
              Trending Movies
            </h2>
            <div className="flex flex-wrap justify-center space-x-2 w-full">
              {filmList.slice(0, 12).map((movie) => (
                <Link
                  to={`/film/${movie.id}`}
                  id={`${movie.id}`}
                  className="flex sm:w-1/12 md:w-2/12 lg:w-3/12 mt-3"
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
    </div>
  );
}

export function ListPage() {
  const params = useParams();
  const scopedList = params.listID;
  console.log(scopedList);
  const { singleListDetails } = useSinlgeListDetails(scopedList);
  console.log(singleListDetails);
  console.log(
    singleListDetails?.items.slice(0, 20).map((movie) => movie.poster_path)
  );
  return (
    <>
      <NavBar></NavBar>
      <div className="flex w-full justify-center my-5">
        <h2 className="flex w-1/3 p-5 justify-center text-white font-semibold text-2xl bg-white/10 backdrop-blur-md shadow-lg rounded-lg">
          {singleListDetails?.name}
        </h2>
      </div>
      <div className="flex justify-center flex-wrap">
        <div className="flex justify-center w-full md:w-2/3 p-2 space-x-5 ring">
          <div className="flex justify-center items-center flex-wrap w-1/3 p-5 bg-white/10 backdrop-blur-md shadow-lg rounded-lg space-x-2 font-mono ring">
            <p className="text-lightPurp text-sm">Description:</p>
            <div className="text-white">
              {(() => {
                if (singleListDetails?.description == "") {
                  return <p>empty</p>;
                } else {
                  return <p>{singleListDetails?.description}</p>;
                }
              })()}
            </div>
          </div>
          <div className="flex justify-center items-center w-2/3 bg-white/10 backdrop-blur-md shadow-lg rounded-lg space-x-3 md:space-x-10 font-mono text-xs">
            <div className="flex justify-center flex-wrap space-x-1">
              <p className="text-lightPurp">Created by:</p>
              <p className="text-white">{singleListDetails?.created_by}</p>
            </div>
            <div className="flex justify-center flex-wrap space-x-1">
              <p className="text-lightPurp">Movies:</p>
              <p className="text-white">{singleListDetails?.item_count}</p>
            </div>
            <div className="flex justify-center flex-wrap space-x-1">
              <p className="text-lightPurp">Pages:</p>
              <p className="text-white">{singleListDetails?.total_pages}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full md:w-2/3 p-5">
          <div className="flex justify-center flex-wrap gap-3 p-5 bg-white/10 backdrop-blur-md rounded-lg">
            {singleListDetails?.items.slice(0, 20).map((movie) => (
              <Link
                to={`/film/${movie.id}`}
                id={`${movie.id}`}
                className="w-4/12 md:w-2/12 lg:w-2/12"
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
    </>
  );
}
