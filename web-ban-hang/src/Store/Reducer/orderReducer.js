import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8800/api';

export const handleAddOrder = createAsyncThunk(
    'handleAddOrder/handleAddOrderFetch',
    async ({ username, phoneNumber, city, productsID, tokenAuth }) => {
        try {
            const res = await axios.post(
                `${url}/order`,
                { username, phoneNumber, city, productsID },
                {
                    headers: { Authorization: tokenAuth },
                },
            );
            console.log(res.data);

            return res.data;
        } catch (err) {
            toast.warning(`Tạo đơn hàng thất bại!`);
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
    },
    reducers: {},
    extraReducers: {
        //fetch activation email
        [handleAddOrder.pending]: (state, action) => {},
        [handleAddOrder.fulfilled]: (state, action) => {
            if (action.payload) {
                state.order = action.payload.newOrder;
            }
        },
        [handleAddOrder.rejected]: (state, action) => {},
    },
});

const orderReducer = orderSlice.reducer;

export const orderSelector = (state) => state.orderReducer.order;
export const { handleResetOrderUser } = orderSlice.actions;

export default orderReducer;
