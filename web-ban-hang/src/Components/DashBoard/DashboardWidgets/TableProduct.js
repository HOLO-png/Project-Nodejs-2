import React, { forwardRef, memo, useState } from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Pagination from './Pagination';
import numberWithCommas from '../../../utils/numberWithCommas';
import { Empty, Popconfirm, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

const TableProduct = forwardRef((props, ref) => {
    const {
        products,
        productsPerPage,
        totalProduct,
        paginate,
        isShowCategoryOptions,
        handleRemoveProductItem,
        comments_users,
        handleEditProduct,
        setVisible,
        visible,
        product,
        setProduct,
        active,
        setActive,
        handleOnNavigation,
        productsSearch,
    } = props;

    const handleSetVisible = () => {
        setVisible(false);
    };

    const handleSetActiveProductDetail = () => {
        setProduct(null);
        setActive(null);
    };

    const handleRenderUITabletItem = (products) => {
        if (products) {
            return products.map((item, index) => (
                <tr
                    key={index}
                    className={
                        active === index
                            ? 'product-item active-row'
                            : 'product-item'
                    }
                >
                    <td style={{ width: 100 }}>
                        <img
                            alt={index}
                            src={item.varation[0].image || ''}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td className="name td-text">
                        <p>{item.name}</p>
                    </td>
                    <td className="name">{item.description.trademark}</td>
                    <td className="name price">
                        {numberWithCommas(item.price)}
                        <sup> đ</sup>
                    </td>
                    {!isShowCategoryOptions && (
                        <td className="name">
                            <div className="name-action">
                                <Tooltip
                                    title="Xem chi tiết sản phẩm"
                                    color="yellow"
                                >
                                    <i
                                        className="fad fa-info-circle"
                                        onClick={() =>
                                            handleOnNavigation(index, item)
                                        }
                                    ></i>
                                </Tooltip>

                                <Tooltip title="Sửa sản phẩm" color="geekblue">
                                    <Link to="/dashboard/widgets/update-product">
                                        <i
                                            className="fad fa-edit"
                                            onClick={() =>
                                                handleEditProduct(item)
                                            }
                                        ></i>
                                    </Link>
                                </Tooltip>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa sản phẩm này ?"
                                    onConfirm={() =>
                                        handleRemoveProductItem(item)
                                    }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Tooltip title="Xóa sản phẩm" color="red">
                                        <i className="fad fa-trash-alt"></i>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                        </td>
                    )}
                </tr>
            ));
        } else {
            return (
                <>
                    <tr>
                        <td className="name td-text"></td>
                        <td className="name td-text">
                            <Empty />
                        </td>
                        <td className="name td-text"></td>
                    </tr>
                </>
            );
        }
    };
    return (
        <>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th style={{ width: '45%' }}>Name</th>
                        <th
                            style={{
                                width: !isShowCategoryOptions ? '15%' : '20%',
                            }}
                        >
                            Trademark
                        </th>
                        <th>Price</th>
                        {!isShowCategoryOptions && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {productsSearch.length
                        ? handleRenderUITabletItem(productsSearch)
                        : handleRenderUITabletItem(products)}
                </tbody>
            </table>
            <Navigation
                visible={visible}
                handleSetVisible={handleSetVisible}
                product={product}
                handleSetActiveProductDetail={handleSetActiveProductDetail}
                comments_users={comments_users}
            />
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={totalProduct}
                paginate={paginate}
                ref={ref}
            />
        </>
    );
});

TableProduct.propTypes = {};

export default memo(TableProduct);
