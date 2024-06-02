import { useEffect, useState } from "react";

type List = {
  created_by: string;
  description: string;
  item_count: number;
};

type ListAPIResponse = {
  results: List[];
};

const useListDetails = (pageNum: number, listID: number) => {
    const [listInfo, setListInfo] = useState<List[]>([]);

  useEffect(() => {
    const getList = async () => {
        const baseURL = "https://api.themoviedb.org/3/list/"
        const api_key = import.meta.env.VITE_API_URL3

        const response = await fetch(`${baseURL}${listID}?api_key=${api_key}`)

        if(!response.ok){
            throw new Error(`HTTP request error: ${response.status}`);
        }

        const data: ListAPIResponse = await response.json();
        setListInfo(data.results)
    };
    getList();
  }, [pageNum, listID]);

  return { listInfo }
};

export default useListDetails
