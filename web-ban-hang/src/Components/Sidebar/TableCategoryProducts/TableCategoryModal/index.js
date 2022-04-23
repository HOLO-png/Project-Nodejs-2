import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { category_side_bar } from '../../../../assets/fake-data';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CategoryProduct = styled.div`
    .category-product {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        ul {
            margin-top: 10px;
            .category-product-item {
                display: flex;
                align-items: center;
                width: 82px;
                li {
                    margin: 20px 10px;
                    cursor: pointer;
                    width: 55px;
                }
                i.fad.fa-caret-right {
                    font-size: 22px;
                    color: #255cd8;
                }
            }
        }
    }
`;
function TableCategoryModal(props) {
    const { handleShowCategoryProduct, changeDataCategory } = props;
    const [active, setActive] = useState(null);
    const [data, setData] = useState(null);
    const [showTable, setShowTable] = useState(false);

    const someHandler = (index, data, title) => {
        setActive(index);
        setShowTable(true);
        setData({ data, title });
    };

    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            if (!e.target.closest('.table-category-product')) {
                setShowTable(false);
                setActive(null);
            }
        });
        return () => {
            window.removeEventListener('mousemove', null);
        };
    }, []);

    useEffect(() => {
        handleShowCategoryProduct(data, showTable);
        return () => handleShowCategoryProduct();
    }, [data, showTable]);

    return (
        <div className="col-sm-3">
            <CategoryProduct>
                <div className="category-product">
                    <div className="title-category">Thể Loại</div>
                    <ul>
                        {changeDataCategory.category.map((item, index) => (
                            <Link
                                to={`/category/${
                                    changeDataCategory.title +
                                    '/' +
                                    item.name_category
                                }`}
                                key={index}
                            >
                                <div
                                    className="category-product-item"
                                    key={index}
                                    onMouseEnter={() =>
                                        someHandler(
                                            index,
                                            item.listData,
                                            changeDataCategory.title,
                                        )
                                    }
                                >
                                    <li
                                        key={index}
                                        style={{
                                            color:
                                                active === index && '#255cd8',
                                            fontWeight: active === index && 600,
                                        }}
                                    >
                                        {item.name_category}
                                    </li>
                                    {active === index ? (
                                        <i className="fad fa-caret-right"></i>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
            </CategoryProduct>
        </div>
    );
}

TableCategoryModal.propTypes = {};

export default TableCategoryModal;
