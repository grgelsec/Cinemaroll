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
      <div className="flex flex-wrap space-y-5 px-4 sm:px-8 md:px-16">
        <div className="flex justify-center w-full mt-5">
          <div className="flex justify-center ring-2 ring-lightPurp w-full sm:w-9/12 md:w-6/12 lg:w-4/12 bg-white/10 backdrop-blur-md rounded-lg py-3 px-4">
            <p className="font-mono text-lightPurp text-lg sm:text-xl">
              Hey there, {accountInfo?.username}!
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center w-full space-y-5 lg:space-y-0 lg:space-x-5">
          <div className="flex flex-wrap justify-center ring-2 ring-lightPurp w-full lg:w-1/2 bg-white/10 p-5 rounded-xl">
            <span className="flex justify-start w-full text-xl text-lightPurp border-b border-lightPurp pb-2 font-mono mb-3">
              Top Rated
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
              {topRatedFilms?.slice(0, 20).map((movie) => (
                <Link
                  key={movie.id}
                  to={`/film/${movie.id}`}
                  className="aspect-[2/3]"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-all duration-300 hover:opacity-50 hover:ring-4 hover:ring-indigo-500"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center ring-2 ring-lightPurp w-full lg:w-1/2 bg-white/10 p-5 rounded-xl">
            <span className="flex justify-start w-full text-xl text-lightPurp border-b border-lightPurp pb-2 font-mono mb-3">
              Popular
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
              {popularFilms?.slice(0, 20).map((movie) => (
                <Link
                  key={movie.id}
                  to={`/film/${movie.id}`}
                  className="aspect-[2/3]"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-all duration-300 hover:opacity-50 hover:ring-4 hover:ring-indigo-500"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-5 w-full px-0 sm:px-0">
          <div className="flex flex-wrap w-full ring-2 ring-lightPurp rounded-xl bg-white/10 p-5">
            <span className="flex w-full justify-start border-b text-xl text-lightPurp border-lightPurp pb-2 font-mono mb-3">
              Upcoming
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
              {upcomingFilms?.slice(0, 10).map((movie) => (
                <Link
                  key={movie.id}
                  to={`/film/${movie.id}`}
                  className="aspect-[2/3]"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-all duration-300 hover:opacity-50 hover:ring-4 hover:ring-indigo-500"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap w-full ring-2 ring-lightPurp rounded-xl bg-white/10 p-5">
            <span className="flex w-full justify-start border-b border-lightPurp text-xl text-lightPurp pb-2 font-mono mb-3">
              Now Playing
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
              {nowPlaying?.slice(0, 10).map((movie) => (
                <Link
                  key={movie.id}
                  to={`/film/${movie.id}`}
                  className="aspect-[2/3]"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-all duration-300 hover:opacity-50 hover:ring-4 hover:ring-indigo-500"
                  />
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
