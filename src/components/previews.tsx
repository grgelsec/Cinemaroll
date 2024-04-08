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
    <div className="flex col flex-wrap justify-center lg:px-40 md:px-40 sm:px-40 space-y-10 ring-8 ring-red-500">
      <div className="flex col flex-wrap justify-center text-whitePurp font-semibold py-2 ring-4 ring-green-500 w-8/12">
        What have you watched?
        <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3 ring-2 ring-yellow-500 ">
          Let us know what you've seen! Cinemaroll allows you to keep track of
          every movie that you've watched. Build your library and keep a running
          log!
        </p>
        <div className="flex flex-wrap row justify-center gap-3 ring-4  ring-pink-400">
          {posterList.slice(17, 20).map((movie) => (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="flex items-center rounded-xl lg:w-3/12 md:w-3/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
            ></img>
          ))}
        </div>
      </div>
      <div className="flex col flex-wrap justify-center text-whitePurp font-semibold py-2 ring-4 ring-green-500 w-8/12">
        What would you rate it?
        <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3 ring-2 ring-yellow-500 ">
          Rate each film to record how you feel about it! While you're at it, Go
          more in depth on what you loved or hated. No wrong answers...
          hopefully.
        </p>
        <div className="flex flex-wrap row items-center justify-center gap-3 ring-4  ring-pink-400">
          {posterList.slice(19, 20).map((movie) => (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="flex items-center rounded-xl lg:w-6/12 md:w-6/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
            ></img>
          ))}
          <h1 className="flex row items-center text-indigo-500 font-semibold p-5 bg-whitePurp rounded-xl ring-2">
            Rating:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
          </h1>
        </div>
      </div>
      <div className="flex col flex-wrap justify-center text-whitePurp font-semibold py-2 ring-4 ring-green-500 w-8/12">
        Did you love it it?
        <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3 ring-2 ring-yellow-500 ">
          With each film you watch, take the opportunity to show us that you
          loved it! If you really liked it, give the film a 'heart' indicating
          to others what floats your boat.
        </p>
        <div className="flex flex-wrap row space-x-5 justify-center items-center">
          {posterList.slice(14, 15).map((movie) => (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="relative flex items-center rounded-xl lg:w-6/12 md:w-6/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
            ></img>
          ))}
          <div className="flex col flex-wrap p-3 gap-3 bg-mediumPurp rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="lightindigo"
              className="flex w-14 h-14 rounded-xl"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            
          </div>
        </div>
      </div>
    </div>
  );
}
