import React from "react";
import lang from "../utils/languageConstants";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
const SearchBarGPT = () => {
  
  const langKey = useSelector((store) => store.config.lang).toLowerCase() 
  //console.log(langKey);
  return (
    <div className="pt-[8%] -translate-x-24 flex justify-center ">
      <form className="w-1/2 bg-black bg-opacity-70 grid grid-cols-12 rounded-2xl">
        <input
          type="text"
          placeholder={lang[langKey]?.gptSearchPlaceHolder}
          className="p-4 px-8 m-4 col-span-10 text-xl font-sans rounded-2xl"
        />
        <button className="col-span-2 text-center ml-0 pl-2 text-lg m-4 hover:bg-red-700 rounded-2xl bg-red-600 text-white flex items-center">
          <SearchIcon />&nbsp;{lang[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default SearchBarGPT;
