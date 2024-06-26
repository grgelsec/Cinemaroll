/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import NavBar from "./navbar";
import useMovies from "../hooks/fetchMovies";
import useMultipleMovieData from "../hooks/fetchListInMultiple";

//TODO: START SMALL get movie ID from Movies. Put the movie ID into List containing MovieID and snag the ID and store. Then find the list details and
//TODO: Big picture: useMovies returns a list of movies => Store all of the movie ids on that page into an array => use promise.all to map each id to an API call that returns all of the lists that all of those movies appear in => Store the list id in an array => Map each list id to the api call that returns list details which can then be used to create the lists in the frontend.

// //each list contains id and name
// type List = {
//   id: number;
//   name: string;
// };

// //Array of list ids and names
// type ListAPIResponse = {
//   results: List[];
// };

export default function BrowseLists() {
  //keeps track of page #
  const [pageNum, setPage] = useState(1);

  //contains all latest movies
  const { filmList } = useMovies(pageNum);

  // contains info (name, list id) of lists that contain a certain movie
  // takes page # and movieID
  // const { listInfo } = useListContainsMovie(pageNum, 0);

  // contains list details (created_by, description, item_count)
  // takes page # and listID
  //const { listDetails } = useListDetails(pageNum, 0);

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
  const movieIds: number[] = filmList.slice(0, 2).map((movie) => movie.id);
  console.log(movieIds);
  //const { multipleMovieLists } = useMultipleMovieData(movieIds, pageNum);
  //console.log(multipleMovieLists.slice(0, 10));

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
