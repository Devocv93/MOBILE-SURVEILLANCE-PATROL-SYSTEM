import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        userData: null,  
    },
    reducers: {
        setUserData: (state, data) => { 
            state.userData = data.payload
        },
        clearUserData: (state)=>{
            state.userData = null;
        } 
    },
})

export const { 
    setUserData, 
    clearUserData
} = authSlice.actions

export default authSlice.reducer