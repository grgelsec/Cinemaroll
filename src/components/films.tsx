import { useState, useEffect } from "react";

export default function Films() {
  type Movie = {
    poster_path: string;
    title: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
  };

  type MovieAPIResponse = {
    results: Movie[];
  };

  const [filmList, setFilmList] = useState<Movie[]>([]);

  useEffect(() => {
    const getFilm = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setFilmList(data.results);
        console.log(data.results.slice(0, 40));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFilm();
  }, []);

  return (
    <>
      <div>
        Hello
      </div>
    </>
  );
}
