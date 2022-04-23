import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import numberWithCommas from '../../../../utils/numberWithCommas';

function OrderProductItem(props) {
    const { item } = props;
    const [visibleImage, setVisibleImage] = useState(false);

    console.log(item);

    return (
        <div className="order__product-item">
            <div className="order__product-item-image">
                <Image
                    preview={{ visibleImage: false }}
                    width={60}
                    src={item.image.image[0].data}
                    onClick={() => setVisibleImage(true)}
                />
                <div style={{ display: 'none' }}>
                    <Image.PreviewGroup
                        preview={{
                            visibleImage,
                            onVisibleChange: (vis) => setVisibleImage(vis),
                        }}
                    >
                        {item.image.image.map((item, index) => (
                            <Image src={item} key={index} />
                        ))}
                    </Image.PreviewGroup>
                </div>
            </div>
            <div className="order__product-item-content">
                <div className="order__product-item-content-name">
                    <span>{item.name}</span>
                </div>
                <div className="order__product-item-content-capacity">
                    <span>{item.capacity}</span>
                </div>
            </div>
            <div className="order__product-item-content-amount">
                <span>X {item.amount}</span>
            </div>
            <div className="order__product-item-content-price">
                <span>
                    {numberWithCommas(item.price)}
                    <sup
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        đ
                    </sup>
                </span>
            </div>
        </div>
    );
}

OrderProductItem.propTypes = {};

export default OrderProductItem;
