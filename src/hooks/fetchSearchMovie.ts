import { useState, useEffect } from "react";

type Movie = {
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  id: number;
  origin_country: [string];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  vote_average: number | undefined;
};

// type MovieAPIResponse = {
//   results: Movie[];
// };

const useSearchMovies = (movie_id: string | undefined) => {
  const [filmInfo, setFilmInfo] = useState<Movie>();

  useEffect(() => {
    const searchMovie = async () => {
      const apikey = import.meta.env.VITE_API_URL3;
      const baseUrl = `https://api.themoviedb.org/3/movie`;

      try {
        const response = await fetch(
          `${baseUrl}/${movie_id}?api_key=${apikey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: Movie = await response.json();
        setFilmInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    searchMovie();
  }, [movie_id]);
  return { filmInfo };
};

export default useSearchMovies;
