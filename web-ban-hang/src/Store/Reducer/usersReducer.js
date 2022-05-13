import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8800/api';

export const getUsersInStore = createAsyncThunk(
    'getUsersInStore/getUsersInStoreFetch',
    async () => {
        try {
            const res = await axios.get(`${url}/users/all`);
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const getUser = createAsyncThunk(
    'getUser/getUserFetch',
    async ({ userId }) => {
        try {
            const res = await axios.get(`${url}/users/${userId}`);
            console.log(res.data);

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

const usersSlice = createSlice({
    name: 'users', // ten cua action
    initialState: {
        users: [],
        user: null,
    }, // gia tri ban dau cua state
    reducers: {},
    extraReducers: {
        [getUsersInStore.pending]: (state, action) => {},
        [getUsersInStore.fulfilled]: (state, action) => {
            state.users = action.payload.users;
        },
        [getUsersInStore.rejected]: (state, action) => {},
        // get user
        [getUser.pending]: (state, action) => {},
        [getUser.fulfilled]: (state, action) => {
            state.user = action.payload.user;
        },
        [getUser.rejected]: (state, action) => {},
    },
});

const usersReducer = usersSlice.reducer;

export const usersSelector = (state) => state.usersReducer;

export default usersReducer;
