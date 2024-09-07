import { useSession } from "../../context/SessionContext";

const DeleteMovieRating = async (movie_id: number | undefined) => {
  const sessionId = useSession();
  const sessionString = sessionId.sessionId;

  const api_key = import.meta.env.VITE_API_URL3;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?session_id=${sessionString}&api_key=${api_key}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP request error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error occoured: ", error);
  }
};

export default DeleteMovieRating;
