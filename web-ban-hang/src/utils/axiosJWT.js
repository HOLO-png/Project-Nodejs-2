import axios from "axios";
import jwt_decode from 'jwt-decode';
import { signingSuccess } from "../Store/Reducer/authReducer";


export const handleGetAxiosJWT = ({token, dispatch, handleGetAxiosToken}) => {
    let axiosJWT = axios.create();

    const refreshToken = async () => {
        try {
            const res = await axios.post('http://localhost:8800/api/auth/refresh_token', {
                withCredentials: true
            })
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }


    axiosJWT.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodeToken = jwt_decode(token);
            console.log(decodeToken);
            if (decodeToken.exp < date.getTime() / 1000) {
                const data = refreshToken();
                dispatch(signingSuccess(data));
                config.headers['Authorization'] = data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    handleGetAxiosToken(axiosJWT);
}

