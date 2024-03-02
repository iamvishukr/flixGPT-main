import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies =() => {
//fetch data from TMDB API and update store
    const dispatch = useDispatch();
    const getPopularMovies = async () =>{
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/popular?page=2',
        API_OPTIONS
       );
       const json = await data.json();
       //console.log(json.results);
       dispatch(addPopularMovies(json.results));
  
    };
  
    useEffect(() =>{
      getPopularMovies();
    },[]);
};

export default usePopularMovies;