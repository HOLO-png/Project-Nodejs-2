import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { humanImg } from '../../../../assets/fake-data/human.js';
import { Button, Drawer, Empty, Tooltip } from 'antd';
import numberWithCommas from '../../../../utils/numberWithCommas.js';
import OrderItem from '../OrderItem.js';
import { useDispatch } from 'react-redux';
import {
    handleCreateOrderToGHN,
    handleUpdateStatusOrder,
} from '../../../../Store/Reducer/orderReducer.js';
import { toast } from 'react-toastify';

function OrderDrawerBox({ visible, setVisible, orderItem, userAddress, userAddressAdmin }) {
    const dispatch = useDispatch();
    const [orderCreated, setOrderCreated] = useState('');

    useEffect(() => {
        if (orderItem) {
            const d = new Date(orderItem.createdAt);
            const orderCreated =
                d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString();
            setOrderCreated(orderCreated);
        }
    }, [orderItem]);

    const onClose = () => {
        setVisible(false);
    };

    console.log(orderItem);

    const handleConfirmOrder = (order) => {
        if (orderItem) {
            userAddress.items.forEach((item) => {
                if (item.status) {
                    dispatch(
                        handleCreateOrderToGHN({
                            toName: orderItem.username,
                            toPhone: orderItem.phoneNumber,
                            toAddress: `${orderItem.city.mota}, ${orderItem.city.xa.WardName}, ${orderItem.city.quan.DistrictName}, ${orderItem.city.tinh.ProvinceName}, Vietnam`,
                            toWardCode: orderItem.city.xa.WardCode,
                            toDistrictId: orderItem.city.quan.DistrictID,
                            returnPhone: item.phoneNumber,
                            returnDistrictId: item.address.quan.DistrictID,
                            returnWardCode: item.address.xa.WardCode,
                            returnAddress: `${item.address.mota}, ${item.address.xa.WardName}, ${item.address.quan.DistrictName}, ${item.address.tinh.ProvinceName}, Vietnam`,
                            clientOrderCode: '',
                            codAmount:
                                orderItem.products.reduce(
                                    (accumulator, item) => {
                                        return (
                                            accumulator + item.price * item.qty
                                        );
                                    },
                                    0,
                                ) + orderItem.paymentFee,
                            content: orderItem.products.reduce(
                                (accumulator, item) => {
                                    return accumulator + item.name + ', ';
                                },
                                '',
                            ),
                            weight: orderItem.products.reduce(
                                (accumulator, item) => {
                                    return (
                                        accumulator +
                                        Number(item.sizeInformation.weight)
                                    );
                                },
                                0,
                            ),
                            length: orderItem.products.reduce(
                                (accumulator, item) => {
                                    return (
                                        accumulator +
                                        Number(item.sizeInformation.length)
                                    );
                                },
                                0,
                            ),
                            width: orderItem.products.reduce(
                                (accumulator, item) => {
                                    return (
                                        accumulator +
                                        Number(item.sizeInformation.width)
                                    );
                                },
                                0,
                            ),
                            height: orderItem.products.reduce(
                                (accumulator, item) => {
                                    return (
                                        accumulator +
                                        Number(item.sizeInformation.height)
                                    );
                                },
                                0,
                            ),
                            pickStationId: orderItem.city.quan.DistrictID,
                            insuranceValue: orderItem.products.reduce(
                                (accumulator, item) => {
                                    return (
                                        accumulator +
                                        Number(item.price) * item.qty
                                    );
                                },
                                0,
                            ),
                            coupon: null,
                            serviceTypeId: orderItem.serviceTypeId,
                            paymentTypeId: 2,
                            note: orderItem.message,
                            requiredNote: 'CHOTHUHANG',
                            pickShift: [2],
                            items: orderItem.products.map(product => {
                                return {
                                    name: product.name,
                                    code: product.productId,
                                    quantity: product.qty,
                                    price: +product.price,
                                    length:  Math.round(+product.sizeInformation.length),
                                    width:  Math.round(+product.sizeInformation.width),
                                    height:  Math.round(+product.sizeInformation.height),
                                    category:
                                    {
                                        level1: product.category
                                    }
                                }
                            })
                        }),
                    );
                }
            });

            dispatch(
                handleUpdateStatusOrder({
                    orderId: order._id,
                    complete: 'confirm',
                }),
            );
            
            toast.success(`Đơn hàng ${order._id} đã được xác nhận!`);
            setVisible(false);
        }
    };

    return (
        <>
            <Drawer
                width={840}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <div className="logo-bar">
                    <div className="container-customer">
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-8 customer-info">
                                <div className="top-info-block d-inline-flex">
                                    {orderItem && orderItem.phoneNumber ? (
                                        <>
                                            <div className="icon-block">
                                                <i className="fal fa-phone"></i>
                                            </div>
                                            <div className="info-block">
                                                <h5 className="font-weight-500">
                                                    {orderItem.phoneNumber}
                                                </h5>
                                                <p>Phone Number</p>
                                            </div>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="top-info-block d-inline-flex">
                                    <div className="icon-block">
                                        <i className="fal fa-envelope"></i>
                                    </div>
                                    <div className="info-block">
                                        <h5 className="font-weight-500">
                                            {orderItem && orderItem.email}
                                        </h5>
                                        <p>Email Us</p>
                                    </div>
                                </div>
                                <div className="top-info-block d-inline-flex">
                                    <div className="icon-block">
                                        <i className="fal fa-alarm-clock"></i>
                                    </div>
                                    <div className="info-block">
                                        <h5 className="font-weight-500">
                                            {orderCreated}{' '}
                                        </h5>
                                        <p>Created At</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="banner-area py-7">
                    {/* Content */}
                    <div className="container-customer">
                        <div className="row  align-items-center">
                            <div className="col-lg-6">
                                <div className="main-banner">
                                    <h1 className="display-4 mb-4 font-weight-normal">
                                        {orderItem && orderItem.username}
                                    </h1>
                                    <p className="lead mb-4">
                                        Gender: {orderItem && orderItem.gender}
                                    </p>
                                    <p className="lead mb-4">
                                        Date created: {orderCreated}
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="banner-img-block">
                                    <img
                                        src={
                                            (orderItem &&
                                                orderItem.profilePicture) ||
                                            humanImg
                                        }
                                        alt="banner-img"
                                        className="img-fluid"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                'https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>{' '}
                        {/* / .row */}
                    </div>{' '}
                    {/* / .container */}
                </section>
                <section className="section bg-grey" id="feature">
                    <h4 className="address-user-title">Order User</h4>
                    <div className="container-customer">
                        <section className="ftco-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            <table className="table">
                                                <thead className="thead-primary">
                                                    <tr>
                                                        <th>&nbsp;</th>
                                                        <th>&nbsp;</th>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>total</th>
                                                        <th>&nbsp;</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderItem &&
                                                        orderItem.products.map(
                                                            (product) => (
                                                                <tr
                                                                    className="alert"
                                                                    role="alert"
                                                                >
                                                                    <td>
                                                                        <label className="checkbox-wrap checkbox-primary">
                                                                            <input
                                                                                type="checkbox"
                                                                                defaultChecked
                                                                            />
                                                                            <span className="checkmark" />
                                                                        </label>
                                                                    </td>
                                                                    <td>
                                                                        <div className="img">
                                                                            <img
                                                                                src={
                                                                                    product.image
                                                                                }
                                                                                alt="image-product"
                                                                                style={{
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    marginLeft:
                                                                                        '46%',
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="email">
                                                                            <span>
                                                                                {
                                                                                    product.name
                                                                                }
                                                                            </span>
                                                                            <span></span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        {numberWithCommas(
                                                                            product.price,
                                                                        )}
                                                                        đ
                                                                    </td>
                                                                    <td className="quantity">
                                                                        <div className="input-group">
                                                                            {
                                                                                product.qty
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        {numberWithCommas(
                                                                            product.price *
                                                                            product.qty,
                                                                        )}
                                                                        đ
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="check-payment">
                        <div className="total-payment">
                            <span>Tổng:</span>{' '}
                            <span>
                                {numberWithCommas(
                                    orderItem &&
                                    orderItem.products.reduce(
                                        (accumulator, item) => {
                                            return (
                                                accumulator +
                                                item.price * item.qty
                                            );
                                        },
                                        0,
                                    ),
                                )}
                                đ
                            </span>
                        </div>
                        <div className="fee-shipping">
                            <span>Phí ship:</span>{' '}
                            <span>
                                {numberWithCommas(
                                    orderItem && orderItem.paymentFee,
                                )}
                                đ
                            </span>
                        </div>
                        <div className="payment-action">
                            <span>Thanh toán:</span>{' '}
                            <span>
                                {numberWithCommas(
                                    orderItem &&
                                    orderItem.products.reduce(
                                        (accumulator, item) => {
                                            return (
                                                accumulator +
                                                item.price * item.qty
                                            );
                                        },
                                        0,
                                    ) + orderItem.paymentFee,
                                )}
                                đ
                            </span>
                        </div>{' '}
                        {orderItem && orderItem.complete !== 'confirm' ? (
                            orderItem.complete !== 'cancel' ? (
                                <Button
                                    type="primary"
                                    size={100}
                                    onClick={() =>
                                        handleConfirmOrder(orderItem)
                                    }
                                >
                                    Xác nhận đơn hàng
                                </Button>
                            ) : (
                                <Button type="primary" size={100} disabled>
                                    Đơn hàng đã bị hủy
                                </Button>
                            )
                        ) : (
                            <Button type="primary" size={100} disabled>
                                Đơn hàng đã được xác nhận
                            </Button>
                        )}
                    </div>

                    {/* / .container */}
                </section>
            </Drawer>
        </>
    );
}

OrderDrawerBox.propTypes = {};

export default OrderDrawerBox;
