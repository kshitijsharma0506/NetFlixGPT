import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkData } from '../utils/validatation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = checkData(email.current.value, password.current.value);
    setErrorMessage(errorMsg);
    if (errorMessage) return;

    // create user account / sign in

    if (!isSignedIn) {
      // sign up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBNMmIF6YC4mjDiW_z2TpYqm93iiD1LYpfA&s"
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({
              udi: uid, 
              email: email, 
              displayName: displayName, 
              photoURL: photoURL
            }));
            navigate("/browse");
          }).catch((error) => {
            setErrorMessage(error);
          });
          
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setErrorMessage(`${errorCode}:- ${errorMessage}`);
        });
    }
    else {          
      // Signed in 
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setErrorMessage(`${errorCode}:- ${errorMessage}`);
        });

    }
  }

  return (
    <>
      <div>
        <Header />
        <div className='absolute'>
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/47c2bc92-5a2a-4f33-8f91-4314e9e62ef1/web/IN-en-20240916-TRIFECTA-perspective_72df5d07-cf3f-4530-9afd-8f1d92d7f1a8_medium.jpg" alt="Background Img"
          />
        </div>

        <form className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80 '>
          <h1 className='text-3xl font-bold py-4'>
            {isSignedIn ? 'Sign In' : 'Sign Up'}
          </h1>
          {!isSignedIn && <input type="text" name="userName" placeholder='User Name' className='p-4 my-4 w-full bg-gray-700' ref={name}/>}
          <input type="text" name="email_or_phone" placeholder='Email or Mobile Number' className='p-4 my-4 w-full bg-gray-700' ref={email} />
          <input type="password" name="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700' ref={password} />
          <button className='bg-red-700 p-4 my-4 w-full rounded-lg cursor-pointer' onClick={handleSubmit}>
            {isSignedIn ? 'Sign In' : 'Sign Up'}
          </button>
          <span className='text-red-500'>{errorMessage}</span>
          <p className='text-center text-gray-400 my-4 cursor-pointer' onClick={handleSignIn}>
            {isSignedIn ? `Don't have an account? Sign Up` : `Already have an account? Sign In`}
          </p>
        </form>
      </div>
    </>
  )
}

export default Login