import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8800/api';

export const handleAddOrder = createAsyncThunk(
    'handleAddOrder/handleAddOrderFetch',
    async (
        {
            username,
            phoneNumber,
            city,
            productsID,
            tokenAuth,
            isPayment,
            message,
        },
        { rejectWithValue },
    ) => {
        try {
            const res = await axios.post(
                `${url}/order`,
                { username, phoneNumber, city, productsID, isPayment, message },
                {
                    headers: { Authorization: tokenAuth },
                },
            );
            return res.data;
        } catch (err) {
            toast.warning(`Tạo đơn hàng thất bại!`);
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    },
);

export const handleGetOrder = createAsyncThunk(
    'handleGetOrder/handleGetOrderFetch',
    async ({ tokenAuth }) => {
        try {
            const res = await axios.get(`${url}/order`, {
                headers: { Authorization: tokenAuth },
            });
            return res.data;
        } catch (err) {
            toast.warning(`Get orders failed!`);
            console.log(err);
        }
    },
);

export const handleGetOrdersInStore = createAsyncThunk(
    'handleGetOrdersInStore/handleGetOrdersInStoreFetch',
    async () => {
        try {
            const res = await axios.get(`${url}/order/all`);
            return res.data;
        } catch (err) {
            toast.error(`Get orders failed!`);
            console.log(err);
        }
    },
);

export const handleUpdateStatusOrder = createAsyncThunk(
    'handleUpdateStatusOrder/handleUpdateStatusOrderFetch',
    async ({ orderId, complete }) => {
        try {
            const res = await axios.put(`${url}/order/${orderId}`, {
                complete,
            });
            return res.data;
        } catch (err) {
            toast.error(`Get orders failed!`);
            console.log(err);
        }
    },
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        isError: false,
        orders: null,
    },
    reducers: {},
    extraReducers: {
        //fetch activation email
        [handleGetOrdersInStore.pending]: (state, action) => {},
        [handleGetOrdersInStore.fulfilled]: (state, action) => {
            if (action.payload) {
                state.orders = action.payload.orders;
            }
        },
        [handleGetOrdersInStore.rejected]: (state, action) => {},
        //fetch activation email
        [handleAddOrder.pending]: (state, action) => {},
        [handleAddOrder.fulfilled]: (state, action) => {
            if (action.payload) {
                state.order = action.payload.newOrder;
            }
        },
        [handleAddOrder.rejected]: (state, action) => {
            console.log(action.payload);
            state.isError = true;
        },

        //fetch activation email
        [handleGetOrder.pending]: (state, action) => {},
        [handleGetOrder.fulfilled]: (state, action) => {
            if (action.payload) {
                state.orders = action.payload.orders;
            }
        },
        [handleGetOrder.rejected]: (state, action) => {},

        //fetch activation email
        [handleUpdateStatusOrder.pending]: (state, action) => {},
        [handleUpdateStatusOrder.fulfilled]: (state, action) => {
            if (action.payload) {
                const orders = state.orders.map((order) =>
                    order._id === action.payload.order._id
                        ? action.payload.order
                        : order,
                );
                state.orders = orders;
                console.log(state.orders);
            }
        },
        [handleUpdateStatusOrder.rejected]: (state, action) => {},
    },
});

const orderReducer = orderSlice.reducer;

export const orderSelector = (state) => state.orderReducer;
export const { handleResetOrderUser } = orderSlice.actions;

export default orderReducer;
