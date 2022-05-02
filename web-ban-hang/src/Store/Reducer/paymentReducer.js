import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8800/api';

export const createPayment = createAsyncThunk(
    'PaymentInsert/PaymentInsert',
    async ({ products, email }) => {
        try {
            const res = await axios.post(`${url}/payment`, { products, email });

            return res.data;
        } catch (err) {
            toast.error('Thanh toán lỗi !');
        }
    },
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payment: {
            paymentUrl: '',
            statusPayment: false,
        },
    },
    reducers: {
        handleResetUrl: (state, action) => {
            state.paymentUrl = '';
        },
        handleSetStatusPayment: (state, action) => {
            state.statusPayment = action.payload;
        },
    },
    extraReducers: {
        // get cart product
        [createPayment.pending]: (state, action) => {},
        [createPayment.fulfilled]: (state, action) => {
            if (action.payload) {
                state.payment.paymentUrl = action.payload.paymentUrl;
            }
        },
        [createPayment.rejected]: (state, action) => {},
    },
});

const paymentReducer = paymentSlice.reducer;

export const paymentSelector = (state) => state.paymentReducer.payment;
export const { handleResetUrl, handleSetStatusPayment } = paymentSlice.actions;

export default paymentReducer;
