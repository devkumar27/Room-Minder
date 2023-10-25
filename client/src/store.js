import { createSlice, configureStore } from '@reduxjs/toolkit';
import { login, logout } from './reducers/userReducers.js';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false
    },
    reducers: {
        login, 
        logout
    }
})

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
})