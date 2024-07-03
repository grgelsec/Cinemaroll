/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from "react";
import NavBar from "./navbar";
import useMovies from "../hooks/fetchMovies";
import useMultipleMovieData from "../hooks/fetchListInMultiple";
import useListDetails from "../hooks/fetchListDetails";

//TODO: START SMALL get movie ID from Movies. Put the movie ID into List containing MovieID and snag the ID and store. Then find the list details and
//TODO: Big picture: useMovies returns a list of movies => Store all of the movie ids on that page into an array => use promise.all to map each id to an API call that returns all of the lists that all of those movies appear in => Store the list id in an array => Map each list id to the api call that returns list details which can then be used to create the lists in the frontend.

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
  const { multipleMovieLists } = useMultipleMovieData(movieIds, 1);
  const listIds: number[] = useMemo(
    () => multipleMovieLists.slice(0, 20).map((list) => list.id),
    [multipleMovieLists]
  );
  console.log(listIds);
  const { listDetails } = useListDetails(listIds, 1);
  const listInfo = listDetails
    .slice(0, 1)
    .map((listtest) => listtest.created_by);
  console.log(listInfo);

  //problem fixed: first render, useMovies is called and results are saved to the state which triggers a re-render
  // second  re-render triggered the second api call which saves to the state causing another re-reder
  // the last re-render restarted the whole process which is why each repeated result returned the first data.

  return (
    <>
      <NavBar></NavBar>
      <header className="flex ring-2 ring-white py-6 justify-center">
        <h1 className="text-whitePurp font-extrabold text-3xl border-b font-mono">
          Lists
        </h1>
      </header>
      <div className="flex col flex-wrap lg:px-40 md:px-40 sm:px-40 space-y-10 ring-white ring-2">
        <div>
          <div className="flex row justify-center flex-wrap p-10 py-10 gap-3 ring-2 ring-white">
            {filmList.slice(0, 1).map((movie) => (
              <div>
                <h1 className="font-mono text-white">{movie.title}</h1>
                <img
                  className="flex items-center rounded-xl lg:w-2/12 md:w-2/12 sm:w-2/12 xs:w-1/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                ></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
