import { useState, useEffect } from "react";

//need to use promise.all to make a hook that runs movieids through a hook
//TODO: Filer out the ones with a blank description?
//each list contains id and name
type List = {
  id: number;
};

//Array of list ids and names
type ListAPIResponse = {
  results: List[];
};

//hook that takes in an array of movie ids
const useMultipleMovieData = (movieIds: number[], pageNum: number) => {
  //const baseURL = "https://api.themoviedb.org/3/movie/";
  const [multipleMovieLists, setMultipleMovieList] = useState<List[]>([]);

  useEffect(() => {
    const fetchAllMoviesData = async () => {
      const apikey = import.meta.env.VITE_API_URL3;
      try {
        //promise.all makes concurrent rather than sequentil calls
        const response = await Promise.all(
          movieIds.map((id) =>
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/lists?api_key=${apikey}&page=${pageNum}`
            )
          )
        );
        //parses thhe JSON of all responses
        const data: ListAPIResponse[] = await Promise.all(
          response.map((response) => response.json())
        );
        //turns the results into a single array
        const allResults = data.flatMap((response) => response.results);
        setMultipleMovieList(allResults);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchAllMoviesData();
  }, [movieIds, pageNum]);
  return { multipleMovieLists };
};

export default useMultipleMovieData;
