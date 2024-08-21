import { useEffect, useState } from "react";

type Movie = {
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  id: number;
  overview: string;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  video: boolean;
  adult: boolean;
};

type MovieAPIResponse = {
  results: Movie[];
};

const useTopRatedFilms = () => {
  const [topRatedFilms, setTopRatedFilms] = useState<Movie[] | undefined>();

  useEffect(() => {
    const getTopRated = async () => {
      const api_key = import.meta.env.VITE_API_URL3;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Response: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setTopRatedFilms(data.results);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getTopRated();
  }, []);
  return { topRatedFilms };
};
export default useTopRatedFilms;
