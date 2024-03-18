import React from "react";
import MovieSuggestion from "./MovieSuggestion";
import SearchBarGPT from "./SearchBarGPT";
import bg3 from "../Images/bg3.jpg";
const SearchGPT = () => {
  return (
    <>
      <div className="md:-mt-28 -mt-6 w-[100%] ">
        <div className="fixed -z-10 bg-cover ">
          <img src={bg3} alt="" className="fixed h-[114%]  md:h-fit " />
        </div>
        <SearchBarGPT />
      </div>
      <div className="m-auto flex  w-[100%]">
        <MovieSuggestion />
      </div>
    </>
  );
};

export default SearchGPT;
