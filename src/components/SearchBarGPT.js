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
    <div className="pt-[14%]  -translate-x-14 flex justify-center ">
      <form
        className="w-1/2 bg-black bg-opacity-70 grid grid-cols-12 rounded-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey]?.gptSearchPlaceHolder}
          className="p-4 px-8 m-4 col-span-10 text-xl font-sans rounded-2xl"
        />
        <button
          className="col-span-2 text-center ml-0 pl-2 text-lg m-4 hover:bg-red-700 rounded-2xl bg-red-600 text-white flex items-center"
          onClick={handleGptSearchClick}
        >
          <SearchIcon />
          &nbsp;{lang[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default SearchBarGPT;
