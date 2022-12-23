import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    userinfo: {},
    userToken: null,
    error: null,
    success: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {}
})

export default userSlice.reducer