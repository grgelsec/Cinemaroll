import { useState, useEffect } from "react";
import NavBar from "./navbar";

export default function Films() {
  type Movie = {
    poster_path: string;
    title: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    page: number;
    popularity: number;
    release_date: string;
  };

  type MovieAPIResponse = {
    results: Movie[];
  };

  const [filmList, setFilmList] = useState<Movie[]>([]);

  useEffect(() => {
    const getFilm = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setFilmList(data.results);
        console.log(data.results.slice(0, 20));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFilm();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div>
        <header>
          <div className="flex justify-center py-6">
            <div className="text-white text-3xl font-extrabold">Films</div>
          </div>
        </header>
        <div className="">
          <body className="flex col justify-center flex-wrap lg:px-40 md:px-40 sm:px-40 space-y-10 ring-2 ring-red-500">
            <div className="flex col flex-wrap justify-center text-xl py-2 w-11/12 ring-4 text-whitePurp ring-red-500">
              <h1 className="py-1 border-b font-extrabold">Popular</h1>
              <div className="flex col flex-wrap justify-center gap-3 ring- ring-white ">
                {filmList
                  .slice(2, 7)
                  .filter((movie) => movie.popularity > 1000)
                  .map((movie) => (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      className="flex items-center rounded-xl lg:w-2/12 md:w-2/12 sm:w-2/12 xs:w-1/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
                    ></img>
                  ))}
              </div>
            </div>
          </body>
          <body className="flex col justify-center flex-wrap lg:px-40 md:px-40 sm:px-40 space-y-10 ring-2 ring-red-500">
            <div className="flex col flex-wrap justify-center text-xl py-2 text-whitePurp w-11/12 ring-4 ring-white">
              <h1 className="py-1 font-extrabold">This year</h1>
              <div className="flex col flex-wrap justify-center gap-3 ring-2 ring-white">
                {filmList
                  .slice(0, 20)
                  .filter((movie) => movie.release_date.includes("2024"))
                  .map((movie) => (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      className="flex items-center rounded-xl lg:w-2/12 md:w-2/12 sm:w-2/12 xs:w-1/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
                    ></img>
                  ))}
              </div>
            </div>
          </body>
          <body className="flex col justify-center flex-wrap lg:px-40 md:px-40 sm:px-40 space-y-10 ring-2 ring-red-500">
            <div className="flex col flex-wrap justify-center text-xl py-2 text-whitePurp w-11/12 ring-4 ring-white">
              <h1 className="py-1 font-extrabold">More coming soon...</h1>
              <div className="flex col flex-wrap justify-center gap-3 ring-2 ring-white">
              </div>
            </div>
          </body>
        </div>
      </div>
    </>
  );
}
