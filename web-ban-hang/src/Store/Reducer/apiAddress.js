import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import GHN from 'giaohangnhanh';

const tokenKeys = '874008ef-d7ee-11ec-ac64-422c37c6de1b';
const shopId = 113395;


const apiProvince =
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province';

const apiWard =
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward';

const apiDistrict =
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district';

const apiServicePackage =
    'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services';

const apiServiceCharge =
    'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';

const apiLeadTime =
    'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime';

const ghn = new GHN(tokenKeys, { test: true });

console.log(ghn);

export const getAddressApi = createAsyncThunk(
    'addressApi/addressApiFetch',
    async () => {
        const response = await axios.get(
            `https://provinces.open-api.vn/api/?depth=3`,
        );
        return response.data;
    },
);

export const getDistrictApi = createAsyncThunk(
    'getDistrictApi/getDistrictApiFetch',
    async ({ provinceId }) => {
        try {
            const res = await axios.post(
                `${apiDistrict}`,
                { province_id: provinceId },
                {
                    headers: {
                        token: tokenKeys,
                    },
                },
            );

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Get District failed');
        }
    },
);

export const getWardApi = createAsyncThunk(
    'getWardApi/getWardApiFetch',
    async ({ districtID }) => {
        try {
            const res = await axios.post(
                `${apiWard}`,
                { district_id: districtID },
                {
                    headers: {
                        token: tokenKeys,
                    },
                },
            );

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Get District failed');
        }
    },
);

export const getProvinceApi = createAsyncThunk(
    'getProvinceApi/getProvinceApiFetch',
    async () => {
        try {
            const res = await axios.get(`${apiProvince}`, {
                headers: { token: tokenKeys },
            });

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Get Province failed');
        }
    },
);

export const getServicePackageApi = createAsyncThunk(
    'getServicePackageApi/getServicePackageApiFetch',
    async ({ toDistrict, fromDistrict }) => {
        try {
            const res = await axios.post(
                `${apiServicePackage}`,
                {
                    shop_id: shopId,
                    from_district: fromDistrict,
                    to_district: toDistrict,
                },
                {
                    headers: { token: tokenKeys },
                },
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Get Province failed');
        }
    },
);

export const getLeadTimeApi = createAsyncThunk(
    'getLeadTimeApi/getLeadTimeApiFetch',
    async ({ toDistrictId, toWardCode, serviceId, fromDistrict }) => {
        try {
            const res = await axios.post(
                `${apiLeadTime}`,
                {
                    from_district_id: fromDistrict,
                    from_ward_code: toWardCode,
                    to_district_id: toDistrictId,
                    to_ward_code: toWardCode,
                    service_id: serviceId,
                },
                {
                    headers: { shopId: shopId, token: tokenKeys },
                },
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Get Lead Time failed');
        }
    },
);

export const getFeeServiceApi = createAsyncThunk(
    'getFeeServiceApi/getFeeServiceApiFetch',
    async ({
        toDistrict,
        serviceTypeId,
        toWardCode,
        coupon,
        products,
        sumProduct,
        fromDistrict
    }) => {
        try {
            if (serviceTypeId) {
                const res = await axios.post(
                    `${apiServiceCharge}`,
                    {
                        from_district_id: fromDistrict,
                        service_type_id: serviceTypeId,
                        to_district_id: toDistrict,
                        to_ward_code: toWardCode,
                        weight:  Math.round(products.reduce(
                            (accumulator, item) => {
                                return (
                                    accumulator +
                                    Number(item.sizeInformation.weight)
                                );
                            },
                            0,
                        )),
                        length:  Math.round(products.reduce(
                            (accumulator, item) => {
                                return (
                                    accumulator +
                                    Number(item.sizeInformation.length)
                                );
                            },
                            0,
                        )),
                        width:  Math.round(products.reduce(
                            (accumulator, item) => {
                                return (
                                    accumulator +
                                    Number(item.sizeInformation.width)
                                );
                            },
                            0,
                        )),
                        height: Math.round(products.reduce(
                            (accumulator, item) => {
                                return (
                                    accumulator +
                                    Number(item.sizeInformation.height)
                                );
                            },
                            0,
                        )),
                       
                        insurance_value: sumProduct,
                        coupon: coupon,
                    },
                    {
                        headers: { token: tokenKeys, shopId },
                    },
                );
                console.log(res.data);
                return { ...res.data, serviceTypeId };
            }
        } catch (err) {
            console.log(err);
            toast.error('Get fee failed');
        }
    },
);

const addressApiSlice = createSlice({
    name: 'addressApi', // ten cua action
    initialState: {
        dataProvince: [],
        dataWard: [],
        dataDistrict: [],
        servicePackage: null,
        leadTime: null,
        feeServiceChange: []
    }, // gia tri ban dau cua state
    reducers: {
        handleResetFeeServiceChange: (state, action) => {
            state.feeServiceChange = [];
        }
    },
    extraReducers: {
        [getProvinceApi.pending]: (state, action) => { },
        [getProvinceApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.dataProvince = action.payload.data;
            }
        },
        [getProvinceApi.rejected]: (state, action) => { },

        [getDistrictApi.pending]: (state, action) => { },
        [getDistrictApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.dataDistrict = action.payload.data;
            }
        },
        [getDistrictApi.rejected]: (state, action) => { },

        [getWardApi.pending]: (state, action) => { },
        [getWardApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.dataWard = action.payload.data;
            }
        },
        [getWardApi.rejected]: (state, action) => { },

        [getServicePackageApi.pending]: (state, action) => { },
        [getServicePackageApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.servicePackage = action.payload;
            }
        },
        [getServicePackageApi.rejected]: (state, action) => { },

        [getLeadTimeApi.pending]: (state, action) => { },
        [getLeadTimeApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.leadTime = action.payload.data.leadtime;
            }
        },
        [getLeadTimeApi.rejected]: (state, action) => { },

        [getFeeServiceApi.pending]: (state, action) => { },
        [getFeeServiceApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.feeServiceChange.push(action.payload)
            }
        },
        [getFeeServiceApi.rejected]: (state, action) => { },
    },
});

const addressApiReducer = addressApiSlice.reducer;

export const addressApiSelector = (state) => state.addressApiReducer;
export const { handleResetFeeServiceChange } = addressApiSlice.actions;

export default addressApiReducer;
