import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8800/api';

export const fetchSignupAction = createAsyncThunk(
    'signup/signupFetch',
    async (data) => {
        try {
            await axios.post(`${url}/auth/register`, {
                username: data.name,
                email: data.email,
                password: data.password,
            });
            toast.success(
                `Đăng ký thành công, hãy vào email của bạn để xác nhận 😍`,
            );
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const loginSocialAction = createAsyncThunk(
    ' loginSocial/loginSocialFetch',
    async (data) => {
        try {
            const res = await axios.post(
                `${url}/auth/${data.domant}_login`,
                data.data,
            );
            console.log(res);
            res && toast.success(`Chào mừng bạn quay lại 😜`);
            return res.data;
        } catch (error) {
            toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
        }
    },
);

export const fetchSigninAction = createAsyncThunk(
    'signinAction/fetchSigninAction',
    async (data) => {
        try {
            const res = await axios.post(`${url}/auth/login`, {
                email: data.email,
                password: data.password,
            });
            toast.success(`Chào mừng bạn quay lại 😜`);
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
            return err;
        }
    },
);

export const forgotPasswordCall = createAsyncThunk(
    'forgotPassword/forgotPasswordAction',
    async (email) => {
        try {
            const res = await axios.post(`${url}/auth/forgot-password`, {
                email,
            });
            res &&
                toast.success(
                    `Tin nhắn đã được gửi đến địa chỉ ${email}, vui lòng kiểm tra 🥰`,
                );
        } catch (error) {
            toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
        }
    },
);

export const fetchActivationEmail = createAsyncThunk(
    'ActivationEmail/fetchActivationEmail',
    async (activation_token) => {
        try {
            const res = await axios.post(`${url}/auth/activate`, {
                activation_token,
            });
            if (res.data) {
                toast.success(`Xác nhận thành công 🥰`);
                return res.data;
            }
        } catch (error) {
            console.log({ msg: error.message });
            toast.error(`${error.message} 😓`);
        }
    },
);

export const getUserByToken = createAsyncThunk(
    'userByToken/getUserByToken',
    async ({ token }) => {
        try {
            const res = await axios.get(`${url}/users`, {
                headers: { Authorization: token },
            });
            return res.data;
        } catch (error) {
            console.log('exited');

            console.log({ msg: error.message });
            toast.error(`${error.message} 😓`);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },
);

export const resetPasswordCall = createAsyncThunk(
    'resetPassword/resetPasswordToken',
    async (data) => {
        try {
            const res = await axios.post(
                `${url}/auth/reset-password`,
                data.val,
                {
                    headers: { Authorization: data.token },
                },
            );
            res &&
                toast.success(
                    `Bạn đã đổi thành công mật khâu mới, hãy đăng nhập lại nào 🥰`,
                );
            data.history.push('/buyer/signin');
        } catch (error) {
            data.history.push('*');
            console.log({ msg: error.message });
            toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            user: JSON.parse(localStorage.getItem('user')) || null,
            tokenAuth: JSON.parse(localStorage.getItem('token')) || null,
            register: false,
        },
    },
    reducers: {
        logoutAction: (state, action) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            state.auth.user = null;
            state.auth.tokenAuth = null;
        },
    },
    extraReducers: {
        //fetch activation email
        [fetchSignupAction.pending]: (state, action) => {},
        [fetchSignupAction.fulfilled]: (state, action) => {
            state.auth.register = true;
        },
        [fetchSignupAction.rejected]: (state, action) => {},

        //fetch activation email
        [loginSocialAction.pending]: (state, action) => {},
        [loginSocialAction.fulfilled]: (state, action) => {
            if (action.payload) {
                const user = action.payload.newUser || action.payload.user;
                const token = action.payload.refresh_token;

                state.auth.user = user;
                state.auth.tokenAuth = token;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));

                state.auth.register = false;
            }
        },
        [loginSocialAction.rejected]: (state, action) => {},

        // reset password email
        [resetPasswordCall.pending]: (state, action) => {},
        [resetPasswordCall.fulfilled]: (state, action) => {
            state.auth.register = false;
        },
        [resetPasswordCall.rejected]: (state, action) => {},

        //forgot password email
        [forgotPasswordCall.pending]: (state, action) => {},
        [forgotPasswordCall.fulfilled]: (state, action) => {
            state.auth.register = true;
        },
        [forgotPasswordCall.rejected]: (state, action) => {},

        //fetch activation email
        [fetchActivationEmail.pending]: (state, action) => {},
        [fetchActivationEmail.fulfilled]: (state, action) => {
            if (action.payload) {
                const token = action.payload.refresh_token;
                const user = action.payload.newUser;

                state.auth.user = user;
                state.auth.tokenAuth = token;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));

                state.auth.register = false;
            }
        },
        [fetchActivationEmail.rejected]: (state, action) => {
            state.auth.user = null;
            state.auth.register = true;
        },

        // get users authentication
        [getUserByToken.pending]: (state, action) => {},
        [getUserByToken.fulfilled]: (state, action) => {
            if (action.payload) {
                localStorage.setItem('user', JSON.stringify(action.payload));
                state.auth.user = action.payload;
            }
        },
        [getUserByToken.rejected]: (state, action) => {
            // this.action.push('/buyer/signin');
            console.log(action.payload);
        },

        // Signin
        [fetchSigninAction.pending]: (state, action) => {},
        [fetchSigninAction.fulfilled]: (state, action) => {
            if (action.payload.refresh_token && action.payload.user) {
                const token = action.payload.refresh_token;
                const user = action.payload.user;

                state.auth.user = user;
                state.auth.tokenAuth = token;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));

                state.auth.register = false;
            }
        },
        [fetchSigninAction.rejected]: (state, action) => {
            console.log(action.payload);
        },
    },
});

const authReducer = authSlice.reducer;

export const authSelector = (state) => state.authReducer.auth;
export const { logoutAction } = authSlice.actions;

export default authReducer;
