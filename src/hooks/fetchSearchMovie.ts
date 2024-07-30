import { useState, useEffect } from "react";

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

const useSearchMovies = (movie_id: number, pageNum: number) => {
  const [filmInfo, setFilmInfo] = useState<Movie[]>([]);

  useEffect(() => {
    const searchMovie = async () => {
      const apikey = import.meta.env.VITE_API_URL3;
      const baseUrl = `https://api.themoviedb.org/3/movie/${movie_id}`;

      try {
        const response = await fetch(
          `${baseUrl}?api_key=${apikey}&page=${pageNum}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setFilmInfo(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    searchMovie();
  }, [movie_id, pageNum]);

  return { filmInfo };
};

export default useSearchMovies;
