import React from "react";
import MovieList from "./MovieList";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className=" bg-black ">
      <div className="md:-mt-44 -mt-6 relative z-20  ">
        <MovieList title={"Now Playings"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Highly Rated"} movies={movies.topRatedMovies} />
  
        <MovieCard />
      </div>
    </div>
  );
};

export default SecondaryContainer;
