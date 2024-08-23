import { useState, useEffect } from "react";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

type SearchResults = {
  results: Movie[];
};

const useMultiSearch = (search: string, pageNum: number) => {
  const [filmList, setFilmList] = useState<Movie[]>([]);

  useEffect(() => {
    const getFilms = async () => {
      const apikey = import.meta.env.VITE_API_URL3;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apikey}&page=${pageNum}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: SearchResults = await response.json();
        setFilmList(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFilms();
  }, [search, pageNum]);

  return { filmList };
};

export default useMultiSearch;
