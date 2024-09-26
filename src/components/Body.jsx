import React, { useEffect } from 'react';
import {onAuthStateChanged} from "firebase/auth";
import { auth } from '../utils/firebase';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';
import Browse from './Browse';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/browse",
      element: <Browse />
    }
  ])
  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({
          udi: uid, 
          email: email, 
          displayName: displayName, 
          photoURL: photoURL
        }));
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
    
  },[])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default Body