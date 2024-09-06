import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

interface MovieReview {
    userId: number;
    movieId: number;
    reviewText: string;
}

const DataInsert = () => {
    const [dataToInsert, setDataToInsert] = useState<MovieReview | null>(null);

    useEffect(() => {
         const insertData = async () => {
            if (dataToInsert) {
                try {
                    const { data, error } = await supabase
                        .from("movie_reviews")
                        .insert([dataToInsert]);

                    if (error) throw error;

                    console.log('Data inserted successfully:', data);
                    setDataToInsert(null)
                } catch (error) {
                    console.error(error)
                }
            };

            insertData();
    }, [dataToInsert])
        
}


