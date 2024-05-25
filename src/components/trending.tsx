import { useEffect, useState } from "react";

export default function Movies() {
  //These type declarations are purely for practice of clean code
  //Techincally you could just return JSON and grab a certain endpoint
  //But typing this is clean and maintainable
  type Movie = {
    poster_path: string;
    genre_ids: number[];
    page: number;
    name: string;
    id: number;
  };

  type MovieApiResponse = {
    results: Movie[];
  };

  //movieList is of type Movie[] which is an array of poster paths
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    //Promise<Type> is a generic interface, indicates the type of data the Promise is returning
    const getMovie = async () => {
      try {
        //Uses await to pause the execution of async function until the promise returned by fetch is resolved
        //fetch always returns a promise
        //in the future type async functions with Promise<>
        const response = await fetch(import.meta.env.VITE_API_URL);
        // that indicates if the HTTP request was successful
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // TypeScript can infer the type of `data` from the `await` expression
        // When you use the await keyword before an expression that returns a Promise,
        // TypeScript can "look inside" the Promise and infer the type of the resolved value.
        // In this case, await response.json() means that TypeScript knows the resolved value
        // of the Promise is the data returned by response.json(),
        // which is typically a JavaScript object or array representing the parsed JSON data.

        //here, returning type MovieApiResponse which is results (array of Movies (poster_paths))
        const data: MovieApiResponse = await response.json();
        setMovieList(data.results);
        console.log(data.results.slice(0, 20));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getMovie();
  }, []);

  //what not to do is below in comments OUTDATED TECH U RAT
  /*
    nterface MovieApiResponse {
    results: any[];
    }

    const getMovie = (): void => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json() as Promise<MovieApiResponse>;
        })
        .then(json => console.log(json))
        .catch(error => console.error('Error fetching data:', error));
    }

    getMovie(); // Call the function to execute the fetch request.

      */

  return (
    <div className="flex items-center flex-col lg:px-40 md:px-40 sm:px-40 py-10">
      <header className="text-whitePurp font-semibold opacity-70 p-3 divide-x-4 border-b w-8/12 hover:opacity-100 hover:outline-none transition-sexy">
        Trending
      </header>
      <div className="flex row flex-wrap gap-3 justify-center px-20">
        {movieList.slice(0, 4).map((movie) => (
          <img
            className="flex lg:w-2/12 md:w-4/12 sm:w-5/12 rounded-md hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}
