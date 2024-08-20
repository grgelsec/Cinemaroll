import NavBar from "./navbar";
import CreateMovieReview from "../hooks/postReview";

export default function Profile() {
  // const handleMovieReview = async () => {
  const review = CreateMovieReview("Great Movie!", 718821);
  console.log(review);
  //};
  return (
    <div>
      <NavBar></NavBar>
      <div className="flex flex-wrap justify-center w-full ring-white mt-5">
        <div className="flex justify-center w-2/12 rounded-full space-x-2 font-mono text-lightPurp bg-white/10 transition-sexy py-2">
          <button className="w-1/3 rounded-full transition-sexy focus:bg-white/10 focus:backdrop-blur-md py-1">
            Films
          </button>
          <button className="w-1/3 rounded-full focus:bg-white/10 focus:backdrop-blur-md">
            Lists
          </button>
        </div>
      </div>
    </div>
  );
}
