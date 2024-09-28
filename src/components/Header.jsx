import React,{useEffect} from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFLIX_LOGO } from '../utils/constant';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  
  const handleSignOut = () => {
    // Implement sign out logic here
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.error('Sign-out failed:', error);
      navigate("/error");
    });
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({
          udi: uid, 
          email: email, 
          displayName: displayName, 
          photoURL: photoURL
        })
      );
      navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }

      //Unsubscribe when component unmount
      return () => unsubscribe();
    });
    
  },[])
  return (
    <>  
      <div className='absolute px-8 py-2 z-10 w-screen flex justify-between bg-gradient-to-b from-black'>
        <img
          src={NETFLIX_LOGO}
          alt='Netflix'
          className='max-w-60' />
        {user && <div className='flex p-2'>
          <img src={user?.photoURL}
            alt="User Icon"
            className='w-12 h-12'
          />
          <button className='font-bold text-white' onClick={handleSignOut}>(Sign Out)</button>
        </div>}
      </div>
    </>

  )
}

export default Header;