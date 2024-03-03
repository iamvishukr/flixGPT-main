import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-36 translate-y-16 px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video '>
        <h1 className='text-4xl pl-0 font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/4'>{overview}</p>
        <div className='py-4 space-x-4 ml-0'>
            <button className=' pl-1 pr-8 bg-white hover:bg-opacity-90 py-1 text-black rounded-sm' ><PlayArrowIcon/> Play</button>
            <button className=' px-4 bg-gray-700 hover:bg-opacity-90 py-1 text-white '><InfoIcon/> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;