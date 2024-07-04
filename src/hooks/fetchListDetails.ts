import { useEffect, useState } from "react";

type List = {
  item_count: number;
};
/*
Lesson Learned: Not every api url is going to have a results array in their JSON

type ListAPIResponse = {
  results: List[];
};
*/

const useListDetails = (listID: number[]) => {
  const [listDetails, setListDetails] = useState<List[]>([]);

  useEffect(() => {
    const getList = async () => {
      //const baseURL = "https://api.themoviedb.org/3/list/";
      const api_key = import.meta.env.VITE_API_URL3;

      try {
        const response = await Promise.all(
          listID.map((id) =>
            fetch(`https://api.themoviedb.org/3/list/${id}?api_key=${api_key}`)
          )
        );

        const data: List[] = await Promise.all(
          response.map((response) => response.json())
        );
        //const allResults = data.flatMap((response) => response);
        setListDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getList();
  }, [listID]);

  return { listDetails };
};

export default useListDetails;
