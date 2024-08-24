import { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";

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
  rating: number;
};

type MovieAPIResponse = {
  results: Movie[];
};

const useAccountRatings = () => {
  const [accountRatings, setRatings] = useState<Movie[]>([]);
  //const [ratingsArray, setRatingsArray] = useState<Movie[]>([]);
  const sessionId = useSession();
  const sessionString = sessionId.sessionId;

  useEffect(() => {
    const getAccountRatings = async () => {
      const api_key = import.meta.env.VITE_API_URL3;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/account/account_id/rated/movies?session_id=${sessionString}&sort_by=created_at.asc&api_key=${api_key}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setRatings(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAccountRatings();
  }, [sessionString]);

  return { accountRatings };
};

export default useAccountRatings;
