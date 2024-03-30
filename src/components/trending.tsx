import { useEffect, useState } from "react";

export function Movies() {

//These type declarations are purely for practice of clean code
//Techincally you could just return JSON and grab a certain endpoint
//But typing this is clean and maintainable
  type Movie = {
    poster_path: string;
  };

//   type MovieApiResponse = {
//     results: Movie[];
//   };

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
        const data = await response.json();
        //this is essentially data.poster_paths
        setMovieList(data.poster_path);
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
    <div className="felx col lg:mt-20 lg:mr-80 lg:ml-80 md:m-20 sm:m-20">
      <div className="flex row flex-wrap justify-center gap-3">
        {movieList.slice(0, 15).map((movie) => (
          <img
            className="flex w-1/6 rounded-md hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition duration-300 ease-in-out"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}
