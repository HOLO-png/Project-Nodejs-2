import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

function DeliveryAddressTitle(props) {
    const { userAddressValue } = props;

    return (
        <>
            <Col className="gutter-row delivery-address__col--des" span={10}>
                <p className="delivery-address__name-user">
                    {userAddressValue && userAddressValue.username} ~ (+84)
                    {userAddressValue && userAddressValue.phoneNumber}
                </p>
            </Col>
            <Col className="gutter-row delivery-address__col--des" span={10}>
                <p className="delivery-address__address-user">
                    {userAddressValue && userAddressValue.address.mota} -{' '}
                    {userAddressValue && userAddressValue.address.xa} -{' '}
                    {userAddressValue && userAddressValue.address.quan} -{' '}
                    {userAddressValue && userAddressValue.address.tinh}
                </p>
            </Col>
        </>
    );
}

DeliveryAddressTitle.propTypes = {};

export default DeliveryAddressTitle;
