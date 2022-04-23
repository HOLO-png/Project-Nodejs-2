import React from 'react';
import PropTypes from 'prop-types';
import ProductPayItem from './ProductPayItem';
import OrderPayProduct from './OrderPayProduct';

function OrderPayProducts(props) {
    const { orders, handleOrderActive, photoURL, handleChangeDataValue } =
        props;
    return (
        <div className="user-order__product-all">
            {orders.map((order, index) => (
                <OrderPayProduct
                    order={order}
                    key={order.id}
                    index={index}
                    handleOrderActive={handleOrderActive}
                    photoURL={photoURL}
                    handleChangeDataValue={handleChangeDataValue}
                />
            ))}
        </div>
    );
}

OrderPayProducts.propTypes = {};

export default OrderPayProducts;
