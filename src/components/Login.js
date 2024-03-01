import React, { useState, useRef } from 'react'
import Header from './Header'
import background from '../Images/background.jpg'
import { checkValidEmail, checkValidPassword, /*checkValidName*/} from '../utils/Validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { USER_AVATAR } from '../utils/Constants';
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessageEmail,setErrorMessageEmail] = useState(null);
  const [errorMessagePassword,setErrorMessagePassword] = useState(null);
 // const [errorMessageName,setErrorMessageName] = useState(null);
 const dispatch = useDispatch(); 
  
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick =()=>{
    const messageEmail = checkValidEmail(email.current.value);
    const messagePassword = checkValidPassword(password.current.value);
  // const messageName = checkValidName(name.current.value);
    setErrorMessageEmail(messageEmail);
    setErrorMessagePassword(messagePassword);
  // setErrorMessageName(messageName);
    //console.log(email);
    //console.log(password);
    //console.log(name);

    //sign in sign up logic-----------------------------------------------------------------------
    if(messageEmail || messagePassword) return;
    if(!isSignInForm){
      //signup
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, 
          photoURL: USER_AVATAR,
        }).then(() => {
          // Profile updated!
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser(
            {
            uid: uid, 
            email: email, 
            displayName: displayName, 
            photoURL: photoURL
           }));
        }).catch((error) => {
          setErrorMessageEmail(error.message);
        });
        //console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessageEmail(errorMessage+'-'+ errorCode)
        // ..
      });

    }
    else{
      //signin
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
       // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessageEmail(errorMessage +''+ errorCode)
      });
    }

      
  }
  const toggleSignInForm =()=>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div className=''>
        <Header/>
        <div className='absolute'>
          <img src={background} alt="" className='  '/>
        </div>
    
      <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 p-12 absolute my-36 mx-auto right-0 left-0 bg-black text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl p-2 -mx-2 my-4'>{isSignInForm? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input ref={name} type="text" placeholder='Full Name' className='p-2 my-2 w-full bg-transparent border border-gray-400 rounded-sm' />}
        {/*{!isSignInForm && <p className='text-red-600 text-sm '>{errorMessageName}</p>}*/}
        <input ref={email} type="text" placeholder='Email or Phone number ' className='p-2 my-2 w-full bg-transparent border border-gray-400 rounded-sm'/>
        <p className='text-red-600 text-sm '>{errorMessageEmail}</p>
        <input ref={password} type="password" placeholder='Password' className='p-2 my-2 w-full bg-transparent border border-gray-400 rounded-sm' />
        <p className='text-red-600 text-sm '>{ errorMessagePassword}</p>
        
        <button className='p-2 my-2 bg-red-600 hover:bg-red-700 hover:cursor-pointer w-full rounded-sm' onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" :"Sign Up"}
        </button>
        {isSignInForm && <h3 className='text-gray-400 text-center my-2'>OR</h3>}
        {isSignInForm && <button className='p-2 my-2 bg-gray-200 bg-opacity-30 w-full rounded-sm'>Use a sign-in code</button>}
        {isSignInForm && <p className='p-2 text-center'>Forgot password?</p>}
       
       <span className='flex '>
        <p className='p-2 my-2 text-md'>{isSignInForm? 'New to flixGPT?' : 'Already Registered? '}</p>
        <p className='p-2 my-2 text-gray-300 cursor-pointer hover:underline font-bold ' onClick={toggleSignInForm}>{isSignInForm? 'Sign up now.': 'Sign in now.'}</p>
       </span>
        
      </form>
    </div>
  )
}

export default Login