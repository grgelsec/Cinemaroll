import { useLocation, useSearchParams } from "react-router-dom";
import useSearchMovies from "../hooks/fetchSearchMovie";
import { useEffect } from "react";

//routing to film but not routing to film/movie_id

export default function Film() {
  //const movieID = 0;
  //const { filmInfo } = useSearchMovies(movieID, 1);
  const location = useLocation();

  console.log("hey");
  console.log(location.pathname);

  return <p className="text-white">{location.pathname}</p>;
}
