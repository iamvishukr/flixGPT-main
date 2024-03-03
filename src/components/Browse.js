import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePoupularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpComingMovies";
import SearchGPT from "./SearchGPT";
import { useSelector } from "react-redux";
const Browse = () => {
  const showSearchGPT = useSelector((store) => store.gpt.showSearchGPT);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {showSearchGPT ? (
        <SearchGPT />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
