import pLimit from "p-limit";
import { useState, useEffect } from "react";

//need to use promise.all to make a hook that runs movieids through a hook

//each list contains id and name
type List = {
  id: number;
  page: number;
};

//Array of list ids and names
type ListAPIResponse = {
  results: List[];
};

//hook that takes in an array of movie ids
const useMultipleMovieData = (movieIds: number[], pageNum: number) => {
  //const baseURL = "https://api.themoviedb.org/3/movie/";
  const apikey = import.meta.env.VITE_API_URL3;
  const [multipleMovieLists, setMultipleMovieList] = useState<
    ListAPIResponse[]
  >([]);

  useEffect(() => {
    const fetchAllMoviesData = async () => {
      try {
        const response = await Promise.all(
          movieIds
            .slice(0, 1)
            .map((id) =>
              fetch(
                `https://api.themoviedb.org/3/movie/${id}/lists?api_key=${apikey}&page=${pageNum}`
              )
            )
        );
        //need to see if this is even needed
        const data: ListAPIResponse[] = await Promise.all(
          response.map((response) => response.json())
        );
        setMultipleMovieList(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchAllMoviesData();
  });
  return { multipleMovieLists };
};

export default useMultipleMovieData;
