import useAccountDetails from "../hooks/fetchAccountInfo";
import NavBar from "./navbar";
//import usePremadeLists from "../hooks/fetchUpcomingFilms";

export default function Home() {
  const { accountInfo } = useAccountDetails();
  //this aint gon work chief
  // const { upcomingFilms } = usePremadeLists();
  // console.log(upcomingFilms);
  return (
    <>
      <NavBar />
      <div className="flex justify-center w-full ring mt-5">
        <div className="flex justify-center w-9/12 md:w-4/12 lg:w-3/12 bg-white/10 backdrop-blur-md rounded-lg py-5">
          <p className="flex justify-center font-mono text-white text-xl sm:text-nowrap">
            Hey there, {accountInfo?.username}!
          </p>
        </div>
      </div>
    </>
  );
}
