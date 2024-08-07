import { useState, useEffect } from "react";

type Review = {
  author_details: {
    username: string;
    rating: number;
  };
  content: string;
  created_at: string;
  total_pages: number;
};

type MovieAPIResponse = {
  results: Review[];
};

const useReviews = (movie_id: string | undefined, pageNum: number) => {
  const [reviewList, setReviewList] = useState<Review[]>([]);

  useEffect(() => {
    const getReview = async () => {
      const apikey = import.meta.env.VITE_API_URL3;
      const baseUrl = "https://api.themoviedb.org/3/movie/";

      try {
        const response = await fetch(
          `${baseUrl}${movie_id}/reviews?api_key=${apikey}&page=${pageNum}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setReviewList(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getReview();
  }, [movie_id, pageNum]);

  return { reviewList };
};

export default useReviews;
