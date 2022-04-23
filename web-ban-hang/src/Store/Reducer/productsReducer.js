import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/' }),
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ pageNum, limitNum }) =>
                `products?page=${pageNum}&limit=${limitNum}`,
        }),
        postProduct: builder.mutation({
            query: (result) => ({
                url: `products`,
                method: 'POST',
                body: result,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery, usePostProductMutation } = productsApi;

// export const handleRemoveProduct = createAsyncThunk(
//     'products/productsRemove',
//     async (obj) => {
//         await axios.delete(`http://localhost:3000/product_api/${obj.id}`);
//         return obj;
//     },
// );

// export const handleUpdateProduct = createAsyncThunk(
//     'products/productsUpdate',
//     async (obj) => {
//         const newproducts = {
//             ...obj,
//         };
//         await axios.put(
//             `http://localhost:3000/product_api/${obj.id}`,
//             newproducts,
//         );
//         return newproducts;
//     },
// );

const productsSlice = createSlice({
    name: 'products', // ten cua action
    initialState: {
        products: null,
        total: 0,
        hasMore: false,
        loading: true,
        count: 0,
    }, // gia tri ban dau cua state
    reducers: {
        handleSetLoadingSkeleton(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            productsApi.endpoints.getAllProducts.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.count = action.payload.count;
                state.hasMore = action.payload.products.length > 0;
                state.loading = false;
            },
        );
        builder.addMatcher(
            productsApi.endpoints.postProduct.matchFulfilled,
            (state, action) => {
                const product = action.payload;
                if (state.products) {
                    state.products.push(product);
                } else {
                    const productArr = [];
                    productArr.push(product);
                    state.products = productArr;
                }
            },
        );
        // [handleInsertProduct.rejected]: (state, action) => {},
        // //delete coins product all
        // [handleRemoveProduct.pending]: (state, action) => {},
        // [handleRemoveProduct.fulfilled]: (state, action) => {
        //     state.products = state.products.filter(
        //         (ar) => ar.id !== action.payload.id,
        //     );
        // },
        // [handleRemoveProduct.rejected]: (state, action) => {},
        // // update cart product
        // [handleUpdateProduct.pending]: (state, action) => {},
        // [handleUpdateProduct.fulfilled]: (state, action) => {
        //     state.products = state.products.map(function (item) {
        //         return item.id === action.payload.id ? action.payload : item;
        //     });
        // },
        // [handleUpdateProduct.rejected]: (state, action) => {},
    },
});

const productsReducer = productsSlice.reducer;

export const productsSelector = (state) => state.productsReducer;
export const { handleSetLoadingSkeleton } = productsSlice.actions;
export default productsReducer;
