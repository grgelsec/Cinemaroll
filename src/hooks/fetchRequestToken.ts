import { useState, useEffect } from "react";

type Request = {
  request_token: string;
};

const useRequestToken = () => {
  const [requestToken, setToken] = useState<string>();

  useEffect(() => {
    const getRequestToken = async () => {
      const apikey = import.meta.env.VITE_API_URL3;
      const baseUrl = "https://api.themoviedb.org/3/authentication/token/new";

      try {
        const response = await fetch(`${baseUrl}?api_key=${apikey}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: Request = await response.json();
        setToken(data.request_token);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getRequestToken();
  }, []);

  return { requestToken };
};

export default useRequestToken;
