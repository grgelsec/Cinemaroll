//need to write a post request that takes in params, this post request will be called in the authorized page
//need to use useParams to grab the params from the url and put them into the post request to receive the needed sessionID

// type Request = {
//   request_token: string;
// };

const createSessionID = async (requestToken: string | null) => {
  const apikey = import.meta.env.VITE_API_URL3;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${apikey}`,
      {
        method: "POST", //specify POST request
        headers: {
          "Content-Type": "application/json", //server expects josn
        },
        body: JSON.stringify({
          request_token: requestToken, //send the apporved request
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.log("Error occoured", error);
  }
};
export default createSessionID;
