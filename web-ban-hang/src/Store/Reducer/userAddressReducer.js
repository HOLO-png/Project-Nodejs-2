import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8800/api';

export const getUserAddress = createAsyncThunk(
    'getUserAddress/getUserAddressFetch',
    async ({ token }) => {
        try {
            const res = await axios.get(`${url}/user-address`, {
                headers: { Authorization: token },
            });
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('error');
        }
    },
);

export const insertUserAddress = createAsyncThunk(
    'insertUserAddress/insertUserAddressFetch',
    async (data) => {
        try {
            const res = await axios.post(`${url}/user-address`, data, {
                headers: { Authorization: data.tokenAuth },
            });
            console.log(res.data);

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('error');
        }
    },
);

export const updateUserAddress = createAsyncThunk(
    'updateUserAddress/updateUserAddressFetch',
    async ({ data, userAddressId }) => {
        try {
            const res = await axios.put(
                `${url}/user-address/${userAddressId}`,
                data,
                {
                    headers: { Authorization: data.tokenAuth },
                },
            );
            console.log(res.data);

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('error');
        }
    },
);

export const updateStatusUserAddress = createAsyncThunk(
    'updateStatusUserAddress/updateStatusUserAddressFetch',
    async ({ tokenAuth, userAddressId }) => {
        console.log({ tokenAuth, userAddressId });
        try {
            const res = await axios.patch(
                `${url}/user-address/status/${userAddressId}`,
                null,
                {
                    headers: { Authorization: tokenAuth },
                },
            );
            console.log(res.data);

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('error');
        }
    },
);

export const deleteUserAddress = createAsyncThunk(
    'deleteUserAddress/deleteUserAddressFetch',
    async ({ tokenAuth, userAddressId }) => {
        try {
            const res = await axios.delete(
                `${url}/user-address/${userAddressId}`,
                {
                    headers: { Authorization: tokenAuth },
                },
            );
            console.log(res.data);

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('error');
        }
    },
);

const userAddressSlice = createSlice({
    name: 'userAddress',
    initialState: {
        userAddress: JSON.parse(localStorage.getItem('userAddress')) || null,
    },
    reducers: {},
    extraReducers: {
        // get cart product
        [getUserAddress.pending]: (state, action) => {},
        [getUserAddress.fulfilled]: (state, action) => {
            if (action.payload) {
                state.userAddress = action.payload.userAddress;
                localStorage.setItem(
                    'userAddress',
                    JSON.stringify(action.payload.userAddress),
                );
            }
        },
        [getUserAddress.rejected]: (state, action) => {},

        // get cart product
        [deleteUserAddress.pending]: (state, action) => {},
        [deleteUserAddress.fulfilled]: (state, action) => {
            if (action.payload) {
                state.userAddress = action.payload.userAddress;
                localStorage.setItem(
                    'userAddress',
                    JSON.stringify(action.payload.userAddress),
                );
            }
        },
        [deleteUserAddress.rejected]: (state, action) => {},

        // insert cart product
        [insertUserAddress.pending]: (state, action) => {},
        [insertUserAddress.fulfilled]: (state, action) => {
            if (action.payload) {
                state.userAddress = action.payload.savedUserAddress;
                localStorage.setItem(
                    'userAddress',
                    JSON.stringify(action.payload.savedUserAddress),
                );
            }
        },
        [insertUserAddress.rejected]: (state, action) => {},
        // insert cart product
        [updateUserAddress.pending]: (state, action) => {},
        [updateUserAddress.fulfilled]: (state, action) => {
            if (action.payload) {
                state.userAddress = action.payload.userAddress;
                localStorage.setItem(
                    'userAddress',
                    JSON.stringify(action.payload.userAddress),
                );
            }
        },
        [updateUserAddress.rejected]: (state, action) => {},

        // insert cart product
        [updateStatusUserAddress.pending]: (state, action) => {},
        [updateStatusUserAddress.fulfilled]: (state, action) => {
            if (action.payload) {
                state.userAddress = action.payload.userAddress;
                localStorage.setItem(
                    'userAddress',
                    JSON.stringify(action.payload.userAddress),
                );
            }
        },
        [updateStatusUserAddress.rejected]: (state, action) => {},
    },
});

const userAddressReducer = userAddressSlice.reducer;

export const userAddressSelector = (state) =>
    state.userAddressReducer.userAddress;

// export const { handleAmountProduct } = userAddressSlice.actions;

export default userAddressReducer;
