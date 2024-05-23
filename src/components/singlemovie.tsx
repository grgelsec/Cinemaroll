import { useEffect, useState } from "react";

export default function GetMovie() {

        type Movie = {
          poster_path: string;
          genre_ids: number[];
          page: number;
          name: string;
          id: number;
        };
      
        type MovieAPIResponse = {
          results: Movie[];
        };
      
       const [movie, setMovie] = useState<Movie[]>([]);

       //const movieID = movie.map((movie) => movie.id)

    useEffect(() => {
        const getMovie = async (movieID: number) => {
          const api_key = import.meta.env.VITE_API_URL3;
          const baseURL = "https://api.themoviedb.org/3/movie/";
          //"https://api.themoviedb.org/3/movie/1011985/lists?api_key="
    
          try {
            const response = await fetch(`${baseURL}${movieID}/lists?api_key=${api_key}`);
    
            if (!response.ok) {
              throw new Error(`HTTP error: ${response.status}`);
            }
    
            const data: MovieAPIResponse = await response.json();
            setMovie(data.results);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      }, []);

}