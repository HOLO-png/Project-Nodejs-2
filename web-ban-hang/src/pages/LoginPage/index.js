import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from '../../Components/Helmet';
import LoginForm from '../../Components/LoginForm';
import { useDispatch } from 'react-redux';
import { setLoadingAction } from '../../Store/Reducer/loadingReducer';

function LoginPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoadingAction(false));
        }, 500);
    }, [dispatch]);

    return (
        <Helmet title="Login">
            <LoginForm />
        </Helmet>
    );
}

LoginPage.propTypes = {};

export default LoginPage;
