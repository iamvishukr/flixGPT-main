import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;
  return (
    <div className="md:p-4 p-2  md:m-4 bg-black text-white bg-opacity-90 overflow-x-scroll no-scrollbar">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList                                      //Re-used MovieList component
            title={movieName}
            key={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSuggestion;
