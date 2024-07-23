/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from "react";
import NavBar from "./navbar";
import useMovies from "../hooks/fetchMovies";
import useMultipleMovieData from "../hooks/fetchListContainingMovieID";
import useListDetails from "../hooks/fetchListDetails";

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
    () => multipleMovieLists.slice(0, 20).map((list) => list.id),
    [multipleMovieLists]
  );

  console.log(listIds);

  const { listDetails } = useListDetails(listIds);
  const listInfo = useMemo(
    () => listDetails.map((listest) => listest),
    [listDetails]
  );
  console.log(listInfo);

  //problem fixed: first render, useMovies is called and results are saved to the state which triggers a re-render
  // second  re-render triggered the second api call which saves to the state causing another re-reder
  // the last re-render restarted the whole process which is why each repeated result returned the first data.

  return (
    <div className="hide-scrollbar">
      <NavBar></NavBar>
      <header className="flex py-6 justify-center">
        <h1 className="text-whitePurp font-extrabold text-3xl border-b font-mono">
          Lists
        </h1>
      </header>
      <div className="flex col justify-center flex-wrap lg:px-40 md:px-40 sm:px-40 space-y-10">
        <div className="flex">
          <div className="flex flex-wrap col justify-center  space-y-5">
            {listInfo.slice(0, 20).map((list) => (
              <div className="flex justify-center flex-row w-8/12 p-24 space-x-24 rounded-xl bg-white bg-opacity-30 ring-white ring-2">
                <div className="flex flex-col w-auto flex-wrap row">
                  <h1 className="text-xl font-mono font-bold text-white">
                    {list.name}
                  </h1>
                  <h3 className="text-lg font-mono text-white">
                    Created by: {list.created_by}
                  </h3>
                  <h3 className="text-md font-mono font-light text-white">
                    {list.item_count} movies
                  </h3>
                  <h3 className="text-md font-mono italic text-white">
                    {list.description}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
