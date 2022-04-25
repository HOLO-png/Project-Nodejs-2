import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio } from 'antd';
import { Link } from 'react-router-dom';

function SaveAddress({
    userAddress,
    active,
    setUserAddressDefault,
    userAddressDefault,
}) {
    const onChangeCheckbox = (e) => {
        console.log(e.target.value);

        setUserAddressDefault(e.target.value);
    };

    useEffect(() => {
        if (userAddress) {
            userAddress.items.forEach((item) => {
                if (item.status) {
                    setUserAddressDefault(item._id.toString());
                }
            });
        }
    }, [setUserAddressDefault, userAddress]);

    useEffect(() => {
        return () => {
            if (userAddress) {
                console.log('ok');

                userAddress.items.forEach((item) => {
                    if (item.status) {
                        setUserAddressDefault(item._id.toString());
                    }
                });
            }
        };
    }, [userAddress, active, setUserAddressDefault]);

    return (
        <div
            className="save-address"
            style={{ display: active !== 3 ? 'none' : 'block' }}
        >
            <div className="save-address__items">
                {userAddress &&
                    userAddress.items.map((item) => {
                        return (
                            <div className="save-address__item">
                                <div className="save-address__content">
                                    <Radio.Group
                                        onChange={onChangeCheckbox}
                                        value={userAddressDefault}
                                    >
                                        <Radio value={item._id.toString()}>
                                            {' '}
                                            [ {item.username} - (+84){' '}
                                            {item.phoneNumber} ]{' '}
                                            {item.address.mota} -{' '}
                                            {item.address.xa} -{' '}
                                            {item.address.quan} -{' '}
                                            {item.address.tinh}
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <Link to="/user/address">
                <Button type="dashed" size="large">
                    Sửa Lại Địa Chỉ Người Dùng
                </Button>
            </Link>
        </div>
    );
}

SaveAddress.propTypes = {};

export default SaveAddress;
