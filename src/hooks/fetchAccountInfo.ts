import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";

type account = {
  avatar: {
    gravatar: {
      hash: string | null;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

const useAccountDetails = () => {
  const [accountInfo, setAccountInfo] = useState<account | null>();
  const sessionId = useSession();
  const sessionString = sessionId.sessionId;

  useEffect(() => {
    const getAccountInfo = async () => {
      const api_key = import.meta.env.VITE_API_URL3;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/account/account_id?session_id=${sessionString}&api_key=${api_key}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: account = await response.json();
        setAccountInfo(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAccountInfo();
  }, [sessionString]);

  return { accountInfo };
};

export default useAccountDetails;
