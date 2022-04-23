import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8800/api';

export const getProductApi = createAsyncThunk(
    'product/productFetch',
    async ({ id, search }) => {
        try {
            let limit = 4;
            let value = search ? search : `?page=${1}`;
            const res = await axios.get(
                `${url}/products/${id}${value}&limit=${limit}`,
            );
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
);

export const putUpdateLikeProduct = createAsyncThunk(
    'updateProduct/updateProductFetch',
    async ({ auth, productId }) => {
        try {
            await axios.put(`${url}/products/${productId}`, null, {
                headers: { Authorization: auth.tokenAuth },
            });
            return auth.user._id;
        } catch (err) {
            console.log(err);
        }
    },
);

export const getCommentsToProduct = createAsyncThunk(
    'getCommentsToProduct/getCommentsToProductFetch',
    async ({ productId, search }) => {
        try {
            let limit = 4;
            let value = search ? search : `?page=${1}`;
            const res = await axios.get(
                `${url}/products/${productId}${value}&limit=${limit}`,
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Lấy sản phẩm thất bại');
        }
    },
);

const productItemSlice = createSlice({
    name: 'product', // ten cua action
    initialState: {
        product: {},
        total: 0,
        totalCmt: 0,
    }, // gia tri ban dau cua state
    reducers: {
        handleUpdateProduct(state, action) {
            state.product = action.payload;
        },
    },
    extraReducers: {
        [getProductApi.pending]: (state, action) => {},
        [getProductApi.fulfilled]: (state, action) => {
            state.product = action.payload.product;
            state.total = action.payload.total;
            state.totalCmt = action.payload.totalCmt;
        },
        [getProductApi.rejected]: (state, action) => {},

        [getCommentsToProduct.pending]: (state, action) => {},
        [getCommentsToProduct.fulfilled]: (state, action) => {
            state.product = action.payload.product;
            state.total = action.payload.total;
        },
        [getCommentsToProduct.rejected]: (state, action) => {},
        // handle update like product
        [putUpdateLikeProduct.pending]: (state, action) => {},
        [putUpdateLikeProduct.fulfilled]: (state, action) => {
            if (action.payload) {
                if (state.product.likes.includes(action.payload)) {
                    state.product.likes = state.product.likes.filter(
                        (like) => like !== action.payload,
                    );
                } else {
                    state.product.likes.push(action.payload);
                }
            }
        },
        [putUpdateLikeProduct.rejected]: (state, action) => {},
    },
});

const productItemReducer = productItemSlice.reducer;

export const productItemSelector = (state) => state.productItemReducer;
export const { handleUpdateProduct } = productItemSlice.actions;

export default productItemReducer;
