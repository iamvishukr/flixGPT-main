import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
const VideoTitle = ({title, overview}) => {
  //const playMovie = useSelector((store) => store.movies.)
  const handlePlayClick = () => {

  }
  return (
    <div className='md:pt-36 pt-4 translate-y-6 md:px-12 px-4 absolute text-white bg-gradient-to-r from-black w-screen aspect-video '>
        <h1 className='md:text-4xl text-[12px] pl-0 font-bold md:translate-y-36 translate-y-12'>{title}</h1>
        <p className='md:text-lg text-[8px] py-6  md:w-1/3 w-52 text-white opacity-60 md:translate-y-36 translate-y-6'>{overview}</p>
        <div className='md:py-32  py-1 h-fit w-fit md:space-x-4 space-x-3 ml-0 flex flex-row ' >
            <button className=' md:text-lg size-6 md:size-fit  text-[10px]  items-center flex w-12 md:pl-1 pl-0 pr-8 bg-white hover:bg-opacity-90 py-1 text-black rounded-sm' onClick={handlePlayClick} ><PlayArrowIcon fontSize='small'/> Play</button>
            <button className=' md:text-lg size-6 md:size-fit text-[10px]  items-center flex w-12 md:pl-1 pl-0 pr-8  bg-gray-700 hover:bg-opacity-90 py-1 text-white '><InfoIcon fontSize='small' />&nbsp;Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;