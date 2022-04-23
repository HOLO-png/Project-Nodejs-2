import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import { useDispatch } from 'react-redux';
import {
    authSelector,
    fetchSigninAction,
    fetchSignupAction,
    loginSocialAction,
} from '../../Store/Reducer/authReducer';
import { useSelector } from 'react-redux';
import { setLoadingAction } from '../../Store/Reducer/loadingReducer';
function LoginForm(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isStateLogin } = useParams();

    const auth = useSelector(authSelector);

    const [isActive, setIsActive] = useState(isStateLogin === 'signup');

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const isShowSignup = () => {
        setIsActive(!isActive);
    };

    const handleLoginSignin = (val) => {
        dispatch(setLoadingAction(true));
        dispatch(fetchSigninAction(val));
        setTimeout(() => {
            dispatch(setLoadingAction(false));
        }, 1000);
    };

    useEffect(() => {
        if (user && token) {
            history.goBack();
        }
    }, [history, token, user]);

    const handleLoginSignup = (val) => {
        dispatch(setLoadingAction(true));
        dispatch(fetchSignupAction(val));
        setTimeout(() => {
            dispatch(setLoadingAction(false));
        }, 500);
    };

    useEffect(() => {
        if (auth.register) {
            history.push('/verify-email');
            setTimeout(() => {
                dispatch(setLoadingAction(false));
            }, 500);
        }
    }, [dispatch, history, auth.register]);

    const handleFbLogin = (response) => {
        dispatch(setLoadingAction(true));

        const { accessToken, userID } = response;
        dispatch(
            loginSocialAction({
                domant: 'facebook',
                data: { accessToken, userID },
            }),
        );
        if (auth.user && auth.tokenAuth) {
            history.push('/');
        }
        setTimeout(() => {
            dispatch(setLoadingAction(false));
        }, 500);
    };

    const handleGgLogin = (response) => {
        dispatch(setLoadingAction(true));
        const { tokenId } = response;
        dispatch(loginSocialAction({ domant: 'google', data: { tokenId } }));
        if (auth.user && auth.tokenAuth) {
            history.push('/');
        }
        setTimeout(() => {
            dispatch(setLoadingAction(false));
        }, 500);
    };

    console.log(isActive);

    return (
        <div className="form">
            <div
                className={
                    isActive ? 'container right-panel-active' : 'container'
                }
            >
                <Signup onSubmit={handleLoginSignup} />
                <Signin
                    onSubmit={handleLoginSignin}
                    handleFbLogin={handleFbLogin}
                    handleGgLogin={handleGgLogin}
                />

                <div className="form__overlay-container">
                    <div className="form__overlay">
                        <div className="form__overlay-panel form__overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                To keep connected with us please login with your
                                personal info
                            </p>
                            <button
                                className="form__btn__ghost"
                                onClick={isShowSignup}
                            >
                                <Link to="/buyer/signin">Sign In</Link>
                            </button>
                        </div>
                        <div className="form__overlay-panel form__overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start journey
                                with us
                            </p>
                            <button
                                className="form__btn__ghost"
                                onClick={isShowSignup}
                            >
                                <Link to="/buyer/signup">Sign Up</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="form__footer">
                <p>
                    Shop điện tử Iphone <i className="fa fa-heart" /> của
                    <a type="link"> Hoàng Long</a> - Xin chân thành cảm ơn quý
                    khách đã ghé qua ạ
                </p>
            </footer>
        </div>
    );
}

LoginForm.propTypes = {};

export default LoginForm;
