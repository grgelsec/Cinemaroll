import { useEffect, useState } from "react";

type List = {
  created_by: string;
  description: string;
  item_count: number;
  id: number;
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
            fetch(
              `https://api.themoviedb.org/3/list/${id}?api_key=${api_key}&page=1`
            )
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
  }, [pageNum, listID]);

  return { listDetails };
};

export default useListDetails;
