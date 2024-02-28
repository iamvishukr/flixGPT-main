import React, { useRef } from 'react'
import logo from '../Images/logo.png'
//import userIcon from '../Images/userIcon.png'

import { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {

  const user = useSelector((store)=> store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/')
      }).catch((error) => {
        // An error happened.
        return <h1>Error!</h1>
      });
    }
  const [handleUserClick, setHandleUserClick] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();
  const Menus = ['User', 'About us', ];

  window.addEventListener('click', (e)=>{
    if (e.target !== menuRef.current && e.target !== imgRef.current){
      setHandleUserClick(false);
    }})
  return (
    <div className='absolute px-8 py-2 w-screen  bg-gradient-to-b from-black  z-10 flex justify-between '>
        <img src={logo} alt="logo" className='w-64 h-24'/>

        {user && <div className='h-12 w-12 mt-6 mr-12'>
            <img ref={imgRef} src={user.photoURL} className='rounded-sm shadow-lg' alt="user" onClick={()=>setHandleUserClick(!handleUserClick)} />
            
           { handleUserClick &&  <div className='bg-black bg-opacity-70 border-2 border-gray-600 rounded-md text-white w-32 h-44 -translate-x-10 mt-2 text-center font-semibold p-2 shadow-lg '>
              <ul ref={menuRef} className='mr-2'>
                {
                  Menus.map((menu)=>(
                    <li className='my-2 p-2 w-28  hover:bg-red-600 border border-gray-600 cursor-pointer rounded-md' onClick={()=>setHandleUserClick(false)} key={menu}>{menu} </li>
                  ))
                }
                <button onClick={handleSignOut} className='my-2 w-28 p-2 hover:bg-red-600 border border-gray-600 cursor-pointer rounded-md'>Sign out</button>
              </ul>
            </div> }
        </div>}
    
    </div>

    
  )
}

export default Header;