import NavBar from "./navbar";
import CreateMovieReview from "../hooks/postReview";
import useAccountRatings from "../hooks/accountInfo/fetchAccountRatings";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteMovieRating from "../hooks/accountInfo/deleteAccountRating";
import useMultiSearch from "../hooks/search/fetchStringSearch";
export default function Profile() {
  const review = CreateMovieReview(1079091);
  console.log(review);
  const [selectedOption, setSelectedOption] = useState<string>("films");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  //DeleteMovieRating(1079091);

  return (
    <div>
      <NavBar></NavBar>
      <div className="flex flex-wrap justify-center w-full ring-white mt-5">
        <div className="flex justify-center w-2/12 rounded-full space-x-2 font-mono text-lightPurp bg-white/10 transition-sexy py-2">
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
      <div className="w-full py-10">
        {selectedOption === "films" && <RatedFilms />}
        {selectedOption === "lists" && <CreatedLists />}
      </div>
    </div>
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
        <div className="flex flex-wrap justify-start w-2/3 p-5 bg-white/10 rounded-lg gap-3">
          {accountRatings.slice(0, 6).map((movie) => (
            <Link
              to={`/film/${movie.id}`}
              id={`${movie.id}`}
              className="flex flex-wrap justify-center w-5/12 md:w-2/12 lg:w-2/12 rounded-tl-xl rounded-tr-xl hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                id={`${movie.id}`}
                className="rounded-tl-xl rounded-tr-xl"
              ></img>
              <p className="flex justify-center py-2 font-mono text-white w-full bg-mediumPurp rounded-bl-xl rounded-br-xl">
                {movie.rating}/10
              </p>
            </Link>
          ))}
        </div>
      </div>
      <CreateRatingModal
        isOpen={isModalOpen}
        onClose={closeModal}
      ></CreateRatingModal>
    </>
  );
};

export const CreateRatingModal = (isOpen: boolean, onClose: () => void) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const { filmList } = useMultiSearch(searchInput, 1);

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-gray-300 bg-opacity-30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="flex flex-col bg-gray-500 rounded-lg shadow-xl ring-2 ring-white">
              <form className="p-4">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder="Search Movies"
                  className="w-full rounded-lg font-mono p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </form>
              <div className="max-h-60 overflow-y-auto p-2 space-y-3  ">
                {filmList.slice(0, 5).map((movie) => (
                  <>
                    <div className="flex flex-wrap w-full  rounded-xl bg-codBlack hover:opacity-60 transition-sexy p-2">
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
                    </div>
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

export const CreatedLists = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-1/3 py-10 bg-white/10">no penis</div>
    </div>
  );
};
