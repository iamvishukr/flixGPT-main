import { IMG_CDN_URL } from "../utils/Constants";

const MovieCard = ({ posterPath }) => {
  if(!posterPath) return null;
  return (
    <div className="md:w-36 w-24 md:pr-4 pr-2" >
      <img alt="Movie card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
