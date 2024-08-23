import useAccountDetails from "../hooks/accountInfo/fetchAccountInfo";
import NavBar from "./navbar";
import useTopRatedFilms from "../hooks/movieLists/fetchTopRated";
import { Link } from "react-router-dom";
import usePopularFilms from "../hooks/movieLists/fetchPopularFilms";
import useUpcomingFilms from "../hooks/movieLists/fetchUpcomingFilms";
import useNowPlaying from "../hooks/movieLists/fetchNowPlaying";
export default function Home() {
  const { accountInfo } = useAccountDetails();
  console.log(accountInfo);
  const { topRatedFilms } = useTopRatedFilms();
  const { popularFilms } = usePopularFilms();
  const { upcomingFilms } = useUpcomingFilms();
  const { nowPlaying } = useNowPlaying();
  return (
    <>
      <NavBar />
      <div className="flex flex-wrap space-y-5">
        <div className="flex justify-center w-full mt-5">
          <div className="flex justify-center ring-2 ring-lightPurp w-9/12 md:w-4/12 lg:w-3/12 bg-white/10 backdrop-blur-md rounded-lg py-5">
            <p className="flex justify-center font-mono text-lightPurp text-xl sm:text-nowrap">
              Hey there, {accountInfo?.username}!
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full space-x-5 px-16">
          <div className="flex flex-wrap justify-center ring-2 ring-lightPurp w-1/2 bg-white/10 p-10 rounded-xl">
            <span className="flex justify-start w-full text-xl text-lightPurp border-b border-lightPurp pb-2 font-mono">
              Top Rated
            </span>
            <div className="flex flex-wrap justify-center w-full gap-3">
              {topRatedFilms?.slice(0, 20).map((movie) => (
                <Link
                  to={`/film/${movie.id}`}
                  id={`${movie.id}`}
                  className="flex sm:w-1/12 md:w-2/12 w-3/12 mt-3"
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
          <div className="flex flex-wrap justify-center ring-2 ring-lightPurp w-1/2 bg-white/10 p-10 rounded-xl">
            <span className="flex justify-start w-full text-xl text-lightPurp border-b border-lightPurp pb-2 font-mono">
              Popular
            </span>
            <div className="flex flex-wrap justify-center w-full gap-3">
              {popularFilms?.slice(0, 20).map((movie) => (
                <Link
                  to={`/film/${movie.id}`}
                  id={`${movie.id}`}
                  className="flex sm:w-1/12 md:w-2/12 w-3/12 mt-3"
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
        <div className="flex justify-center w-full flex-wrap space-y-5 px-16">
          <div className="flex flex-wrap w-full ring-2 ring-lightPurp rounded-xl bg-white/10 p-5">
            <span className="flex w-full justify-start border-b text-xl text-lightPurp border-lightPurp pb-2 font-mono">
              Upcoming
            </span>
            <div className="flex flex-wrap justify-center w-full gap-3">
              {upcomingFilms?.slice(0, 10).map((movie) => (
                <Link
                  to={`/film/${movie.id}`}
                  id={`${movie.id}`}
                  className="flex w-1/12 mt-3"
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
          <div className="flex flex-wrap w-full ring-2 ring-lightPurp rounded-xl bg-white/10 p-5">
            <span className="flex w-full justify-start border-b border-lightPurp text-xl text-lightPurp pb-2 font-mono">
              Now Playing
            </span>
            <div className="flex flex-wrap justify-center w-full gap-3">
              {nowPlaying?.slice(0, 10).map((movie) => (
                <Link
                  to={`/film/${movie.id}`}
                  id={`${movie.id}`}
                  className="flex w-1/12 mt-3"
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
      <footer className="mb-10"></footer>
    </>
  );
}
