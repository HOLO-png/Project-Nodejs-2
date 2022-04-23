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
// import { AuthContext } from '../../Context/AuthProvider';
// import { addDocument } from '../../Firebase/Services';
import { isEmptyObject } from '../../utils/checkEmptyObj';
import { isEmptyObjectAll } from '../../utils/checkEmptyObjAll';
import { cartSelector } from '../../Store/Reducer/cartReducer';
import { authSelector } from '../../Store/Reducer/authReducer';

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
    // const data = React.useContext(AuthContext);
    const auth = useSelector(authSelector);
    const address_api = useSelector(addressApiSelector);
    const cartProducts = useSelector(cartSelector);
    const { linkText } = useParams();
    const [sumProduct, setSumProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
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
    const [address_user_api, setAddress_user_api] = useState(null);
    // const { id } = data.user;

    useEffect(() => {
        dispatch(getAddressApi());
        // dispatch(getCartProduct());
    }, [dispatch]);

    useEffect(() => {
        if (auth) {
            if (!auth.user.address.length) {
                setVisible(true);
            } else {
                console.log('ok');

                auth.user.address.forEach((item) => {
                    if (item.status) {
                        setObjAddress(item);
                        setvalueAddress(item);
                        setAddress_user_api(item);
                        item && setInputName(item.receiver || '');
                        item && setInputNumber(item.phoneNumber || '');
                    }
                });
            }
        }
    }, [auth]);

    console.log(visible);

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
            setVisible(false);
            setConfirmLoading(false);

            let o = Object.fromEntries(
                Object.entries({
                    id: address_user_api.id,
                    id_user: address_user_api.id_user,
                    tinh: objAddress.tinh || valueAddress.tinh,
                    quan: objAddress.quan || valueAddress.quan,
                    xa: objAddress.xa || valueAddress.xa,
                    mota: objAddress.mota || valueAddress.mota,
                    name_user: inputName,
                    number_phone: inputNumber,
                }).filter(([_, v]) => v !== ''),
            );

            const isEmpty = Object.values(o).every(
                (x) => x === null || x === '',
            );

            if (isEmpty) {
                messageToCart(false, 'Lỗi Khi Tải Dữ Liệu Lên!');
            } else {
                if (changeCheckbox) {
                    // ImportApiAddressNew(o);
                    messageToCart(true, 'Đã Tải Thành Công Địa Chỉ Mặc Định');
                } else {
                    setvalueAddress({ ...objAddress, ...o });
                    messageToCart(true, 'Đã Tải Thành Công Địa Chỉ Tạm Thời');
                }
            }
            setChangeCheckbox(false);
        }, 1000);
    };

    const onHandleValueImportAddress = (obj) => {
        setObjAddress(obj);
    };

    const handleCancel = () => {
        setVisible(false);
        setInputName(address_user_api.receiver || '');
        setInputNumber(address_user_api.phoneNumber || '');
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
