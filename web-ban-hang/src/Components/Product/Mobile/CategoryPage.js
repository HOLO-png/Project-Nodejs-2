import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Col, Empty, Row, Tabs } from 'antd';
import Helmet from '../../Helmet';
import ProductPortfolio from './CustomSearch/ProductPortfolio';
import AllProductMobile from './TabMobile/AllProductMobile';
import ProductHot from './TabMobile/ProductHot';
import { sortHightToLow, sortLowToHight } from '../../../utils/sortProduct';
import PaginationProduct from './PaginationProduct';
import Paginations from '../../ProductItem/Comment/Pagination';
import { useDispatch } from 'react-redux';
import {
    getSearchProductCategoryApi,
    handleSetIsLoad,
} from '../../../Store/Reducer/searchProductCategory';
const { TabPane } = Tabs;

const MobileLayout = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 2px 1px #d7d7d7;
    .ant-list-split .ant-list-item {
        border-bottom: none;
    }
    .ant-list-bordered {
        border: none;
    }
    .ant-list-bordered.ant-list-sm .ant-list-item {
        padding: 2px 16px;
        cursor: pointer;
        justify-content: flex-start;
    }
    .ant-list-header {
        font-size: 17px;
        color: #a8a8a8;
    }
    .mobile-address,
    .mobile-service {
        margin-top: 15px;
    }
    p {
        margin: -2px 10px;
    }
    .mobile-price-clause {
        margin: 16px;
        p {
            font-size: 15px;
            color: #878787;
        }
        .ant-input-number,
        .ant-btn {
            margin: 10px;
        }
    }
    .mobile-title {
        display: flex;
        margin: 10px 0;
        font-size: 25px;
        color: #b6b6b6;
        font-weight: 300;
        p {
            font-size: 26px;
            margin: 0 10px;
            color: #333;
        }
    }
    button.slick-arrow.slick-prev {
        background: #3333331f;
        position: absolute;
        left: 0%;
        width: 4%;
        height: 162px;
        z-index: 1;
    }
    button.slick-arrow.slick-next {
        background: #3333331f;
        position: absolute;
        right: 0%;
        width: 4%;
        height: 162px;
        z-index: 1;
    }
    .mobile-tabs {
        .ant-tabs.ant-tabs-top {
            margin: 15px 0px;
        }
        .ant-tabs-tab {
            width: 100px;
            justify-content: center;
        }
    }
    .ant-tabs.ant-tabs-top.mobile-tabs {
        margin-top: 20px;
    }
    .mobile-source {
        font-size: 20px;
        color: #d7d7d7;
    }
    .product-cart {
        width: 98%;
        margin-left: 2px;
    }
    span {
        margin-left: 10px;
    }
    ul.ant-rate.ant-rate-disabled {
        font-size: 15px;
    }
    .product-optional span {
        margin-left: 0;
    }
`;

function CategoryPage(props) {
    const {
        data1,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data10,
        data9,
        products,
        slide_mobile,
        title,
        slideStatus,
        keyword,
        isload,
        total,
        count,
        category,
        trademark,
    } = props;

    const dispatch = useDispatch();
    const [productAll, setProductAll] = useState([]);
    const [productCurrent, setProductCurrent] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const changeProductSmartPhone = () => {
        // const product_smart_phone = products.filter(
        //     (item) => item.description.format !== category1,
        // );
        // setProductAll(product_smart_phone);
        // setProductCurrent(product_smart_phone);
    };

    useEffect(() => {
        if (products) changeAllProduct();
    }, [products]);

    const changeProductCommonPhone = () => {
        // const product_smart_phone = products.filter(
        //     (item) => item.description.format === category1,
        // );
        // setProductAll(product_smart_phone);
        // setProductCurrent(product_smart_phone);
    };

    const changeAllProduct = () => {
        setProductAll(products);
        setProductCurrent(products);
    };

    const changeProductLandline = () => {
        // const product_smart_phone = products.filter(
        //     (item) => item.description.format === category2,
        // );
        // setProductAll(product_smart_phone);
        // setProductCurrent(product_smart_phone);
    };

    const changeSearchTrademark = (value) => {
        if (value === 'Tất Cả') {
            setProductAll(productCurrent);
        } else {
            const productTrademarkEvoder = productCurrent.filter(
                (item) => item.description.trademark === value,
            );
            setProductAll(productTrademarkEvoder);
        }
    };

    const handlePagination = (numPage) => {
        dispatch(handleSetIsLoad(true));
        dispatch(getSearchProductCategoryApi({ keyword, numPage }));
    };

    return (
        <Helmet title={title}>
            <MobileLayout>
                <div className="mobile-source">
                    <p>
                        Home <i className="fal fa-chevron-right"></i> {title}
                    </p>
                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <ProductPortfolio
                        data1={data1}
                        data2={data2}
                        data3={data3}
                        data4={data4}
                        data5={data5}
                        data6={data6}
                        data7={data7}
                        data8={data8}
                        data9={data9}
                        data10={data10}
                        changeProductSmartPhone={changeProductSmartPhone}
                        changeProductCommonPhone={changeProductCommonPhone}
                        changeAllProduct={changeAllProduct}
                        changeProductLandline={changeProductLandline}
                        changeSearchTrademark={changeSearchTrademark}
                        keyword={keyword}
                        category={category}
                        trademark={trademark}
                    />
                    <Col className="gutter-row" span={19}>
                        <div className="mobile-title">
                            Điện Thoại:
                            <p>{count}</p> kết quả
                        </div>
                        <div className="product-slides">
                            <div
                                style={{
                                    width: '100%',
                                    display: slideStatus,
                                }}
                            >
                                <Slider {...settings}>
                                    {slide_mobile.map((item, index) => (
                                        <div
                                            className="product-slide-item"
                                            key={index}
                                        >
                                            <img
                                                alt=""
                                                style={{ width: '100%' }}
                                                src={item}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <Tabs defaultActiveKey="1" className="mobile-tabs">
                            <TabPane tab="Tất Cả" key="1">
                                <AllProductMobile
                                    products={productAll}
                                    isload={isload}
                                />
                            </TabPane>
                            <TabPane tab="Bán Chạy" key="2">
                                <ProductHot products={productAll} />
                            </TabPane>
                            <TabPane tab="Hàng Mới" key="3">
                                <AllProductMobile products={productAll} />
                            </TabPane>
                            <TabPane tab="Từ Thấp Đến Cao" key="4">
                                <AllProductMobile
                                    products={sortLowToHight(productAll)}
                                />
                            </TabPane>
                            <TabPane tab="Từ Cao Đến Thấp" key="5">
                                <AllProductMobile
                                    products={sortHightToLow(productAll)}
                                />
                            </TabPane>
                        </Tabs>
                        {productAll.length ? (
                            <Paginations
                                total={total}
                                callBack={handlePagination}
                            />
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            </MobileLayout>
        </Helmet>
    );
}

CategoryPage.propTypes = {};

export default CategoryPage;
