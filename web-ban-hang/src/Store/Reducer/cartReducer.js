import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8800/api';

const messageToCart = (status) => {
    if (status) {
        message.success({
            content: 'Sản phẩm đã được thêm vào giỏ hàng !',
            className: 'custom-class',
            style: {
                marginTop: '0vh',
            },
        });
    } else {
        message.warning({
            content: 'Sản Phẩm đã có trong giỏ hàng!',
            className: 'custom-class',
            style: {
                marginTop: '0vh',
            },
        });
    }
};

export const getOrCreateCartToUserApi = createAsyncThunk(
    'getOrCreateCartToUserApi/getOrCreateCartToUserApiFetch',
    async (tokenAuth) => {
        try {
            const res = await axios.post(`${url}/cart`, null, {
                headers: { Authorization: tokenAuth },
            });
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const deleteProductsInCart = createAsyncThunk(
    'deleteProductsInCart/deleteProductsInCartApiFetch',
    async ({ productsId, cartId }) => {
        try {
            const res = await axios.delete(
                `${url}/cart/delete-product/${cartId}`,
                {
                    data: {
                        productsId,
                        cartId,
                    },
                },
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const handleAddProductToCart = createAsyncThunk(
    'handleAddProductToCart/handleAddProductToCartFetch',
    async (data) => {
        try {
            const res = await axios.post(
                `${url}/cart/${data.cart._id}`,
                {
                    productId: data.obj._id,
                    qty: data.amout,
                    indexProduct: data.obj.count,
                    name: data.obj.name,
                    price: data.obj.price,
                    priceOld: data.obj.priceOld,
                    category: data.obj.category,
                    image: data.obj.image[0].data,
                    capacity: data.obj.capacity,
                },
                {
                    headers: { Authorization: data.user.tokenAuth },
                },
            );
            messageToCart(true);
            return res.data;
        } catch (err) {
            toast.warning(`Thêm sản phẩm thất bại`);
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const handleRemoveProductToCart = createAsyncThunk(
    'handleRemoveProductToCart/handleRemoveProductToCartFetch',
    async (data) => {
        try {
            const res = await axios.delete(`${url}/cart/${data.cart._id}`, {
                data: {
                    productId: data.product._id,
                    price: data.product.price,
                },
            });
            toast.success(`Removed ${data.product.name} `);
            return res.data;
        } catch (err) {
            toast.warning(`remove failure`);
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const handleUpdateAmountProductToCart = createAsyncThunk(
    'handleUpdateAmountProductToCart/handleUpdateAmountProductToCartFetch',
    async (data) => {
        try {
            const res = await axios.put(`${url}/cart/${data.cartId}`, {
                productId: data.productId,
                indexProduct: data.indexProduct,
                qty: data.qty,
            });
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const handleResetCart = createAsyncThunk(
    'handleResetCart/handleResetCartFetch',
    async (cart) => {
        try {
            const res = await axios.put(`${url}/cart/reset/${cart._id}`, null);
            return res.data;
        } catch (err) {
            toast.warning(`update amount failure`);
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: null,
    },
    reducers: {
        handleResetCartUser(state, action) {
            console.log('reset cart');
            state.cart = null;
        },
    },
    extraReducers: {
        //fetch activation email
        [getOrCreateCartToUserApi.pending]: (state, action) => {},
        [getOrCreateCartToUserApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.cart = action.payload;
            }
        },
        [getOrCreateCartToUserApi.rejected]: (state, action) => {},

        //fetch activation email
        [handleAddProductToCart.pending]: (state, action) => {},
        [handleAddProductToCart.fulfilled]: (state, action) => {
            if (action.payload) {
                state.cart.cart = action.payload;
            }
        },
        [handleAddProductToCart.rejected]: (state, action) => {},
        //fetch activation email
        [handleRemoveProductToCart.pending]: (state, action) => {},
        [handleRemoveProductToCart.fulfilled]: (state, action) => {
            if (action.payload) {
                state.cart = action.payload;
            }
        },
        [handleRemoveProductToCart.rejected]: (state, action) => {},
        //fetch activation email
        [handleUpdateAmountProductToCart.pending]: (state, action) => {},
        [handleUpdateAmountProductToCart.fulfilled]: (state, action) => {
            if (action.payload) {
                state.cart = action.payload;
            }
        },
        [handleUpdateAmountProductToCart.rejected]: (state, action) => {},
        //fetch activation email
        [handleResetCart.pending]: (state, action) => {},
        [handleResetCart.fulfilled]: (state, action) => {
            if (action.payload) {
                state.cart = action.payload;
            }
        },
        [handleResetCart.rejected]: (state, action) => {},

        //fetch activation email
        [deleteProductsInCart.pending]: (state, action) => {},
        [deleteProductsInCart.fulfilled]: (state, action) => {
            if (action.payload) {
                state.cart = action.payload;
            }
        },
        [deleteProductsInCart.rejected]: (state, action) => {},
    },
});

const cartReducer = cartSlice.reducer;

export const cartSelector = (state) => state.cartReducer.cart;
export const { handleResetCartUser } = cartSlice.actions;

export default cartReducer;
