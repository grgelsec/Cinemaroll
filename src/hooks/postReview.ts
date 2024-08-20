import { useState } from "react";

const CreateMovieReview = async (review: string, movie_id: number) => {
  //const [movieReview, setReview] = useState(review);
  const api_key = import.meta.env.VITE_API_URL3;
  try {
    const response = await fetch(
      `
https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${api_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_review: review,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      //setReview(data);
      console.log(data);
    }
  } catch (error) {
    console.log("Error occoured", error);
  }
};

export default CreateMovieReview;
