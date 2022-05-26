import React from 'react';
import PropTypes from 'prop-types';

function CardOrder({ title, count }) {
    return (
        <div class="card-order">
            <h3 className="card-order-title ">
                <span class="enclosed">{title}</span>
            </h3>
            <h3 className="card-order-content">
                <span class="enclosed">
                    {count} <p>Đơn hàng</p>
                </span>
            </h3>
        </div>
    );
}

CardOrder.propTypes = {};

export default CardOrder;
