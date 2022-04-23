import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import numberWithCommas from '../../utils/numberWithCommas';
import { Badge, Rate, Tag } from 'antd';
import { handleChangeProductPrice } from '../../utils/handlePrice';
import { entries } from 'lodash';

function ProductCart(props) {
    const {
        id,
        name,
        price,
        status,
        star,
        category,
        image,
        priceOld,
        height,
        img_width,
        right,
        sold,
    } = props;


    const imgRef = useRef();
    var name_url = name.replace(/[^\w\s]/gi, '');

    useEffect(() => {
        const img = imgRef.current;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                img.setAttribute('src', image && image[0].image[0].data);
                img.classList.add('active');
            }
        });

        if (img) observer.observe(img);
        return () => {
            if (img) observer.unobserve(img);
        };
    }, [image]);

    return (
        <Badge.Ribbon
            text="Hot"
            color="red"
            style={{
                right: right,
                display:
                    handleChangeProductPrice(priceOld, price) >= 30
                        ? 'block'
                        : 'none',
            }}
        >
            <div className="product-cart" style={{ height: height + 'px' }}>
                <Link to={`/product/${category}/${name_url}/${id}`}>
                    <div className="product-cart__image">
                        <img
                            alt={name}
                            style={{ width: img_width }}
                            ref={imgRef}
                        />
                    </div>
                    <h3 className="product-cart__name">{name}</h3>
                    <div className="product-cart-evaluate">
                        <Rate
                            disabled
                            value={star ? +star : 0}
                            style={{ marginTop: '12px' }}
                        />
                        <p className="product-cart-sold">đã bán {sold}</p>
                    </div>
                    <div className="product-cart__price">
                        {numberWithCommas(price)} <sup> đ</sup>
                        {handleChangeProductPrice(priceOld, price) ? (
                            <Tag color="#ff4c4c">
                                -{' '}
                                {priceOld && price
                                    ? handleChangeProductPrice(priceOld, price)
                                    : ''}
                                %
                            </Tag>
                        ) : (
                            ''
                        )}
                        {+priceOld ? (
                            <div className="product-cart__price-old">
                                <del>{numberWithCommas(priceOld)} đ</del>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </Link>
            </div>
        </Badge.Ribbon>
    );
}

ProductCart.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.array.isRequired,
};

export default ProductCart;
