import { useEffect, useState } from "react";

type List = {
  item_count: number;
};

type ListAPIResponse = {
  results: List[];
};

const useListDetails = (listID: number[], pageNum: number) => {
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

        const data: ListAPIResponse[] = await Promise.all(
          response.map((response) => response.json())
        );
        const allResults = data.flatMap((response) => response.results);
        setListDetails(allResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getList();
  }, [listID, pageNum]);

  return { listDetails };
};

export default useListDetails;
