// Redux tool Kit
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
    },
})
export default appStore