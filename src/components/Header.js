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
    <div className=" px-8 py-0 w-screen bg-gradient-to-b mt-24 from-black absolute bg-transparent z-50 flex justify-between ">
      <img src={logo} alt="logo" className="w-64 h-24" />

      {user && (
        <div className="h-12 w-12 mt-6 mr-96 flex ">
          <button
            className="px-4 text-lg mx-10 rounded-2xl hover:bg-red-700  bg-red-600 text-white flex items-center"
            onClick={handleSearchGPTclick}
          >
            <SearchIcon /> GPT
          </button>
          <select className="h-12 rounded-2xl  mr-16 px-2 bg-red-600 text-white " onChange={handleLanguageChange}>
            {SUPPORTED_LANG.map((lang) => (
              <option className="bg-black bg-opacity-90 border-gray-600   text-white" key={lang.identifier} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
          <img
            ref={imgRef}
            src={user.photoURL}
            className="rounded-sm shadow-lg"
            alt="user"
            onClick={() => setHandleUserClick(!handleUserClick)}
          />

          {handleUserClick && (
            <div className="bg-black bg-opacity-90 border-2 border-gray-600 rounded-md text-white w-32 h-fit -translate-x-[90px] mt-16 text-center font-semibold p-2 shadow-lg ">
              <ul ref={menuRef} className="mr-2">
                <p className="text-purple-500 font-semibold hover:text-red-600 hover:font-bold cursor-default my-1">
                  -- {usernameUpper} --
                </p>
                {Menus.map((menu) => (
                  <li
                    className="my-0 w-28 p-2 hover:bg-red-600 border border-gray-600 cursor-pointer rounded-md"
                    onClick={() => setHandleUserClick(false)}
                    key={menu}
                  >
                    {menu}
                  </li>
                ))}
                <button
                  onClick={handleSignOut}
                  className="my-2 w-28 p-2 hover:bg-red-600 border border-gray-600 cursor-pointer rounded-md"
                >
                  Sign out
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
