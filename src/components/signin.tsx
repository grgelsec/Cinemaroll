import CreateSessionID from "../hooks/postSessionID";
import useRequestToken from "../hooks/fetchRequestToken";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "./SessionContext";

export default function SignIn() {
  const { sessionId, signOut } = useSession();
  const { requestToken } = useRequestToken();

  if (sessionId) {
    return (
      <div className="">
        <Link
          to={`http://localhost:5173/`}
          className="flex flex-wrap p-3 text-white bg-mediumPurp font-mono rounded-lg"
          onClick={() => signOut()}
        >
          Log Out
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <Link
        to={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173/sign-in/auth-page`}
        className="flex flex-wrap p-3 text-white bg-mediumPurp font-mono rounded-lg"
      >
        Sign In
      </Link>
    </div>
  );
}

export function AuthPage() {
  const { signIn } = useSession();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const requestToken: string | null = urlParams.get("request_token");
  console.log(requestToken);

  const handleCreateSession = async () => {
    if (requestToken) {
      try {
        const sesssionId = await CreateSessionID(requestToken);
        if (sesssionId) {
          signIn(sesssionId);
          navigate("/home");
        }
      } catch (error) {
        console.log("Failed to create session: ", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex justify-center flex-wrap w-1/3 space-y-4">
          <div className="flex justify-center w-1/3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-20 bg-green-500 rounded-lg"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="flex justify-center w-full text-white font-mono">
            Authorized!
          </div>
          <div className="flex justify-center w-full">
            <Link
              to={"http://localhost:5173/home"}
              className="flex justify-center w-2/12 py-3 rounded-xl bg-mediumPurp"
              onClick={handleCreateSession}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
