import NavBar from "./navbar";
import CreateMovieReview from "../hooks/postReview";
import useAccountRatings from "../hooks/accountInfo/fetchAccountRatings";
import { useState } from "react";

export default function Profile() {
  const review = CreateMovieReview(1079091);
  console.log(review);
  const [selectedOption, setSelectedOption] = useState<string>("films");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="flex flex-wrap justify-center w-full ring-white mt-5">
        <div className="flex justify-center w-2/12 rounded-full space-x-2 font-mono text-lightPurp bg-white/10 transition-sexy py-2">
          <label className="radio flex items-center justify-center rounded-lg p-1 cursor-pointer">
            <input
              type="radio"
              value="films"
              className="peer hidden"
              onChange={handleOptionChange}
            />
            <span className="tracking-widest peer-checked:bg-mediumPurp text-white font-mono p-2 rounded-xl transition-sexy">
              Films
            </span>
          </label>

          <label className="radio flex items-center justify-center rounded-xl p-1 cursor-pointer">
            <input
              type="radio"
              value="lists"
              className="peer hidden"
              onChange={handleOptionChange}
            />
            <span className="tracking-widest peer-checked:bg-mediumPurp text-white font-mono p-2 rounded-lg transition-sexy">
              Lists
            </span>
          </label>
        </div>
      </div>
      <div className="w-full py-10">
        {selectedOption === "films" && <RatedFilms />}
        {selectedOption === "lists" && <CreatedLists />}
      </div>
    </div>
  );
}

export const RatedFilms = () => {
  const accountRatings = useAccountRatings();
  console.log(accountRatings);
  return (
    <div className="flex justify-center w-full">
      <div className="flex justify-center w-2/3 py-10 ring rounded-lg">{}</div>
    </div>
  );
};

export const CreatedLists = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-1/3 py-10 bg-white/10">no penis</div>
    </div>
  );
};
