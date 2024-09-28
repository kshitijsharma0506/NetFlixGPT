import { useState, useRef } from 'react';
import Header from './Header';
import { checkData } from '../utils/validatation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR, BACKGROUND_IMG } from '../utils/constant';

const Login = () => {
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
            photoURL: USER_AVATAR
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({
              udi: uid, 
              email: email, 
              displayName: displayName, 
              photoURL: photoURL
            }));
          }).catch((error) => {
            setErrorMessage(error);
          });
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
            src={BACKGROUND_IMG} alt="Background Img"
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