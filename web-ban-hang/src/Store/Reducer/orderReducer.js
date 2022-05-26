import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const tokenKeys = '874008ef-d7ee-11ec-ac64-422c37c6de1b';
const shopId = 113395;
const url = 'http://localhost:8800/api';
const dateGetOrder = `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shift/date`;
const apiOrderCreate =
    'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create';

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
            paymentFee,
            serviceTypeId
        },
        { rejectWithValue },
    ) => {
        try {
            const res = await axios.post(
                `${url}/order`,
                {
                    username,
                    phoneNumber,
                    city,
                    productsID,
                    isPayment,
                    message,
                    paymentFee,
                    serviceTypeId
                },
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

export const handleCreateOrderToGHN = createAsyncThunk(
    'handleCreateOrderToGHN/handleCreateOrderToGHNFetch',
    async ({
        toName,
        toPhone,
        toAddress,
        toWardCode,
        toDistrictId,
        returnPhone,
        returnDistrictId,
        returnWardCode,
        returnAddress,
        clientOrderCode,
        codAmount,
        content,
        weight,
        length,
        width,
        height,
        pickStationId,
        insuranceValue,
        coupon,
        serviceTypeId,
        paymentTypeId,
        note,
        requiredNote,
        items,
        pickShift
    }) => {

        console.log({
            "to_address": toAddress,
            "to_ward_code": toWardCode,
            "to_district_id": toDistrictId,
        });

        try {
            // const resDate = await axios.get(dateGetOrder, {
            //     headers: { token: tokenKeys },
            // });
            // console.log(resDate);
            const res = await axios.post(
                `${apiOrderCreate}`,
                {
                    "payment_type_id": paymentTypeId,
                    "note": note,
                    "required_note": requiredNote,
                    "return_phone": returnPhone,
                    "return_address": returnAddress,
                    "return_district_id": returnDistrictId,
                    "return_ward_code": returnWardCode,
                    "client_order_code": clientOrderCode,
                    "to_name": toName,
                    "to_phone": toPhone,
                    "to_district_id": toDistrictId,
                    "to_ward_code": toWardCode,
                    "to_address": toAddress,
                    "cod_amount": codAmount,
                    "content": content,
                    "weight": Math.round(+weight),
                    "length": Math.round(+length),
                    "width": Math.round(+width),
                    "height": Math.round(+height),
                    "pick_station_id": pickStationId,
                    "deliver_station_id": null,
                    "insurance_value": insuranceValue,
                    "service_type_id": serviceTypeId,
                    "coupon": coupon,
                    "pick_shift": pickShift,
                    "items": items
                },
                {
                    headers: { 'Content-Type': 'application/json', ShopId: shopId, token: tokenKeys, },
                },
            );
            console.log(res.data);
            return res.data;
        } catch (err) {
            toast.error(`Create order failed!`);
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
        [handleGetOrdersInStore.pending]: (state, action) => { },
        [handleGetOrdersInStore.fulfilled]: (state, action) => {
            if (action.payload) {
                state.orders = action.payload.orders;
            }
        },
        [handleGetOrdersInStore.rejected]: (state, action) => { },
        //fetch activation email
        [handleAddOrder.pending]: (state, action) => { },
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
        [handleGetOrder.pending]: (state, action) => { },
        [handleGetOrder.fulfilled]: (state, action) => {
            if (action.payload) {
                state.orders = action.payload.orders;
            }
        },
        [handleGetOrder.rejected]: (state, action) => { },

        //fetch activation email
        [handleUpdateStatusOrder.pending]: (state, action) => { },
        [handleUpdateStatusOrder.fulfilled]: (state, action) => {
            if (action.payload) {
                const orders = state.orders.map((order) =>
                    order._id === action.payload.order._id
                        ? action.payload.order
                        : order,
                );
                state.orders = orders;
            }
        },
        [handleUpdateStatusOrder.rejected]: (state, action) => { },
    },
});

const orderReducer = orderSlice.reducer;

export const orderSelector = (state) => state.orderReducer;
export const { handleResetOrderUser } = orderSlice.actions;

export default orderReducer;
