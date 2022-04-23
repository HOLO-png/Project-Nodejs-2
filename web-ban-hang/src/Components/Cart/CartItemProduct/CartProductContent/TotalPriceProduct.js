import React from 'react';
import PropTypes from 'prop-types';
import { Col, Tag } from 'antd';
import numberWithCommas from '../../../../utils/numberWithCommas';

function TotalPriceProduct(props) {
    const { amout, product } = props;
    return (
        <Col className="gutter-row" span={3}>
            <Tag color="red" style={{ fontSize: '17px' }}>
                {numberWithCommas(product.price * amout)}
                <sup> đ</sup>
            </Tag>
        </Col>
    );
}

TotalPriceProduct.propTypes = {};

export default TotalPriceProduct;
