import React from "react";
import lang from "../utils/languageConstants";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
const SearchBarGPT = () => {
  
  const langKey = useSelector((store) => store.config.lang); 
  return (
    <div className="pt-[10%] flex justify-center ">
      <form className="w-1/2 bg-black bg-opacity-70 grid grid-cols-12">
        <input
          type="text"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          className="p-4 m-4 col-span-10 text-xl font-sans"
        />
        <button className="col-span-2 px-8 ml-0 pl-6 text-lg m-4 hover:bg-red-700  bg-red-600 text-white flex items-center">
          <SearchIcon />{lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default SearchBarGPT;
