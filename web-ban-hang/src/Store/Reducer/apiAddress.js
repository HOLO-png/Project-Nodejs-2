import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAddressApi = createAsyncThunk(
    'addressApi/addressApiFetch',
    async () => {
        const response = await axios.get(
            `https://provinces.open-api.vn/api/?depth=3`,
        );
        return response.data;
    },
);

const addressApiSlice = createSlice({
    name: 'addressApi', // ten cua action
    initialState: {
        addressApi: [],
    }, // gia tri ban dau cua state
    reducers: {},
    extraReducers: {
        [getAddressApi.pending]: (state, action) => {},
        [getAddressApi.fulfilled]: (state, action) => {
            state.addressApi = action.payload;
        },
        [getAddressApi.rejected]: (state, action) => {},
    },
});

const addressApiReducer = addressApiSlice.reducer;

export const addressApiSelector = (state) => state.addressApiReducer.addressApi;

export default addressApiReducer;
