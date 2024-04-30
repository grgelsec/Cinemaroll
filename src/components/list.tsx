import { useEffect, useState } from "react";
import NavBar from "./navbar";

export default function FilmLists() {
  type Movie = {
    poster_path: string;
    genre_ids: number;
    page: number;
  };

  type MovieAPIResponse = {
    results: Movie[];
  };

  const [list, setList] = useState<Movie[]>([]);

  useEffect(() => {
    const getFilm = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL2);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setList(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFilm();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <header className="flex ring-2 ring-white py-6 justify-center">
        <h1 className="text-white font-extrabold text-3xl">Lists</h1>
      </header>
      <body className="flex col flex-wrap lg:px-40 md:px-40 sm:px-40 space-y-10 ring-white ring-2">
        <div>
          <div className="flex row p-10 py-10 justify-start gap-3 ring-2 ring-white">
          {list
                  .slice(2, 7)
                  .filter((movie) => movie.genre_ids = 9648)
                  .map((movie) => (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      className="flex items-center rounded-xl lg:w-2/12 md:w-2/12 sm:w-2/12 xs:w-1/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
                    ></img>
                  ))}
          </div>
        </div>
      </body>
    </>
  );
}
