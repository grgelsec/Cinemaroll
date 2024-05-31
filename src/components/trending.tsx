import useMovies from "../hooks/fetchMovies";

export default function Movies() {
 const {filmList} = useMovies(1)
  
  return (
    <div className="flex items-center flex-col lg:px-40 md:px-40 sm:px-40 py-10">
      <header className="text-whitePurp font-semibold opacity-70 p-3 divide-x-4 border-b w-8/12 hover:opacity-100 hover:outline-none transition-sexy">
        Trending
      </header>
      <div className="flex row flex-wrap gap-3 justify-center px-20">
        {filmList.slice(0, 4).map((movie) => (
          <img
            className="flex lg:w-2/12 md:w-4/12 sm:w-5/12 rounded-md hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}
