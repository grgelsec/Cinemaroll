import { useEffect, useState } from "react";
import NavBar from "./navbar";

//TODO: START SMALL get movie ID from Movies. Put the movie ID into List containing MovieID and snag the ID and store. Then find the list details and

export default function MovieData() {
  type Movie = {
    poster_path: string;
    genre_ids: number[];
    page: number;
    name: string;
    id: number;
  };

  type MovieAPIResponse = {
    results: Movie[];
  };

  /*
  fetchData().then(data => {
    console.log(data.id)
  })
  */
  const [list, setList] = useState<Movie[]>([]);

  useEffect(() => {
    const getList = async () => {
      const api_key = import.meta.env.VITE_API_URL3;
      const baseURL =
        "https://api.themoviedb.org/3/movie/1011985/lists?api_key=";

      try {
        const response = await fetch(`${baseURL}${api_key}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setList(data.results);
        //console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getList();
    //"flex items-center rounded-xl lg:w-2/12 md:w-2/12 sm:w-2/12 xs:w-1/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
    //src={`https://image.tmdb.org/t/p/w500/${movie.name}`}
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <header className="flex ring-2 ring-white py-6 justify-center">
        <h1 className="text-whitePurp font-extrabold text-3xl border-b font-mono">
          Lists
        </h1>
      </header>
      <body className="flex col flex-wrap lg:px-40 md:px-40 sm:px-40 space-y-10 ring-white ring-2">
        <div>
          <div className="flex row justify-center flex-wrap p-10 py-10 gap-3 ring-2 ring-white">
            {list.slice(0, 1).map((movie) => (
              <div>
                <h1 className="font-mono text-white">{movie.name}</h1>
                <img className="flex items-center rounded-xl lg:w-2/12 md:w-2/12 sm:w-2/12 xs:w-1/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}>
                </img>
              </div>
            ))}
          </div>
        </div>
      </body>
    </>
  );
}
