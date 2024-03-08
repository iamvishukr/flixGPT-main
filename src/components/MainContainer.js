import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const movies = useSelector(store=>store.movies?.nowPlayingMovies)
    if(!movies) return;    // no movies thn return
    const mainMovie = movies[18];
    const {original_title, overview, id} = mainMovie;
    //console.log(mainMovie);
  return (

    <div className='md:-mt-28  -mt-7'>
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer