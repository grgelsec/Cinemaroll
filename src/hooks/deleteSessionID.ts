//import useLoginStatus from "./fetchLoginStatus";

const deleteSessionID = async () => {
  const sessionID = sessionStorage.getItem("sessionID");
  const apikey = import.meta.env.VITE_API_URL3;
  try {
    const response = fetch(
      `https://api.themoviedb.org/3/authentication/session?api_key=${apikey}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionID,
        }),
      }
    );
    if ((await response).ok) {
      const data = (await response).json;
      console.log(data);
    } else {
      console.log("log out failed");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default deleteSessionID;
