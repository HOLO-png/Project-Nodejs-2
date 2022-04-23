import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import BasicMap from '../../../BasicMap';

function InfoAddress(props) {
    const { active } = props;
    return (
        <div
            className="address-value"
            style={{ display: active !== 2 ? 'none' : 'block' }}
        >
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                className="delivery-address__row"
            >
                <Col
                    className="gutter-row delivery-address__col--des"
                    span={24}
                >
                    <BasicMap />
                </Col>
            </Row>
        </div>
    );
}

InfoAddress.propTypes = {};

export default InfoAddress;
