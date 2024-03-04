import React from "react";
import MovieSuggestion from "./MovieSuggestion";
import SearchBarGPT from "./SearchBarGPT";
import background from "../Images/background.jpg";
const SearchGPT = () => {
  return (
    <div className="-mt-28">
      <div className="absolute -z-10 ">
        <img src={background} alt="" />
      </div>
      <SearchBarGPT />
      <MovieSuggestion />
    </div>
  );
};

export default SearchGPT;
