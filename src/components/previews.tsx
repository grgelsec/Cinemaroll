import { useEffect, useState } from "react";

export default function UserFeatures() {
  type Movie = {
    poster_path: string;
    title: string;
    vote_average: number;
    vote_count: number;
  };

  type MovieAPIResponse = {
    results: Movie[];
  };

  const [posterList, setPosterList] = useState<Movie[]>([]);

  useEffect(() => {
    const getPoster = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setPosterList(data.results);
        console.log(data.results.slice(0, 40));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPoster();
  }, []);

  return (
    <div className="flex col flex-wrap justify-center lg:px-40 md:px-40 sm:px-40 space-y-20 ring-8 ring-red-500">
      <div className="flex col flex-wrap just text-whitePurp font-semibold py-2 ring-4 ring-green-500 w-8/12">
        What have you watched?
        <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3 ring-2 ring-yellow-500 ">
          Let us know what you've seen! Cinemaroll allows you to keep track of
          every movie that you've watched. Build your library and keep a running
          log!
        </p>
        <div className="flex flex-wrap row justify-center py-10 space-x-10">
          {posterList.slice(0, 3).map((movie) => (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="rounded-xl lg:w-3/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
