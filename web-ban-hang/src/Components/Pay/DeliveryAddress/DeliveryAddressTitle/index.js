import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

function DeliveryAddressTitle(props) {
    const { valueAddress } = props;

    return (
        <>
            <Col className="gutter-row delivery-address__col--des" span={10}>
                <p className="delivery-address__name-user">
                    {valueAddress && valueAddress.name_user} (+84)
                    {valueAddress && valueAddress.number_phone}
                </p>
            </Col>
            <Col className="gutter-row delivery-address__col--des" span={10}>
                <p className="delivery-address__address-user">
                    {valueAddress && valueAddress.mota},
                    {valueAddress && valueAddress.xa},
                    {valueAddress && valueAddress.quan},
                    {valueAddress && valueAddress.tinh}
                </p>
            </Col>
        </>
    );
}

DeliveryAddressTitle.propTypes = {};

export default DeliveryAddressTitle;
