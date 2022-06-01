import './App.css';
import { BrowserRouter, Switch, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    DASHBOARD_MAIN,
    FILE_USER,
    LOGIN_ROUTES,
    MAIN_ROUTES,
} from '../../constans';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../Common/Layout';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import LoginLayout from '../../Common/LoginLayout';
import ScrollToTop from '../../utils/scroll';
import { useDispatch, useSelector } from 'react-redux';
import {
    addSearchItemUserApi,
    deleteSearchItemUserApi,
    searchItemSelector,
} from '../../Store/Reducer/searchItem';
import DashboardLayout from '../../Common/DashboardLayout';
import UserLeaveConfirmation from '../../Components/UserLeaveConfirmation';
import {
    loadingSelector,
    setLoadingAction,
} from '../../Store/Reducer/loadingReducer';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from 'styled-components';
import { authSelector, getUserByToken, signingSuccess } from '../../Store/Reducer/authReducer';
import {
    cartSelector,
    getOrCreateCartToUserApi,
} from '../../Store/Reducer/cartReducer';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    transition: display 0.5s ease;
`;

function App() {
    const searchItem = useSelector(searchItemSelector);
    const loading = useSelector(loadingSelector);
    const auth = useSelector(authSelector);
    const cart = useSelector(cartSelector);
    let axiosJWT = axios.create();

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const dispatch = useDispatch();
    const [confirmOpen, setConfirmOpen] = useState(true);

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
            if (auth.tokenAuth) {
                const decodeToken = jwt_decode(auth.tokenAuth);
                if (decodeToken.exp < date.getTime() / 1000) {
                    const data = await refreshToken();
                    console.log(data);
                    dispatch(signingSuccess(data));
                    config.headers['Authorization'] = data.access_token;
                }
                return config;
            }return config;
        },
        (err) => {
            return Promise.reject(err)
        }
    )

    useEffect(() => {
        if (user && token) {
            setTimeout(() => {
                dispatch(setLoadingAction(false));
            }, 500);
        }
    }, [dispatch, user, token]);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [loading]);

    useEffect(() => {
        if (auth.tokenAuth) {
            dispatch(getOrCreateCartToUserApi({ token: auth.tokenAuth, axiosJWT }));
        }
    }, [dispatch, auth.tokenAuth]);

    useEffect(() => {
        if (auth.tokenAuth) {
            dispatch(getUserByToken({ token: auth.tokenAuth, axiosJWT }));
        }
    }, [dispatch, auth.tokenAuth]);

    const insertSearchItemUser = (data) => {
        dispatch(addSearchItemUserApi(data));
    };
    const removeSearchItem = (id) => {
        dispatch(deleteSearchItemUserApi(id));
    };

    const renderDashboardRoute = () => {
        return DASHBOARD_MAIN.map((route, index) => {
            if (auth.user?.isAdmin) {
                return (
                    auth.tokenAuth &&
                    auth.user && (
                        <DashboardLayout
                            name={route.name}
                            key={index}
                            component={route.component}
                            exact={route.exact}
                            path={route.path}
                            axiosJWT={axiosJWT}
                        />
                    )
                );
            } else {
                return;
            }
        });
    };

    const renderAdminRoute = () => {
        return MAIN_ROUTES.map((route, index) => {
            return (
                <Layout
                    name={route.name}
                    key={index}
                    component={route.component}
                    exact={route.exact}
                    path={route.path}
                    axiosJWT={axiosJWT}
                />
            );
        });
    };

    const renderLoginRoute = () => {
        return LOGIN_ROUTES.map((route, index) => {
            return (
                <LoginLayout
                    name={route.name}
                    key={index}
                    component={route.component}
                    exact={route.exact}
                    path={route.path}
                />
            );
        });
    };

    const renderMain = () => (
        <>
            <div className="container">
                <Header
                    searchItem={searchItem}
                    insertSearchItemUser={insertSearchItemUser}
                    removeSearchItem={removeSearchItem}
                    user={auth.user}
                    cart={cart}
                />
                <div className="main">
                    <Switch>{renderAdminRoute()}</Switch>
                </div>
            </div>
            <Footer />
        </>
    );

    return (
        <>
            {loading && (
                <div className="loading__container">
                    <ScaleLoader
                        color={'#2963B3'}
                        loading={loading}
                        css={override}
                        size={200}
                    />
                </div>
            )}

            <BrowserRouter
                getUserConfirmation={(message, callback) => {
                    return UserLeaveConfirmation(
                        message,
                        callback,
                        confirmOpen,
                        setConfirmOpen,
                    );
                }}
            >
                <ToastContainer />
                <ScrollToTop />
                <Switch>
                    {renderDashboardRoute()}
                    {renderLoginRoute()}
                    {renderMain()}
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;