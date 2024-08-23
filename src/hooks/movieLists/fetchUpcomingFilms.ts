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

const useUpcomingFilms = () => {
  //pml being pre-made lists
  const [upcomingFilms, setUpcomingFilms] = useState<Movie[] | undefined>();

  useEffect(() => {
    const getUpcomingFilms = async () => {
      const api_key = import.meta.env.VITE_API_URL3;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Response: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setUpcomingFilms(data.results);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getUpcomingFilms();
  }, []);
  return { upcomingFilms };
};
export default useUpcomingFilms;
