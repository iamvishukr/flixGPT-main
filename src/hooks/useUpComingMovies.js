import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies =() => {
//fetch data from TMDB API and update store
const upComingMovies = useSelector((store)=> store.movies.upComingMovies);
    const dispatch = useDispatch();
    const getUpcomingMovies = async () =>{
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?page=2',
        API_OPTIONS
       );
       const json = await data.json();
       //console.log(json.results);
       dispatch(addUpcomingMovies(json.results));
  
    };
  
    useEffect(() =>{
     !upComingMovies && getUpcomingMovies();
    },[]);
};

export default useUpcomingMovies;