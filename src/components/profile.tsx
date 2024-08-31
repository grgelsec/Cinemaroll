import NavBar from "./navbar";
import CreateMovieReview from "../hooks/postReview";
import useAccountRatings from "../hooks/accountInfo/fetchAccountRatings";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteMovieRating from "../hooks/accountInfo/deleteAccountRating";
import useMultiSearch from "../hooks/search/fetchStringSearch";
import useSearchMovies from "../hooks/fetchSearchMovie";
import useAccountDetails from "../hooks/accountInfo/fetchAccountInfo";
export default function Profile() {
  const [selectedOption, setSelectedOption] = useState<string>("films");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const { accountInfo } = useAccountDetails();
  console.log(accountInfo);

  return (
    <html>
      <NavBar></NavBar>
      <body className="flex flex-col space-y-12">
        <div className="flex flex-wrap justify-center w-full ring-white mt-5">
          <img
            src={`https://image.tmdb.org/t/p/w200/${accountInfo?.avatar.tmdb.avatar_path}`}
            className="w-2/12 rounded-3xl ring-4 ring-lightPurp"
          ></img>
        </div>
        <div className="flex flex-wrap justify-center w-full ring-white">
          <div className="flex justify-center ring-2 ring-lightPurp w-9/12 md:w-4/12 lg:w-3/12 bg-white/10 backdrop-blur-md rounded-lg py-5 shadow-xl shadow-lightPurp">
            <p className="flex justify-center font-mono text-lightPurp text-xl sm:text-nowrap">
              {accountInfo?.username}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-full ring-white">
          <div className="flex justify-center w-2/12 rounded-full space-x-2 font-mono text-lightPurp bg-white/10 transition-sexy py-2 mt">
            <label className="radio flex items-center justify-center rounded-lg p-1 cursor-pointer">
              <input
                type="radio"
                value="films"
                className="peer hidden"
                checked={selectedOption === "films"}
                onChange={handleOptionChange}
              />
              <span className="tracking-widest peer-checked:bg-mediumPurp text-white font-mono p-2 rounded-xl transition-sexy">
                Films
              </span>
            </label>
            <label className="radio flex items-center justify-center rounded-xl p-1 cursor-pointer">
              <input
                type="radio"
                value="lists"
                className="peer hidden"
                checked={selectedOption === "lists"}
                onChange={handleOptionChange}
              />
              <span className="tracking-widest peer-checked:bg-mediumPurp text-white font-mono p-2 rounded-xl transition-sexy">
                Lists
              </span>
            </label>
          </div>
        </div>
        <div className="w-full">
          {selectedOption === "films" && <RatedFilms />}
          {selectedOption === "lists" && <CreatedLists />}
        </div>
      </body>
    </html>
  );
}

export const RatedFilms = () => {
  const { accountRatings } = useAccountRatings();
  console.log(accountRatings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="flex flex-wrap justify-center w-full space-y-5">
        <div className="flex justify-center w-full">
          <button
            className="flex justify-center w-0.5/12 bg-green-500 rounded-xl p-3"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center flex-wrap w-2/3 p-5 bg-white/10 rounded-lg gap-3">
          {accountRatings.slice(0, 20).map((movie) => (
            <Link
              to={`/film/${movie.id}`}
              id={`${movie.id}`}
              className="flex flex-wrap justify-center w-5/12 md:w-2/12 lg:w-2/12 rounded-xl hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                id={`${movie.id}`}
                className="rounded-tl-xl rounded-tr-xl"
              ></img>
              <div className="flex justify-center py-2 font-mono text-white w-full bg-mediumPurp rounded-bl-xl rounded-br-xl space-x-12 text-sm">
                <p>{movie.rating}/10</p>
                <Link
                  className="flex justify-center items-center"
                  to={`/rate/${movie.id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5 hover:opacity-65"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <SearchMoviesModal
        isOpen={isModalOpen}
        onClose={closeModal}
      ></SearchMoviesModal>
    </>
  );
};

export const SearchMoviesModal = ({ isOpen, onClose }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const { filmList } = useMultiSearch(searchInput, 1);

  const [selectedMovie, setSelectedMovie] = useState();

  const handleClick = (event) => {
    const clickedElementId = event.target.id;
    setSelectedMovie(clickedElementId);
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-codBlack bg-opacity-70" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-">
          <div className="w-full max-w-md">
            <div className="flex flex-col bg-lightPurp rounded-lg shadow-xl ring-2 ring-white">
              <form className="flex p-4 mt-3">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder="Search Movies"
                  className="w-full rounded-lg font-mono p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </form>
              <div className="max-h-60 overflow-y-auto p-2 space-y-3">
                {filmList.slice(0, 5).map((movie) => (
                  <>
                    <Link
                      className="flex space-y-3 hover:ring-2 hover:ring-white rounded-xl"
                      to={`/rate/${movie.id}`}
                    >
                      <button
                        className="flex flex-wrap w-full  rounded-xl bg-codBlack hover:opacity-60 transition-sexy p-2"
                        onClick={onClose}
                      >
                        <div className="w-2/12">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto hover:opacity-50 hover:ring-4 hover:ring-indigo-500 transition-all duration-300 rounded-xl"
                          />
                        </div>
                        <p className="flex justify-center items-center text-md w-10/12 text-white font-mono ">
                          {movie.title}
                        </p>
                      </button>
                    </Link>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const RateMovie = () => {
  const [rating, setRating] = useState<string>();
  const params = useParams();
  const movie_id = params.movieID;
  const { filmInfo } = useSearchMovies(movie_id);
  const [submit, SetSubmit] = useState<string>();

  const handleSetRating = (event) => {
    setRating(event.target.value);
  };

  const movieIdInt = Number(movie_id);

  const handleSubmit = (event) => {
    event.preventDefault();
    SetSubmit(rating);
    setRating("");
  };

  CreateMovieReview(movieIdInt, submit);

  console.log(filmInfo);
  return (
    <html>
      <div
        className={"bg-fixed bg-center bg-no-repeat bg-cover w-screen absolute"}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500/${filmInfo?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center items-center w-screen h-screen sm:p-10">
          <div className="flex flex-wrap justify-center ring sm:w-1/3 lg:w-1/3 bg-white/10 backdrop-blur-md p-3 rounded-xl text-lightPurp font-mono space-y-5">
            <div className="flex flex-wrap justify-center w-full ring">
              <img
                className="w-1/2 rounded-xl mb-5"
                src={`https://image.tmdb.org/t/p/w500/${filmInfo?.poster_path}`}
              ></img>
              <p className="flex justify-center w-full ring">
                {filmInfo?.original_title}
              </p>
              <p className="flex justify-center w-full ring">
                ({filmInfo?.release_date})
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center w-full ring space-x-5">
              <p>Rating:</p>
              <input
                className="flex items-center justify-center bg-white/10 backdrop-blur-md rounded-md p-1 w-2/12"
                type="text"
                value={rating}
                onChange={handleSetRating}
                placeholder="1-10"
              ></input>
              <div className="flex justify-center w-full">
                <button
                  className="flex justify-center w-2/12 ring p-2 bg-green-500 text-codBlack rounded-xl mt-3"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="flex justify-end w-full ring p-3">
              <Link
                className="flex justify-center sm:w-2/12 lg:w-3/12 ring p-3 bg-green-500 rounded-full text-black"
                to={`/profile`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-black size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </html>
  );
};

export const CreatedLists = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-1/3 py-10 bg-white/10">no penis</div>
    </div>
  );
};
