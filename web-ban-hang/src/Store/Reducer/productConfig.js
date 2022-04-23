import { createSlice, nanoid } from '@reduxjs/toolkit';

const productConfigSlice = createSlice({
    name: 'productConfig',
    initialState: {
        productConfig: {
            varation: [],
            image: [],
        },
    },
    reducers: {
        handleCreateProductConfig: (state, action) => {
            const dataImg = {
                id: nanoid(),
                image: [],
            };
            state.productConfig = {
                ...state.productConfig,
                varation: [...state.productConfig.varation, action.payload],
                image: [...state.productConfig.image, dataImg],
            };
        },
        handleInsertProductConfig: (state, action) => {
            state.productConfig = {
                ...state.productConfig,
                ...action.payload,
            };
        },
        handlePushImgProductConfig: (state, action) => {
            const result = state.productConfig.image.map((item) => {
                return item.id === action.payload.id ? action.payload : item;
            });
            state.productConfig = {
                ...state.productConfig,
                image: result,
            };
        },
        handleInsertDataToProductConfig: (state, action) => {
            state.productConfig = {
                ...state.productConfig,
                ...action.payload,
            };
        },
        handleResetProductConfigChange: (state, action) => {
            state.productConfig = {
                varation: [],
                image: [],
            };
        },
        handleUpdateProductConfigChange: (state, action) => {
            const obj = {};
            const keyObj = action.payload.key;
            obj[keyObj] = action.payload.value;
            if (action.payload.des === 'description') {
                state.productConfig = {
                    ...state.productConfig,
                    description: { ...state.productConfig.description, ...obj },
                };
            } else {
                state.productConfig = {
                    ...state.productConfig,
                    ...obj,
                };
            }
        },
    },
});

const productConfigReducer = productConfigSlice.reducer;

export const productConfigSelector = (state) =>
    state.productConfigReducer.productConfig;

export const {
    handleCreateProductConfig,
    handleInsertProductConfig,
    handlePushImgProductConfig,
    handleInsertDataToProductConfig,
    handleResetProductConfigChange,
    handleUpdateProductConfigChange,
} = productConfigSlice.actions;

export default productConfigReducer;
