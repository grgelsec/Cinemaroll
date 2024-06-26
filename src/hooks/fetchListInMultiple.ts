import { useState, useEffect } from "react";
import useMovies from "./fetchMovies";

//need to use promise.all to make a hook that runs movieids through a hook

//each list contains id and name
type List = {
  id: number;
  name: string;
};

//Array of list ids and names
type ListAPIResponse = {
  results: List[];
};

//hook that takes in an array of movie ids
const useMultipleMovieData = (movieIds: number[]) => {
  const [multipleMovieLists, setMultipleMovieList] = useState<unknown>([]);
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const api_key = import.meta.env.VITE_API_URL3;

  useEffect(() => {
    const fetchAllMoviesData = async () => {
      try {
        const response = await Promise.all(
          movieIds.map((id) => fetch(`${baseURL}${id}/lists${api_key}`))
        );
        //need to see if this is even needed
        const data: ListAPIResponse = await response.json();
        setMultipleMovieList(response);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchAllMoviesData();
  });
  return { multipleMovieLists };
};
