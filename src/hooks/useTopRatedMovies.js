import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies =() => {
//fetch data from TMDB API and update store
    const topRatedMovies = useSelector((store)=> store.movies.topRatedMovies);
    const dispatch = useDispatch();
    const getTopRatedMovies = async () =>{
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?page=2',
        API_OPTIONS
       );
       const json = await data.json();
       //console.log(json.results);
       dispatch(addTopRatedMovies(json.results));
  
    };
  
    useEffect(() =>{
      !topRatedMovies && getTopRatedMovies();
    },[]);
};

export default useTopRatedMovies;