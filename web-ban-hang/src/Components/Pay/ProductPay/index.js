import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Col, Empty, Row, Skeleton } from 'antd';
import { Input } from 'antd';
import Product from './Product';

const { TextArea } = Input;

const ProductsPayStyle = styled.div`
    height: auto;
    background: #fff;
    box-shadow: 0px 0px 10px 1px #e8e8e8;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
    overflow: hidden;
    .products-pay {
        &__row-title {
            border-bottom: 1px solid #eaeaea;
        }
        &__col {
        }
        &__name {
            font-size: 21px;
        }
        &__unit {
            font-size: 17px;
            color: #a2a2a2;
        }
        &__row-products {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            margin-top: 20px;
        }
        &__name-product {
            font-size: 17px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin: 0;
        }
        &__kind {
            font-size: 15px;
            font-weight: 600;
            color: #a2a2a2;
            margin: 0;
        }
        &__amount {
            margin-left: 25px;
            font-size: 17px;
            margin: 0;
        }
        &__price {
            color: #e67171;
            font-size: 17px;
            margin: 0;
        }
        &__unit-price {
            font-size: 17px;
            margin: 0;
        }
    }
    .flex-end {
        display: flex;
        justify-content: flex-end;
    }
    button.ant-btn.ant-btn-link {
        font-size: 17px;
    }
    img {
        width: 100%;
    }
    .contact-shop {
        border-top: 1px dashed #c5c5c5;
        &__message {
            font-size: 18px;
            color: #5ebcec;
        }
        &__message-price {
            display: flex;
            justify-content: space-between;
        }
        &__price {
            font-size: 17px;
        }
        &__content {
            font-size: 15px;
            color: #919191;
        }
    }
    .ant-empty {
        margin: 32px 30px;
    }
    .cart-seklentor {
        width: '100%';
    }
`;
function ProductsPay(props) {
    const { products_api, loading, handleChangeMessage } = props;

    const renderProductApi = products_api.map((product, index) =>
        loading ? (
            <Skeleton.Button
                active={true}
                size="large"
                shape="default"
                block={false}
                style={{
                    width: 1200,
                    display: 'flex',
                    alignItems: 'center',
                    height: '100px',
                    marginTop: 20,
                }}
                className="cart-seklentor"
                key={index}
            />
        ) : (
            <Product key={product._id} product={product} />
        ),
    );
    return (
        <ProductsPayStyle>
            <div className="products-pay">
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    className="products-pay__row-title"
                >
                    <Col className="gutter-row products-pay__col" span={13}>
                        <p className="products-pay__name">Sản phẩm</p>
                    </Col>
                    <Col className="gutter-row products-pay__col" span={3}>
                        <p className="products-pay__unit">Đơn Giá</p>
                    </Col>
                    <Col className="gutter-row products-pay__col" span={3}>
                        <p className="products-pay__unit">Số Lượng</p>
                    </Col>
                    <Col
                        className="gutter-row products-pay__col flex-end"
                        span={5}
                    >
                        <p className="products-pay__unit">Thành Tiền</p>
                    </Col>
                </Row>
                {renderProductApi.length ? renderProductApi : <Empty />}
            </div>
            <div className="contact-shop">
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    className="contact-shop__row-products"
                >
                    {loading ? (
                        <Skeleton.Button
                            active={true}
                            size="large"
                            shape="default"
                            block={false}
                            style={{
                                width: '550px',
                                display: 'flex',
                                alignItems: 'center',
                                height: '150px',
                                marginTop: 20,
                                marginLeft: 30,
                            }}
                            className="cart-seklentor"
                        />
                    ) : (
                        <Col className="gutter-row contact-shop__col" span={10}>
                            <div className="contact-shop__message">
                                Lời Nhắn
                            </div>
                            <TextArea
                                rows={4}
                                placeholder="Hãy để lại lời nhắn cho người bán..."
                                onChange={handleChangeMessage}
                            />
                        </Col>
                    )}
                    {loading ? (
                        <Skeleton.Button
                            active={true}
                            size="large"
                            shape="default"
                            block={false}
                            style={{
                                width: '550px',
                                display: 'flex',
                                alignItems: 'center',
                                height: '150px',
                                marginTop: 20,
                                marginLeft: 60,
                            }}
                            className="cart-seklentor"
                        />
                    ) : (
                        <Col className="gutter-row contact-shop__col" span={14}>
                            <div className="contact-shop__message-price">
                                <div className="contact-shop__message">
                                    Đơn Vị Vận Chuyển
                                </div>
                                <div className="contact-shop__price">
                                    ₫32.700
                                </div>
                            </div>
                            <div className="contact-shop__content">
                                Nhanh
                                <p className="contact-shop__info-ship">
                                    Nhận hàng vào 10 Th09 - 14 Th09 (Người bán ở
                                    trong khu vực giãn cách, thời gian giao hàng
                                    sẽ chậm hơn dự kiến.)
                                </p>
                            </div>
                            <Button type="link" disabled>
                                Thay Đổi
                            </Button>
                        </Col>
                    )}
                </Row>
            </div>
        </ProductsPayStyle>
    );
}

ProductsPay.propTypes = {};

export default ProductsPay;
