/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Dropdown, Row, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import numberWithCommas from '../../../../utils/numberWithCommas';
import { menu } from '../../MenuCart';
import ImageNameCapacityProduct from './ImageNameCapacityProduct';
import AmountProduct from './AmountProduct';
import UnitPriceProduct from './UnitPriceProduct';
import TotalPriceProduct from './TotalPriceProduct';
import QuerationProduct from './QuerationProduct';

function CartProductContent(props) {
    const {
        onChange,
        product,
        handleRemoveNum,
        onHandleValueNum,
        handleSumNum,
        amout,
        activeSearchSimilar,
        index,
        handleShowSearchProductActive,
        statusSearchSimilar,
        mobile_api,
        searchSimilar,
        loadingSimilar,
    } = props;
    return (
        <div
            className="cart-content"
            style={{ borderBottom: '1px solid #dbdbdb' }}
        >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <ImageNameCapacityProduct
                    onChange={onChange}
                    product={product}
                />
                <UnitPriceProduct product={product} />

                <AmountProduct
                    handleRemoveNum={handleRemoveNum}
                    onHandleValueNum={onHandleValueNum}
                    handleSumNum={handleSumNum}
                />

                <TotalPriceProduct amout={amout} product={product} />

                <QuerationProduct
                    product={product}
                    activeSearchSimilar={activeSearchSimilar}
                    index={index}
                    handleShowSearchProductActive={
                        handleShowSearchProductActive
                    }
                    statusSearchSimilar={statusSearchSimilar}
                    mobile_api={mobile_api}
                    searchSimilar={searchSimilar}
                    loadingSimilar={loadingSimilar}
                />
            </Row>
        </div>
    );
}

CartProductContent.propTypes = {};

export default CartProductContent;
