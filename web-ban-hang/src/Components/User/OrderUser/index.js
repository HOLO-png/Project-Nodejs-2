import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import AllProduct from './AllProduct';
import WaitingConfirm from './WaitingConfirm';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Helmet from '../../Helmet';
import DrawerOrderPay from './DrawerOrderPay';
import { openNotification } from '../../../utils/messageAlear';
import { Link } from 'react-router-dom';
import { authSelector } from '../../../Store/Reducer/authReducer';
import {
    handleGetOrder,
    orderSelector,
} from '../../../Store/Reducer/orderReducer';
const { TabPane } = Tabs;

const OrderUserConFirm = styled.div`
    .ant-tabs-tab {
        width: 140px;
    }
    .ant-tabs-nav-list {
        transition: 2s width ease;
    }
    .ant-tabs-tab-btn {
        margin-left: 10px;
    }
`;

function OrderUser(props) {
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);
    const orderSlt = useSelector(orderSelector);

    const [orders, setOrders] = useState([]);
    const [visible, setVisible] = useState(false);
    const [placement, setPlacement] = useState('right');
    const [dataOrder, setDataOrder] = useState();
    const [productWaitingConfirm, setProductWaitingConfirm] = useState(null);
    const [delivery, setDelivery] = useState(null);
    const [delivered, setDelivered] = useState(null);
    const [cancelOrder, setCancelOrder] = useState(null);
    const [orderSearch, setOrderSearch] = useState(null);

    const { profilePicture } = auth.user;

    useEffect(() => {
        if (auth.tokenAuth) {
            dispatch(handleGetOrder({ tokenAuth: auth.tokenAuth }));
        }
    }, [dispatch, auth.tokenAuth]);

    useEffect(() => {
        if (orderSlt.orders) {
            setOrders(orderSlt.orders);
        }
    }, [orderSlt.orders]);

    useEffect(() => {
        const orderWaitingConfirm = orders.filter(
            (item) => item.complete === 'pending',
        );
        setProductWaitingConfirm(orderWaitingConfirm);

        const orderDelivery = orders.filter(
            (item) => item.complete === 'driver',
        );
        setDelivery(orderDelivery);

        const orderDelivered = orders.filter(
            (item) => item.complete === 'driver complete',
        );
        setDelivered(orderDelivered);

        const orderCancel = orders.filter((item) => item.complete === 'cancel');
        setCancelOrder(orderCancel);
    }, [orders]);

    const handleOrderActive = (order) => {
        setDataOrder(order);
        setVisible(true);
    };

    const onChange = (e) => {
        setPlacement(e.target.value);
    };

    const onClose = () => {
        setVisible(false);
    };

    const handleCancelOrderProduct = (order) => {
        const objData = {
            ...order,
            status: {
                title: 'Đã hủy đơn hàng',
                icon: 'fa-ban',
            },
            active: false,
        };
    };

    const handleOrderRecovery = (order) => {
        const objData = {
            ...order,
            status: {
                title: 'Đang chờ xử lý',
                icon: 'fa-badge-check',
            },
        };
        setVisible(false);
    };

    const handleSetValueSearchOrder = (value) => {
        if (value) {
            if (orders.length) {
                const orderSearch = [];
                orders.forEach((order) => {
                    const isCheck = order.products.some((product) => {
                        if (
                            value.trim() === '' ||
                            product.name
                                .toLowerCase()
                                .indexOf(value.toLowerCase()) !== -1
                        ) {
                            return true;
                        }
                        return false;
                    });
                    if (isCheck) {
                        orderSearch.push(order);
                    }
                });
                setOrderSearch(orderSearch);
            }
        } else {
            setOrderSearch(null);
        }
    };

    return (
        <Helmet title="Payment">
            <OrderUserConFirm>
                <Tabs defaultActiveKey="1" type="card" size={110}>
                    <TabPane tab="Tất cả đơn hàng" key="1">
                        <AllProduct
                            orders={orderSearch === null ? orders : orderSearch}
                            handleOrderActive={handleOrderActive}
                            photoURL={profilePicture}
                            handleSetValueSearchOrder={
                                handleSetValueSearchOrder
                            }
                        />
                    </TabPane>
                    <TabPane tab="Đang chờ xử lý" key="2">
                        <WaitingConfirm
                            order={productWaitingConfirm}
                            photoURL={profilePicture}
                            handleOrderActive={handleOrderActive}
                        />
                    </TabPane>
                    <TabPane tab="Đang giao hàng" key="3">
                        <WaitingConfirm
                            order={delivery}
                            photoURL={profilePicture}
                            handleOrderActive={handleOrderActive}
                        />
                    </TabPane>
                    <TabPane tab="Đã giao hàng" key="5">
                        <WaitingConfirm
                            order={delivered}
                            photoURL={profilePicture}
                            handleOrderActive={handleOrderActive}
                        />
                    </TabPane>
                    <TabPane tab="Đã huỷ đơn hàng" key="6">
                        <WaitingConfirm
                            order={cancelOrder}
                            photoURL={profilePicture}
                            handleOrderActive={handleOrderActive}
                        />
                    </TabPane>
                </Tabs>
                <DrawerOrderPay
                    visible={visible}
                    placement={placement}
                    onChange={onChange}
                    onClose={onClose}
                    dataOrder={dataOrder}
                    photoURL={profilePicture}
                    handleCancelOrderProduct={handleCancelOrderProduct}
                    handleOrderRecovery={handleOrderRecovery}
                />
            </OrderUserConFirm>
        </Helmet>
    );
}

OrderUser.propTypes = {};

export default OrderUser;
