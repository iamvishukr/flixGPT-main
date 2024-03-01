import React, { useEffect, useRef } from 'react'
import logo from '../Images/logo.png'
//import userIcon from '../Images/userIcon.png'

import { useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../utils/Firebase'
import { addUser, removeUser } from '../utils/userSlice'
//import Profile from './Profile'
const Header = () => {

  const user = useSelector((store)=> store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        return <h1>Error!</h1>
      });
    }
  const [handleUserClick, setHandleUserClick] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();

  const userName = user?.displayName;
  const usernameUpper = userName?.toUpperCase();
  
  //const profile = Profile;
  const Menus = ['Profile','About Us'];
  
  const dispatch = useDispatch();  
  window.addEventListener('click', (e)=>{
    if (e.target !== menuRef.current && e.target !== imgRef.current){
      setHandleUserClick(false);
    }})
  
  useEffect(()=>{
      const unsubscirbe = onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
              navigate('/browse')
              // ...
          } else {
              // User is signed out
              dispatch(removeUser());
              navigate('/');
          }
       });
       // unsubscribe when component unmounts
       return () => unsubscirbe 
  },[])  
  return (
    <div className='absolute px-8 py-0 w-screen  bg-gradient-to-b from-black  z-10 flex justify-between '>
        <img src={logo} alt="logo" className='w-64 h-24'/>

        {user && <div className='h-12 w-12 mt-6 mr-12'>
            <img ref={imgRef} src={user.photoURL}  className='rounded-sm shadow-lg' alt="user" onClick={()=>setHandleUserClick(!handleUserClick)} />
            
           { handleUserClick &&  <div className='bg-black bg-opacity-70 border-2 border-gray-600 rounded-md text-white w-32 h-fit -translate-x-10 mt-2 text-center font-semibold p-2 shadow-lg '>
              <ul ref={menuRef} className='mr-2'>
              <p className='text-purple-500 font-semibold hover:text-red-600 hover:font-bold cursor-default my-1'>-- {usernameUpper} --</p>
                {
                 Menus.map((menu)=>(
                    <li className='my-0 w-28 p-2 hover:bg-red-600 border border-gray-600 cursor-pointer rounded-md' onClick={()=>setHandleUserClick(false)} key={menu}>{menu}</li>
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