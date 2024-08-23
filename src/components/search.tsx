import { useState } from "react";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import useMultiSearch from "../hooks/search/fetchStringSearch";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [pageNum, setPage] = useState(1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedValue(inputValue);
    setInputValue("");
  };

  const decrementPage = () => {
    if (pageNum > 0) {
      setPage((page) => page - 1);
    }
  };

  const incrementPage = () => {
    setPage((page) => page + 1);
  };

  const { filmList } = useMultiSearch(submittedValue, pageNum);
  console.log(filmList);

  return (
    <div className="">
      <NavBar></NavBar>
      <div className="flex w-full ring py-10">
        <div className="flex justify-center w-full">
          <div className="flex justify-center items-center max-w-3xl w-full rounded-full bg-lightPurp">
            <form
              className="flex row justify-center w-full rounded-full p-3 space-x-2"
              onSubmit={handleSubmit}
            >
              <button className="flex justify-center items-center w-1/12 p-4 rounded-full bg-white text-lightPurp hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              <div className="flex justify-center items-center w-10/12 rounded-full bg-white p-3">
                <input
                  type="text"
                  className="flex w-full border-b border-lightPurp hover:cursor-pointer"
                  onChange={handleInputChange}
                  value={inputValue}
                  placeholder="Search"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full max-w-full py-10 font-mono">
        <div className="max-w-5xl w-full shadow-lg space-y-3">
          {filmList.slice(0, 20).map((movie) => (
            <Link
              className="flex w-full bg-opacity-40 p-5 rounded-xl hover:opacity-60 transition-sexy space-x-2 border border-lightPurp"
              to={`/film/${movie.id}`}
            >
              <div className="flex justify-center items-center w-1/3">
                <div
                  id={`${movie.id}`}
                  className="flex sm:w-1/12 md:w-4/12 lg:w-6/12"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    id={`${movie.id}`}
                    className="hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy rounded-xl"
                  ></img>
                </div>
              </div>
              <div className="flex justify-start items-center w-2/3 text-lightPurp text-3xl space-x-3">
                <p className="">{movie.title}</p>
                <span className="text-white text-sm mt-3">
                  ({movie.release_date})
                </span>
              </div>
            </Link>
          ))}
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
      </div>
    </div>
  );
}
