/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider, Drawer, Empty, List, Typography } from 'antd';
import Slider from 'react-slick';
import parse from 'html-react-parser';
import UserComments from './UserComments';

function Navigation(props) {
    const {
        visible,
        handleSetVisible,
        product,
        handleSetActiveProductDetail,
        comments_users,
    } = props;
    const [userCommentsArray, setUserCommentsArray] = useState([]);
    const [display, setDisplay] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const userComments = [];

    const handleShowDescriptionProduct = () => {
        setDisplay(!display);
    };

    const handleFilterPropertyValues = () => {
        const defaultTitle = [];
        const descTitle = [];
        if (product) {
            var resultInputConfig = Object.keys(product).map((key) => [
                key,
                product[key],
            ]);

            resultInputConfig.forEach((item) => {
                if (
                    item[0] !== 'id' &&
                    item[0] !== 'description' &&
                    item[0] !== 'detail' &&
                    item[0] !== 'varation' &&
                    item[0] !== 'shop' &&
                    item[0] !== 'image'
                ) {
                    defaultTitle.push(item);
                } else if (item[0] === 'description') {
                    descTitle.push(
                        Object.keys(item[1]).map((key) => [key, item[1][key]]),
                    );
                }
            });
            return { defaultTitle: defaultTitle, descTitle: descTitle };
        }
    };

    const onClose = () => {
        handleSetVisible(false);
        handleSetActiveProductDetail();
    };

    const handleSetProduct = (index) => {
        setActiveImage(index);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const value = handleFilterPropertyValues();

    useEffect(() => {
        if (comments_users) {
            if (product) {
                comments_users.forEach((item) => {
                    if (item.id_product === product.id) {
                        userComments.push(item);
                    }
                });
            }
        }
        setUserCommentsArray(userComments);
    }, [comments_users, product]);

    return (
        <>
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                className="drawer-info-product"
            >
                <div className="drawer-product-dashboard">
                    <div className="row" style={{ paddingTop: 5 }}>
                        <div className="product-switching">
                            {product &&
                                product.varation.map((item, index) => (
                                    <div
                                        className={`product-image-item ${
                                            activeImage === index
                                                ? 'active'
                                                : ''
                                        }`}
                                        key={item.id}
                                        onClick={() => handleSetProduct(index)}
                                    >
                                        <img
                                            alt={item.title}
                                            src={item.image}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="slider-img">
                            <Slider {...settings}>
                                {product
                                    ? product.image[activeImage].image.map(
                                          (item, index) => (
                                              <div
                                                  className="image-products"
                                                  key={index}
                                              >
                                                  <img
                                                      alt={item.id}
                                                      src={item.data}
                                                  />
                                              </div>
                                          ),
                                      )
                                    : ''}
                            </Slider>
                        </div>
                        <div className="row">
                            <Divider orientation="center">
                                Thông Tin Sản Phẩm
                            </Divider>
                            <List
                                header={<div>Thông Tin</div>}
                                footer={<div>Kết Thúc</div>}
                                bordered
                                dataSource={value && value.defaultTitle}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text mark>
                                            [ {item[0]} ]
                                        </Typography.Text>{' '}
                                        {item[0] === 'logo' ? (
                                            <img
                                                alt=""
                                                src={item[1]}
                                                style={{
                                                    width: '10%',
                                                    marginLeft: '10px',
                                                }}
                                            />
                                        ) : (
                                            item[1]
                                        )}
                                    </List.Item>
                                )}
                            />
                            <Divider orientation="center">Mô tả</Divider>
                            <List
                                header={<div>Thông Tin</div>}
                                footer={<div>Kết Thúc</div>}
                                bordered
                                dataSource={value && value.descTitle[0]}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text mark>
                                            [ {item[0]} ]
                                        </Typography.Text>
                                        {item[1]}
                                    </List.Item>
                                )}
                            />
                        </div>
                        <div className="row">
                            <Divider orientation="center">
                                Thông Tin Chi Tiết
                            </Divider>
                            <div
                                className="product-desc-info"
                                style={{
                                    marginTop: '50px',
                                    height: display ? 'auto' : 230,
                                    overflow: 'hidden',
                                    transition: '0.5s ease-in-out',
                                    position: 'relative',
                                    paddingLeft: '50px',
                                }}
                            >
                                <h1>MÔ TẢ SẢN PHẨM</h1>
                                {product ? parse(product.detail) : ''}
                                <div
                                    className="opacity"
                                    style={{
                                        position: 'absolute',
                                        height: 150,
                                        width: '100%',
                                        top: '44%',
                                        background:
                                            'linear-gradient(rgb(255 255 255 / 0%), rgb(255, 255, 255)) rgb(255 255 255 / 31%)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-end',
                                        visibility: display ? 'hidden' : '',
                                    }}
                                ></div>
                            </div>
                            <Button
                                type="link"
                                onClick={handleShowDescriptionProduct}
                                style={{ marginTop: 30, marginLeft: '45%' }}
                            >
                                {display ? 'Thu Gọn' : 'Xem Thêm'}
                            </Button>
                        </div>
                        <div className="row">
                            <Divider orientation="center">
                                Bình Luận Từ Người Mua
                            </Divider>
                            <div className="user-comments">
                                {userCommentsArray &&
                                userCommentsArray.length ? (
                                    userCommentsArray.map((item) => (
                                        <UserComments
                                            comment={item}
                                            key={item.key}
                                        />
                                    ))
                                ) : (
                                    <Empty />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
}

Navigation.propTypes = {};

export default Navigation;
