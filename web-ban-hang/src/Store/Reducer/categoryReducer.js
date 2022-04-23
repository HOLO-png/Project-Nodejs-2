import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8800/api/category',
    }),
    keepUnusedDataFor: 60,
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: ({ category, keyword, numPage }) => {
                let limit = 8;
                return `get-products?category=${category}&keyword=${keyword}&limit=${limit}&page=${
                    numPage ? numPage : 1
                }`;
            },
        }),
        getProductsToStar: builder.mutation({
            query: ({ star, keyword, category }) => ({
                url: `star`,
                method: 'POST',
                body: { star, keyword, category },
            }),
        }),
        getProductsToPrice: builder.mutation({
            query: ({ price, keyword, category }) => ({
                url: `price`,
                method: 'POST',
                body: { price, keyword, category },
            }),
        }),
        getProductsToTrademark: builder.mutation({
            query: ({ trademarkName, category }) => ({
                url: `trademark`,
                method: 'POST',
                body: { trademarkName, category },
            }),
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useGetProductsToStarMutation,
    useGetProductsToPriceMutation,
    useGetProductsToTrademarkMutation,
} = categoryApi;

const categorySlice = createSlice({
    name: 'category', // ten cua action
    initialState: {
        products: null,
        total: 0,
        isload: false,
        count: 0,
        trademark: null,
    }, // gia tri ban dau cua state
    reducers: {
        handleSetLoadingCategory(state, action) {
            state.isload = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            categoryApi.endpoints.getAllCategory.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.count;
                state.trademark = action.payload.trademark;
                state.isload = false;
            },
        );
        builder.addMatcher(
            categoryApi.endpoints.getProductsToStar.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.products.length;
                state.isload = false;
            },
        );
        builder.addMatcher(
            categoryApi.endpoints.getProductsToPrice.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.products.length;
                state.isload = false;
            },
        );
        builder.addMatcher(
            categoryApi.endpoints.getProductsToTrademark.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.products.length;
                state.isload = false;
            },
        );
    },
});

const categoryReducer = categorySlice.reducer;

export const categorySelector = (state) => state.categoryReducer;
export const { handleSetLoadingCategory } = categorySlice.actions;
export default categoryReducer;
