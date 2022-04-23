import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TableCategoryModal from './TableCategoryModal';
import TableCategoryHighlights from './TableCategoryHighlights';
import TableCategoryEvent from './TableCategoryEvent';

const TableCategoryStyle = styled.div`
    position: absolute;
    left: 100%;
    width: 700px;
    height: 500px;
    background: #fff;
    top: 0;
    box-shadow: 0px 0px 5px 1px #cecece;
    .table-title {
        height: 55px;
        font-size: 16px;
        &-name {
            line-height: 22px;
            text-align: center;
            display: block;
            transform: translateY(11px);
        }
    }
    .table-content {
        padding: 23px 40px;
    }
    .title-category {
        text-align: center;
        font-weight: 600;
        font-size: 15px;
    }
`;
function TableCategoryProducts(props) {
    const {
        showTable,
        handleShowCategoryProduct,
        data,
        isShow,
        changeDataCategory,
    } = props;

    return showTable ? (
        <TableCategoryStyle className="table-category-product">
            <div className="table-title">
                <span className="table-title-name">Phân Loại Sản Phẩm</span>
            </div>
            <div className="table-content">
                <div className="row">
                    <TableCategoryModal
                        handleShowCategoryProduct={handleShowCategoryProduct}
                        changeDataCategory={changeDataCategory}
                    />
                    <TableCategoryHighlights data={data} isShow={isShow} />
                    <TableCategoryEvent />
                </div>
            </div>
        </TableCategoryStyle>
    ) : (
        ''
    );
}

TableCategoryProducts.propTypes = {};

export default TableCategoryProducts;
