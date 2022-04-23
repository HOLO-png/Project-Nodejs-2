import React, { useState } from 'react';
import * as Yup from 'yup';
import { FastField, Form, Formik, isEmptyChildren } from 'formik';
import { Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import InputField from '../../InputField';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPasswordCall } from '../../../Store/Reducer/authReducer';
import { setLoadingAction } from '../../../Store/Reducer/loadingReducer';
import { toast } from 'react-toastify';

ForgotPassword.propTypes = {
    onSubmit: PropTypes.func,
};
ForgotPassword.defaultProps = {
    onSubmit: null,
};

function ForgotPassword(props) {
    const { token } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const initialValues = {
        password_old: '',
        password_new: '',
        confirm_password: '',
    };

    const validationSchema = Yup.object().shape({
        password_old: Yup.string()
            .min(8, 'Minimum 8 characters')
            .required('This field is required !'),
        password_new: Yup.string()
            .min(8, 'Minimum 8 characters')
            .required('This field is required !'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password_new')], "Password's not match")
            .required('Required!'),
    });

    const handleSubmit = (val) => {
        if (val.password_old !== val.password_new) {
            dispatch(setLoadingAction(true));
            dispatch(resetPasswordCall({ val, token, history }));
            setTimeout(() => {
                dispatch(setLoadingAction(false));
            }, 500);
        } else {
            toast.error('Mật khẩu mới không được trùng với mật khẩu cũ!');
        }
    };

    return (
        <div className="form">
            <div
                className="form__forgot-password"
                style={{ minHeight: '400px' }}
            >
                <div className="form__container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formikProps) => {
                            const { values, errors, touched, isSubmitting } =
                                formikProps;
                            return (
                                <Form>
                                    <h1 className="form__title">
                                        Đặt lại mật khẩu
                                    </h1>
                                    <div className="form__social-container"></div>
                                    <span>
                                        Nhập mật khẩu cũ của bạn vào đây!
                                    </span>
                                    <FastField
                                        name="password_old"
                                        component={InputField}
                                        label="Password Old"
                                        type="text"
                                        placeholder="password old ..."
                                        style={{ width: 400 }}
                                    />
                                    <span>
                                        Nhập mật khẩu mới của bạn vào đây!
                                    </span>
                                    <FastField
                                        name="password_new"
                                        component={InputField}
                                        label="Password New"
                                        type="text"
                                        placeholder="password new..."
                                        style={{ width: 400 }}
                                    />
                                    <FastField
                                        name="confirm_password"
                                        component={InputField}
                                        label="ConfirmPassword"
                                        type="password"
                                        placeholder="Confirm Password ..."
                                    />
                                    <FormGroup>
                                        <Button type="submit">Submit</Button>
                                    </FormGroup>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

ForgotPassword.propTypes = {};

export default ForgotPassword;
