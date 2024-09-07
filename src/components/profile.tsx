import NavBar from "./navbar";
import { supabase } from "../db/supabaseClient";
import CreateMovieReview from "../hooks/postReview";
import useAccountRatings from "../hooks/accountInfo/fetchAccountRatings";
import { useState, useEffect } from "react";
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

  //need to create a file for db functions
  //post review feeds in current movie on page, review, account id
  //view review will be its down is play, link o page with backdrop, rating, and review
  //need to add a button for delete movie rating and delete moview review (possible one button).

  return (
    <html>
      <NavBar></NavBar>
      <div className="flex flex-col space-y-12 mb-10">
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
      </div>
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
      <div className="flex flex-col items-center w-full space-y-5 px-4">
        <div className="w-full max-w-screen-xl">
          <button
            className="flex justify-center items-center w-12 h-12 bg-green-500 rounded-full p-3 mx-auto"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center flex-wrap w-full max-w-screen-xl p-5 bg-white/10 rounded-lg gap-3">
          {accountRatings.slice(0, 20).map((movie) => (
            <Link
              key={movie.id}
              to={`/view-rating/${movie.id}/${movie.rating}`}
              className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-xl overflow-hidden hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-all duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
              <div className="flex justify-between items-center py-2 px-3 font-mono text-white w-full bg-mediumPurp">
                <p>{movie.rating}/10</p>
                <Link
                  className="flex justify-center items-center"
                  to={`/rate/${movie.id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 hover:opacity-65"
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
      <SearchMoviesModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

interface SearchMoviesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchMoviesModal = ({
  isOpen,
  onClose,
}: SearchMoviesModalProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const { filmList } = useMultiSearch(searchInput);

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
  const { accountInfo } = useAccountDetails();
  const [rating, setRating] = useState<string>();
  const [review, setReview] = useState<string | undefined>();
  const params = useParams();
  const movie_id = params.movieID;
  const { filmInfo } = useSearchMovies(movie_id);
  const [submitRating, SetSubmitRating] = useState<string>();
  const [submitReview, SetSubmitReview] = useState<string>();

  interface MovieReview {
    user_id: number | undefined;
    movie_id: number;
    movie_review: string | undefined;
  }

  const [dataToInsert, setDataToInsert] = useState<MovieReview | null>(null);

  useEffect(() => {
    const insertData = async () => {
      if (dataToInsert) {
        try {
          const { data, error } = await supabase
            .from("movie_reviews")
            .insert([dataToInsert]);

          if (error) throw error;

          console.log("Data inserted successfully:", data);
          setDataToInsert(null);
        } catch (error) {
          console.error(error);
        }
      }
    };
    insertData();
  }, [dataToInsert]);

  const handleSetRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value);
  };

  const handleSetReview = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setReview(value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    SetSubmitRating(rating);
    SetSubmitReview(review);
    if (review != "") {
      handleInsert();
    }
  };

  CreateMovieReview(Number(movie_id), Number(rating));

  const handleInsert = () => {
    setDataToInsert({
      user_id: accountInfo?.id,
      movie_id: Number(movie_id),
      movie_review: review,
    });
  };

  console.log(review);

  return (
    <html>
      <div
        className="bg-fixed bg-center bg-no-repeat bg-cover min-h-screen w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500/${filmInfo?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center items-center min-h-screen w-full p-4 sm:p-10">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-xl text-lightPurp font-mono space-y-5">
            <div className="flex flex-col items-center w-full">
              <img
                className="w-2/3 max-w-xs rounded-xl mb-5"
                src={`https://image.tmdb.org/t/p/w500/${filmInfo?.poster_path}`}
                alt={filmInfo?.original_title}
              />
              <p className="text-center text-xl font-bold">
                {filmInfo?.original_title}
              </p>
              <p className="text-center">({filmInfo?.release_date})</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full space-y-3"
            >
              <div className="flex items-center space-x-3">
                <p>Rating:</p>
                <input
                  className="bg-white/10 backdrop-blur-md rounded-md p-2 w-20 text-center"
                  type="number"
                  value={rating}
                  id="rating"
                  min="1"
                  onChange={handleSetRating}
                  placeholder="1-10"
                />
              </div>
              <textarea
                className="bg-white/10 backdrop-blur-md rounded-md p-2 w-full h-24 text-left"
                id="review"
                value={review}
                onChange={handleSetReview}
                placeholder="Write your review here..."
              ></textarea>
              <button
                className="w-full sm:w-1/2 p-2 bg-green-500 text-codBlack rounded-xl mt-3 hover:bg-green-600 transition-colors"
                type="submit"
              >
                Save
              </button>
            </form>
            <div className="flex justify-end w-full pt-3">
              <Link
                className="flex justify-center items-center w-12 h-12 bg-green-500 rounded-full text-black hover:bg-green-600 transition-colors"
                to="/profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
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
      <div className="w-1/3 py-10 bg-white/10 rounded-xl text-white font-mono font-bold">
        Coming soon!
      </div>
    </div>
  );
};

export const ViewReview = () => {
  const { accountInfo } = useAccountDetails();
  const { accountRatings } = useAccountRatings();
  const params = useParams();
  const movie_id = params.movieID;
  const movie_rating = params.rating;
  const { filmInfo } = useSearchMovies(movie_id);
  const [review, setReview] = useState<string | null>("");
  console.log(accountRatings);

  const readRow = async (
    userId: number | undefined,
    movieId: number | undefined
  ) => {
    try {
      const { data, error } = await supabase
        .from("movie_reviews")
        .select("movie_review, created_at")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data?.movie_review ?? null;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchReview() {
      const review = await readRow(accountInfo?.id, Number(movie_id));
      if (review != null) {
        setReview(review);
      } else {
        setReview("No Review.");
      }
    }
    fetchReview();
  }, [movie_id, accountInfo?.id]);

  const [deletedMovieID, setDeletedMovieID] = useState<number | undefined>(0);

  const handleDelete = () => {
    setDeletedMovieID(filmInfo?.id);
  };

  if (deletedMovieID != 0) {
    DeleteMovieRating(deletedMovieID);
  }

  return (
    <html>
      <div
        className="bg-fixed bg-center bg-no-repeat bg-cover min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500/${filmInfo?.backdrop_path})`,
        }}
      >
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl text-lightPurp font-mono">
          <div className="space-y-6">
            <div className="flex justify-center ">
              <Link
                key={filmInfo?.id}
                to={`/film/${filmInfo?.id}`}
                className="flex flex-col w-full sm:w-1/2 md:w-2/3 lg:w-2/4 xl:w-3/5 rounded-xl overflow-hidden hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-all duration-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${filmInfo?.poster_path}`}
                  className="w-full h-auto object-cover"
                />
              </Link>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Rating</h2>
              <div className="text-3xl font-bold ">
                {movie_rating}
                <span className="text-xl font-normal ">/10</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Review</h2>
              <p className="text-sm sm:text-base leading-relaxed ring ring-lightPurp p-2 rounded-xl">
                {review}
              </p>
            </div>
            <div className="flex w-full justify-center items-center text-white">
              <button
                className="flex justify-center items-center rounded-xl w-12 h-12 bg-red-500"
                onClick={handleDelete}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-end w-full pt-3">
              <Link
                className="flex justify-center items-center w-12 h-12 bg-green-500 rounded-full text-black hover:bg-green-600 transition-colors"
                to="/profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
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

export const alert = () => {
  return (
    /* From Uiverse.io by seyed-mohsen-mousavi */
    <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
      <div className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
        <div className="flex gap-2">
          <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              ></path>
            </svg>
          </div>
          <div>
            <p className="text-white">done successfully :)</p>
            <p className="text-gray-500">This is the description section</p>
          </div>
        </div>
        <button className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
