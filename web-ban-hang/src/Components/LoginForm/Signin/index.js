/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import * as Yup from 'yup';
import { FastField, Form, Formik, isEmptyChildren } from 'formik';
import { Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import InputField from '../../InputField';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

Signin.propTypes = {
    onSubmit: PropTypes.func,
};
Signin.defaultProps = {
    onSubmit: null,
};

function Signin({ handleFbLogin, handleGgLogin, onSubmit }) {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('This field is required !'),
        password: Yup.string()
            .min(8, 'Minimum 8 characters')
            .required('This field is required !'),
    });

    return (
        <div className="form__container sign-in-container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formikProps) => {
                    const { values, errors, touched, isSubmitting } =
                        formikProps;
                    return (
                        <Form>
                            <h1 className="form__title">Sign in</h1>
                            <div className="form__social-container">
                                <FacebookLogin
                                    appId="1632142453817110"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={handleFbLogin}
                                />
                                <GoogleLogin
                                    clientId="355174219711-cisdj781jtsa2flfvgu86eii8b3knomq.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={handleGgLogin}
                                    onFailure={handleGgLogin}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <span>or use your account</span>
                            <FastField
                                name="email"
                                component={InputField}
                                label="Email"
                                type="email"
                                placeholder="Email ..."
                            />
                            <FastField
                                name="password"
                                component={InputField}
                                label="Password"
                                type="password"
                                placeholder="Password ..."
                            />
                            <Link to="/forgot-password">
                                <p>Đặt lại mật khẩu!</p>
                            </Link>
                            <FormGroup>
                                <Button type="submit" color="primary">
                                    Signin
                                </Button>
                            </FormGroup>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

Signin.propTypes = {};

export default Signin;
