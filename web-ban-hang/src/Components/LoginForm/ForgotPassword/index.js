import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import { Button, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import InputField from '../../InputField';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    authSelector,
    forgotPasswordCall,
} from '../../../Store/Reducer/authReducer';
import { setLoadingAction } from '../../../Store/Reducer/loadingReducer';

ForgotPassword.propTypes = {
    onSubmit: PropTypes.func,
};
ForgotPassword.defaultProps = {
    onSubmit: null,
};

function ForgotPassword(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const auth = useSelector(authSelector);

    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('This field is required !'),
    });

    const handleSubmit = (val) => {
        dispatch(forgotPasswordCall(val.email));

    };

    useEffect(() => {
        if (auth.isForgetPassword) {
            history.push('/verify-email');
            setTimeout(() => {
                dispatch(setLoadingAction(false));
            }, 500);
        }
    }, [dispatch, history, auth.isForgetPassword]);

    return (
        <div className="form">
            <div className="form__forgot-password">
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
                                        Xác nhận tài khoản
                                    </h1>
                                    <div className="form__social-container"></div>
                                    <span>
                                        vui lòng nhập email của bạn vào để tìm
                                        tài khoản
                                    </span>
                                    <FastField
                                        name="email"
                                        component={InputField}
                                        label="Email"
                                        type="email"
                                        placeholder="Email ..."
                                    />
                                    <FormGroup>
                                        <Link to="/login">
                                            <Button
                                                type="button"
                                                className="btn-outline-light"
                                            >
                                                Cancel
                                            </Button>
                                        </Link>

                                        <Button type="submit">Search</Button>
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
