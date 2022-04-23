import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import OrderProductItem from './OrderProductItem';

function OrderProducts(props) {
    const { dataOrder } = props;

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="order__product-title">
                    <span>Thông tin sản phẩm</span>
                </div>
                <div className="order__product">
                    {dataOrder.products.map((item) => (
                        <OrderProductItem item={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

OrderProducts.propTypes = {};

export default OrderProducts;
