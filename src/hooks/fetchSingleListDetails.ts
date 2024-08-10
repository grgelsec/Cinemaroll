import { useState, useEffect } from "react";

// type Movie = {
//   backdrop_path: string;
//   id: number;
//   title: string;
//   original_title: string;
//   overview: string;
//   poster_path: string;
//   media_type: string;
//   adult: false;
//   original_language: string;
//   genre_ids: number[];
//   popularity: number;
//   release_date: string;
//   video: false;
//   vote_average: number;
//   vote_count: number;
// };

// type items = {
//   result: Movie[];
// };

type Details = {
  created_by: string;
  description: string;
  favorite_count: number;
  id: number;
  iso_639_1: string;
  item_count: number;
  items: [
    {
      backdrop_path: string;
      id: number;
      title: string;
      original_title: string;
      overview: string;
      poster_path: string;
      media_type: string;
      adult: false;
      original_language: string;
      genre_ids: number[];
      popularity: number;
      release_date: string;
      video: false;
      vote_average: number;
      vote_count: number;
    }
  ];
  name: string;
  page: number;
  total_pages: number;
  total_results: number;
};

const useSinlgeListDetails = (listID: string | undefined) => {
  const [singleListDetails, setList] = useState<Details>();

  useEffect(() => {
    const getListDetails = async () => {
      const apikey = import.meta.env.VITE_API_URL3;
      const baseUrl = "https://api.themoviedb.org/3/list/";

      try {
        const response = await fetch(`${baseUrl}${listID}?api_key=${apikey}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: Details = await response.json();
        setList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getListDetails();
  }, [listID]);

  return { singleListDetails };
};

export default useSinlgeListDetails;
