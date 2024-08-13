import NavBar from "./navbar";
import useRequestToken from "../hooks/fetchRequestToken";
import { Link } from "react-router-dom";

export default function SignIn() {
  const { requestToken } = useRequestToken();
  console.log(requestToken);
  return (
    <>
      <NavBar></NavBar>
      <div className="flex  justify-center w-full ring py-10">
        <Link
          to={`https://www.themoviedb.org/authenticate/${requestToken?.request_token}`}
          className="w-1/12 p-3 text-white bg-purple-300 font-mono rounded-lg"
        >
          Sign In
        </Link>
      </div>
    </>
  );
}
