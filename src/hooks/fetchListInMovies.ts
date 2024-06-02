import { error } from "console";
import { useState, useEffect } from "react";

//each list contains id and name
type List = {
  id: string;
  name: string;
};

//Array of list ids and names
type ListAPIResponse = {
  results: List[];
};

const useListContainsMovie = (pageNum: number, movieID: number) => {

  const [listInfo, setListInfo] = useState<List[]>();

  useEffect(() => {
    const getList = async () => {

      const baseUrl = "https://api.themoviedb.org/3/movie/";
      const api_key = import.meta.env.VITE_API_URL3;
      
      try {
      //input movie id that will be fetched by fetchMovies
      const response = await fetch(`${baseUrl}${movieID}/lists?api_key=${api_key}`);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data: ListAPIResponse = await response.json();
      setListInfo(data.results)
      } catch {
        console.error("Error fetching data", error);
      }

    };

    getList();
  }, [pageNum, movieID]);

  return {listInfo}
};

export default useListContainsMovie;
