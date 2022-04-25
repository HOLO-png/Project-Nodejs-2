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
import Paypal from '../../Components/Pay/Paypal';
import { openNotification } from '../../utils/messageAlear';
import moment from 'moment';
import { isEmptyObject } from '../../utils/checkEmptyObj';
import { isEmptyObjectAll } from '../../utils/checkEmptyObjAll';
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

    const [sumProduct, setSumProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        dispatch(getAddressApi());
        if (auth) {
            dispatch(getUserAddress({ token: auth.tokenAuth }));
        }
    }, [auth, dispatch]);

    console.log(userAddress);

    useEffect(() => {
        if (!userAddress) {
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
    }, [userAddress]);

    // useEffect(() => {
    //     setLoading(true);
    //     const timeLoading = setTimeout(() => {
    //         if (cartProduct.length && data.user.address) {
    //             setLoading(false);
    //         }
    //     }, 500);
    //     document.body.style.overflow = '';
    //     return () => {
    //         clearTimeout(timeLoading);
    //     };
    // }, [cartProduct, data.user.address]);

    useEffect(() => {
        const sumValues = products.reduce(
            (total, product) => total + product.price * product.amount,
            0,
        );
        setSumProduct(sumValues);
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

    console.log(products);

    // // DeliveryAddress
    // const ImportApiAddressNew = (obj) => {
    //     if (user === null) {
    //         return;
    //     }

    //     db.collection('users')
    //         .doc(id)
    //         .update({
    //             ...data.user,
    //             address: changeAddressToObjActive(data.user.address, obj),
    //         })
    //         .then(() => {})
    //         .catch((error) => {});
    // };

    const changeAddressToObjActive = (array, obj) => {
        return array.map(function (item) {
            return item.id === obj.id
                ? { ...obj, status: true }
                : { ...item, status: false };
        });
    };

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
                    status: changeCheckbox,
                    tokenAuth: auth.tokenAuth,
                };
                console.log({ o, address_user_api });

                if (
                    (address_user_api._id &&
                        o.tinh !== address_user_api.address.tinh &&
                        o.quan !== address_user_api.address.quan &&
                        o.xa !== address_user_api.address.xa) ||
                    inputName !== address_user_api.username ||
                    inputNumber !== address_user_api.phoneNumber
                ) {
                    dispatch(
                        updateUserAddress({
                            data,
                            userAddressId: address_user_api._id,
                        }),
                    );
                } else if (userAddressDefault) {
                    if (userAddressDefault !== address_user_api._id) {
                        dispatch(
                            updateStatusUserAddress({
                                tokenAuth: auth.tokenAuth,
                                userAddressId: userAddressDefault,
                            }),
                        );
                    } else {
                        toast.warning('Bi trung dia chi!');
                    }
                } else {
                    dispatch(insertUserAddress(data));
                }
            }
            setChangeCheckbox(false);
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
        if (payMethod) {
            if (!isEmptyObject(valueAddress || {})) {
                const obj = {
                    ...valueAddress,
                    products,
                    status: {
                        title: 'Đang chờ xử lý',
                        icon: 'fa-badge-check',
                    },
                    message: message,
                    dateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                delete obj.id;

                // addDocument('orders', obj);

                setTimeout(() => {
                    openNotification(
                        'Xin Chúc Mừng',
                        `Bạn Đã Đặt ${products.length} sản phẩm thành Công`,
                    );
                    history.push('/user/all');
                }, 500);

                products.forEach((element) => {
                    setTimeout(async () => {
                        // await dispatch(deleteCartProductAllApi(element));
                    }, 100);
                });
            } else {
                messageToCart(
                    false,
                    'Xin Lỗi, Bạn Chưa Có Địa Chỉ Mặc Định, Vui Lòng Nhập Lại!',
                );
            }
        } else {
            messageToCart(
                false,
                'Xin Lỗi, Vui Lòng Chọn Phương Thức Thanh Toán Trước Khi Đặt Hàng!',
            );
        }
    };

    const handleShowPayTable = (method) => {
        if (method === 'Thanh Toán Online') {
            setIsShowTablePay(!isShowTablePay);
        } else {
            setIsShowTablePay(false);
            setShowPayPal(false);
        }
    };

    const handleIntegrate = (key) => {
        if (key === 'PayPal') {
            // setIsShowTablePay(false);
            setShowPayPal(true);
        }
    };

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    // End
    return (
        <Helmet title="Cart">
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
