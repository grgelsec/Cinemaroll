import useAccountDetails from "../hooks/accountInfo/fetchAccountInfo";
import NavBar from "./navbar";

export default function Home() {
  const { accountInfo } = useAccountDetails();
  console.log(accountInfo);
  return (
    <>
      <NavBar />
      <div className="space-y-5">
        <div className="flex justify-center w-full ring mt-5">
          <div className="flex justify-center w-9/12 md:w-4/12 lg:w-3/12 bg-white/10 backdrop-blur-md rounded-lg py-5">
            <p className="flex justify-center font-mono text-white text-xl sm:text-nowrap">
              Hey there, {accountInfo?.username}!
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full ring p-5 space-x-5">
          <div className="flex w-1/2 bg-white/10 p-10 rounded-xl"></div>
          <div className="flex w-1/2 bg-white/10 p-10 rounded-xl"></div>
        </div>
      </div>
    </>
  );
}
