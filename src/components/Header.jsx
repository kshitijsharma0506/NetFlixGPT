import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    // Implement sign out logic here
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.error('Sign-out failed:', error);
      navigate("/error");
    });
  }
  return (
    <>
      <div className='absolute px-8 py-2 z-10 w-screen flex justify-between bg-gradient-to-b from-black'>
        <img
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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