import useSearchMovies from "../hooks/fetchSearchMovie";

export default function Film() {
  const movieID = 0;
  const { filmInfo } = useSearchMovies(movieID, 1);

  return <div className="text-white">hello</div>;
}
