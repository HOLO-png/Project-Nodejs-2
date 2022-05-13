import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Voucher from '../../Components/Pay/Voucher';
import DeliveryAddress from '../../Components/Pay/DeliveryAddress';
import { useDispatch, useSelector } from 'react-redux';
import {
    addressApiSelector,
    getAddressApi,
} from '../../Store/Reducer/apiAddress';
import ProductsPay from '../../Components/Pay/ProductPay';
import { useHistory, useParams } from 'react-router';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Payment from '../../Components/Pay/Payment/Payment';
import Helmet from '../../Components/Helmet';
import { message } from 'antd';

import PayMethod from '../../Components/Pay/PayMethod';
import { isEmptyObject } from '../../utils/checkEmptyObj';
import { cartSelector } from '../../Store/Reducer/cartReducer';
import { authSelector } from '../../Store/Reducer/authReducer';
import {
    getUserAddress,
    insertUserAddress,
    updateStatusUserAddress,
    updateUserAddress,
    userAddressSelector,
} from '../../Store/Reducer/userAddressReducer';
import { toast } from 'react-toastify';
import {
    loadingSelector,
    setLoadingAction,
} from '../../Store/Reducer/loadingReducer';
import {
    createPayment,
    handleResetUrl,
    paymentSelector,
} from '../../Store/Reducer/paymentReducer';
import {
    handleAddOrder,
    orderSelector,
} from '../../Store/Reducer/orderReducer';
const PayComponent = styled.div``;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    transition: display 0.5s ease;
`;

const messageToCart = (status, text) => {
    if (status) {
        message.success({
            content: text,
            className: 'custom-class',
            style: {
                marginTop: '0vh',
            },
        });
    } else {
        message.error({
            content: text,
            className: 'custom-class',
            style: {
                marginTop: '0vh',
            },
        });
    }
};

function Pay(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { linkText } = useParams();
    // data auth.user && auth.token
    const auth = useSelector(authSelector);
    // data address api
    const address_api = useSelector(addressApiSelector);
    // data cart products
    const cartProducts = useSelector(cartSelector);
    // data user address
    const userAddress = useSelector(userAddressSelector);
    const loading = useSelector(loadingSelector);
    const payment = useSelector(paymentSelector);
    const orderSlt = useSelector(orderSelector);

    const [sumProduct, setSumProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [valueAddress, setvalueAddress] = useState({
        tinh: '',
        quan: '',
        xa: '',
        mota: '',
    });
    const [objAddress, setObjAddress] = useState({
        tinh: '',
        quan: '',
        xa: '',
        mota: '',
    });
    const [inputName, setInputName] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [changeCheckbox, setChangeCheckbox] = useState(false);
    const [payMethod, setPayMethod] = useState('');
    const [isShowTablePay, setIsShowTablePay] = useState(false);
    const [showPayPal, setShowPayPal] = useState(false);
    const [message, setMessage] = useState('');
    const [userAddressDefault, setUserAddressDefault] = useState(null);
    const [address_user_api, setAddress_user_api] = useState(null);
    const [payMethodActive, setPayMethodActive] = useState(null);
    const [isRedirectToSuccessPage, setIsRedirectToSuccessPage] =
        useState(false);

    const { order, isError } = orderSlt;

    const { paymentUrl } = payment;

    useEffect(() => {
        dispatch(getAddressApi());
        if (auth.tokenAuth && auth.user) {
            dispatch(getUserAddress({ token: auth.tokenAuth }));
        } else {
            history.push('/buyer/signin');
        }
    }, [auth, history, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(handleResetUrl());
        };
    }, [dispatch]);

    useEffect(() => {
        if (paymentUrl) {
            const newWindow = window.open(
                paymentUrl,
                '_self',
                'noopener,noreferrer',
            );
            if (newWindow) newWindow.opener = null;
            dispatch(setLoadingAction(false));
        }
    }, [dispatch, paymentUrl]);

    useEffect(() => {
        if (!userAddress.items.length) {
            setVisible(true);
        } else {
            userAddress.items.forEach((item) => {
                if (item.status) {
                    setObjAddress(item.address);
                    setvalueAddress(item.address);
                    setAddress_user_api(item);
                    item && setInputName(item.username || '');
                    item && setInputNumber(item.phoneNumber || '');
                }
            });
            setVisible(false);
        }
    }, [dispatch, userAddress]);

    useEffect(() => {
        if (products) {
            const sumValues = products.reduce((accumulator, item) => {
                return accumulator + Number(item.price) * item.qty;
            }, 0);
            setSumProduct(sumValues);
        }
    }, [products]);

    useEffect(() => {
        if (cartProducts) {
            const { items } = cartProducts.cart;
            let arrText = linkText.split('+');
            const payProducts = [];

            arrText.forEach((text) => {
                if (text) {
                    items.forEach((item) => {
                        text === item._id && payProducts.push(item);
                    });
                }
            });
            setProducts(payProducts);
        }
    }, [cartProducts, linkText]);

    useEffect(() => {
        if (isRedirectToSuccessPage) {
            if (payMethod === 'Thanh Toán Khi Nhận Hàng') {
                if (products) {
                    if (order) {
                        if (!isError) {
                            const stringItemId = products.reduce(
                                (string, product) => {
                                    return string + '-' + product._id;
                                },
                                '',
                            );
                            history.push(
                                `/order/success/${order._id}?username=${inputName}&productsId=${stringItemId}&isPayment=false`,
                            );
                        } else {
                            history.push(`/order/cancel`);
                        }
                    }
                }
            }
        }
    }, [
        history,
        inputName,
        isError,
        isRedirectToSuccessPage,
        order,
        payMethod,
        products,
    ]);

    const showModal = () => {
        setVisible(true);
    };

    const handleChangeInputName = (e) => {
        setInputName(e.target.value);
    };

    const handleChangeInputNumber = (e) => {
        setInputNumber(e.target.value);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            let o = Object.fromEntries(
                Object.entries({
                    tinh: objAddress.tinh || valueAddress.tinh,
                    quan: objAddress.quan || valueAddress.quan,
                    xa: objAddress.xa || valueAddress.xa,
                    mota: objAddress.mota || valueAddress.mota,
                    name_user: inputName,
                    number_phone: inputNumber,
                    status: changeCheckbox,
                }),
            );

            const isEmpty = Object.values(o).some(
                (x) => x === null || x === '',
            );

            if (isEmpty) {
                messageToCart(false, 'Lỗi Khi Tải Dữ Liệu Lên!');
            } else {
                if (changeCheckbox) {
                    messageToCart(true, 'Đã Tải Thành Công Địa Chỉ Mặc Định');
                } else {
                    setvalueAddress({ ...objAddress, ...o });
                    messageToCart(true, 'Đã Tải Thành Công Địa Chỉ Tạm Thời');
                }
                const address = {
                    tinh: o.tinh,
                    quan: o.quan,
                    xa: o.xa,
                    mota: o.mota,
                };
                const data = {
                    username: inputName,
                    phoneNumber: inputNumber,
                    address,
                    status: true,
                    tokenAuth: auth.tokenAuth,
                };

                if (address_user_api) {
                    if (
                        (address_user_api._id &&
                            o.tinh !== address_user_api.address.tinh &&
                            o.quan !== address_user_api.address.quan &&
                            o.xa !== address_user_api.address.xa) ||
                        o.mota !== address_user_api.address.mota ||
                        inputName !== address_user_api.username ||
                        inputNumber !== address_user_api.phoneNumber
                    ) {
                        dispatch(
                            updateUserAddress({
                                data,
                                userAddressId: address_user_api._id,
                            }),
                        );
                    } else {
                        if (userAddressDefault) {
                            if (userAddressDefault !== address_user_api._id) {
                                dispatch(
                                    updateStatusUserAddress({
                                        tokenAuth: auth.tokenAuth,
                                        userAddressId: userAddressDefault,
                                    }),
                                );
                            } else {
                                toast.warning('Bị trùng địa chỉ rồi bro!');
                            }
                        }
                    }
                } else {
                    dispatch(insertUserAddress(data));
                }
            }
            setChangeCheckbox(false);
            setUserAddressDefault(null);
            setVisible(false);
        }, 1000);
    };

    const onHandleValueImportAddress = (obj) => {
        setObjAddress(obj);
    };

    const handleCancel = () => {
        if (address_user_api) {
            setInputName(address_user_api.username || '');
            setInputNumber(address_user_api.phoneNumber || '');
        }
        setVisible(false);
        setChangeCheckbox(false);
    };

    function onChangeCheckbox(e) {
        setChangeCheckbox(e.target.checked);
    }

    const handleChangeMethodPayProduct = (method) => {
        setPayMethod(method);
    };

    const handleMethodPayProduct = () => {
        if (!isEmptyObject(valueAddress || {})) {
            if (payMethod === 'Thanh toán Online') {
                if (payMethodActive) {
                    switch (payMethodActive.title) {
                        case 'PayPal':
                            dispatch(setLoadingAction(true));
                            dispatch(
                                createPayment({
                                    products,
                                    email: auth.user.email,
                                    message,
                                }),
                            );
                            break;
                        default:
                    }
                }
            } else if (payMethod === 'Thanh Toán Khi Nhận Hàng') {
                if (auth.tokenAuth) {
                    if (products.length) {
                        const productsId = [];
                        products.forEach((product) => {
                            productsId.push(product._id);
                        });
                        if (productsId.length) {
                            if (userAddress.items.length) {
                                userAddress.items.forEach((item) => {
                                    if (item.status) {
                                        dispatch(setLoadingAction(true));
                                        dispatch(
                                            handleAddOrder({
                                                tokenAuth: auth.tokenAuth,
                                                username: item.username,
                                                phoneNumber: item.phoneNumber,
                                                city: item.address,
                                                productsID: productsId,
                                                isPayment: false,
                                                message,
                                            }),
                                        );
                                        setIsRedirectToSuccessPage(true);
                                    }
                                });
                            }
                        }
                    }
                }
            } else {
                messageToCart(
                    false,
                    'Xin Lỗi, Vui Lòng Chọn Phương Thức Thanh Toán Trước Khi Đặt Hàng!',
                );
            }
        } else {
            messageToCart(
                false,
                'Xin Lỗi, Bạn Chưa Có Địa Chỉ Mặc Định, Vui Lòng Nhập Lại!',
            );
        }
    };

    const handleShowPayTable = (method) => {
        if (method === 'Thanh toán Online') {
            setIsShowTablePay(!isShowTablePay);
        } else {
            setIsShowTablePay(false);
            setShowPayPal(false);
        }
    };

    const handleIntegrate = (item) => {
        if (item.title) {
            setShowPayPal(true);
            setPayMethodActive(item);
            setIsShowTablePay(false);
        }
    };

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    // End
    return (
        <Helmet title="Payment">
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
            <PayComponent>
                <DeliveryAddress
                    address_api={address_api}
                    loading={loading}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    valueAddress={valueAddress}
                    showModal={showModal}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    modalText={modalText}
                    onHandleValueImportAddress={onHandleValueImportAddress}
                    objAddress={objAddress}
                    inputName={inputName}
                    inputNumber={inputNumber}
                    handleChangeInputName={handleChangeInputName}
                    handleChangeInputNumber={handleChangeInputNumber}
                    onChangeCheckbox={onChangeCheckbox}
                    userAddress={userAddress}
                    address_user_api={address_user_api}
                    setUserAddressDefault={setUserAddressDefault}
                    userAddressDefault={userAddressDefault}
                />
                <ProductsPay
                    products_api={products}
                    loading={loading}
                    handleChangeMessage={handleChangeMessage}
                />
                <Voucher loading={loading} />
                <Payment
                    sumProduct={sumProduct}
                    loading={loading}
                    handleMethodPayProduct={handleMethodPayProduct}
                    handleChangeMethodPayProduct={handleChangeMethodPayProduct}
                    handleShowPayTable={handleShowPayTable}
                    payMethodActive={payMethodActive}
                    setPayMethodActive={setPayMethodActive}
                />
                <PayMethod
                    isShowTablePay={isShowTablePay}
                    handleIntegrate={handleIntegrate}
                    showPayPal={showPayPal}
                />
            </PayComponent>
        </Helmet>
    );
}

Pay.propTypes = {};

export default Pay;
