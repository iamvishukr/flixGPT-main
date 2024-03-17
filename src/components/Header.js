import React, { useEffect, useRef } from "react";
import logo from "../Images/logo.png";
//import userIcon from '../Images/userIcon.png'
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../utils/Firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleSearchGPTview } from "../utils/searchGptSlice";
import { SUPPORTED_LANG } from "../utils/Constants";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        return <h1>Error!</h1>;
      });
  };
  const [handleUserClick, setHandleUserClick] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();

  const userName = user?.displayName;
  const usernameUpper = userName?.toUpperCase();
  const handleSearchGPTclick = () => {
    dispatch(toggleSearchGPTview());
  };

  const Menus = ["About Us"];

  const dispatch = useDispatch();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setHandleUserClick(false);
    }
  });
  
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  const showSearchGpt = useSelector((store) =>store.gpt.showSearchGPT);
  useEffect(() => {
    const unsubscirbe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscirbe;
  }, []);

  
  return (
    <div className=" md:px-8 md:mx-2 mx-0 w-screen bg-gradient-to-b md:mt-24 mt-5 pt-3 from-black absolute bg-transparent z-50 flex flex-col md:flex-row justify-between">
      <img src={logo} alt="logo" className="md:w-64 md:h-24 w-24 -translate-y-2 h-12" />

      {user && (
        <div className="md:h-12 md:w-fit   md:absolute h-6 w-6 md:mt-6 mt-0 -translate-y-11 md:-translate-y-2  md:mr-96  flex   md:translate-x-[1000px] translate-x-[280px] gap-4 ">
           {showSearchGpt && <select className=" md:h-12 h-6 rounded-lg md:translate-x-16  md:mr-16 mr-0 md:px-2 px-0 md:text-lg text-xs bg-red-600 text-white " onChange={handleLanguageChange}>
            {SUPPORTED_LANG.map((lang) => (
              <option className="bg-black max-h-2 size-1 text-sm md:text-lg bg-opacity-90 border-gray-600   text-white" key={lang.identifier} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="md:px-4 md:text-lg md:mx-10 px-1 text-xs  rounded-lg hover:bg-red-700  bg-red-600 text-white flex items-center"
            onClick={handleSearchGPTclick}
          >
            <SearchIcon fontSize="small" />{!showSearchGpt ? "GPT" : "Home"}
          </button>
         
          <img
            ref={imgRef}
            src={user.photoURL}
            className="rounded-sm shadow-lg "
            alt="user"
            onClick={() => setHandleUserClick(!handleUserClick)}
          />

          {handleUserClick && (
            <div className="bg-black bg-opacity-90 border-2  md:translate-y-16  border-gray-600 rounded-md text-white md:w-fit w-[70px] h-fit -translate-x-[60px]  md:h-fit  md:-translate-x-[114px] md:mt-0 mt-8 text-center font-semibold md:p-2 p-0 shadow-lg ">
              <ul ref={menuRef} className="mr-2  w-full ">
                <p className="text-purple-500  text-xs md:text-lg font-semibold hover:text-red-600 hover:font-bold cursor-default my-1">
                  {usernameUpper} 
                </p>
                {Menus.map((menu) => (
                  <li
                    className="my-0 md:w-28 h-fit w-fit text-xs md:text-lg md:p-2 px-1 hover:bg-red-600 border border-gray-600 cursor-pointer rounded-md"
                    onClick={() => setHandleUserClick(false)}
                    key={menu}
                  >
                    {menu}
                  </li>
                ))}
                <button
                  onClick={handleSignOut}
                  className="my-2 md:w-28 w-fit md:p-2 px-1 text-xs md:text-lg hover:bg-red-600 border border-gray-600 cursor-pointer rounded-md"
                >
                  Sign Out
                </button>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
