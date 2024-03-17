import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/Constants";
import { addGptMoviesResult } from "../utils/searchGptSlice";
const SearchBarGPT = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang).toLowerCase();
  const searchText = useRef(null);
  const searchMovies = async (movie) => {  // search movies in TMDB
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1", API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    //console.log(searchText.current.value);
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query :" +
      searchText.current.value +
      ". Only give me names of five movies, comma separated. for example - Narnia, Harry Potter, spiderman: far from home, Batman : the dark knight, Elemental. ";
    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResult) {
      //This is not a suitable topic for recommendations. If you have any other movie genre or topic in mind, feel free to ask!
    }
    console.log(gptResult.choices?.[0]?.message?.content);
    const gptMovies = gptResult.choices?.[0]?.message?.content.split(",");           //make array of movies

    const promiseArray = gptMovies.map(movie => searchMovies(movie))              
     //for each movie I will search TMDB API -- it will not give result but will return array of promises for all 5 results
     //eg.  [promise], [promise], [promise], [promise], [promise]


    const tmdbResults = await Promise.all(promiseArray);     
    dispatch(addGptMoviesResult({movieNames:gptMovies, movieResults:tmdbResults}));       
  };
  return (
    <div className="h-full w-full">
    <div className="md:pt-[14%] pt-[50%]  md:-translate-x-14 -translate-x-2 items-center flex justify-center ">
      <form
        className="md:w-1/2 p-1 w-10/12 h-fit bg-black bg-opacity-70 grid grid-cols-12 rounded-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey]?.gptSearchPlaceHolder}
          className="md:p-4 p-1 md:px-8 px-4 md:m-4 m-2 md:col-span-10 col-span-9 md:text-xl text-xs font-sans rounded-2xl"
        />
        <button
          className="md:col-span-2 px-1 col-span-3 text-center ml-0 pl-2  h-2/3 md:text-lg text-xs w-full md:w-3/4 md:m-2 md:translate-y-2  m-2 hover:bg-red-700 rounded-2xl bg-red-600 text-white"
          onClick={handleGptSearchClick} 
        >
           <SearchIcon fontSize="small" />
          &nbsp;{lang[langKey]?.search}
        </button>
      </form>
    </div>
    </div>
  );
};

export default SearchBarGPT;
