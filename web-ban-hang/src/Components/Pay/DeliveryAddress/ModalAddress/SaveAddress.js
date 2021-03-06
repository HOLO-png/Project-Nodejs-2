import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio, Empty } from 'antd';
import { Link } from 'react-router-dom';

function SaveAddress({
    userAddress,
    active,
    setUserAddressDefault,
    userAddressDefault,
}) {
    const onChangeCheckbox = (e) => {
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
                {userAddress && userAddress.items.length ? (
                    userAddress.items.map((item, key) => {
                        return (
                            <div className="save-address__item" key={key}>
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
                                            {item.address.xa.WardName} -{' '}
                                            {item.address.quan.DistrictName} -{' '}
                                            {item.address.tinh.ProvinceName}
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <Empty />
                )}
            </div>
            <Link to="/user/address">
                <Button type="dashed" size="large">
                    S???a L???i ?????a Ch??? Ng?????i D??ng
                </Button>
            </Link>
        </div>
    );
}

SaveAddress.propTypes = {};

export default SaveAddress;
