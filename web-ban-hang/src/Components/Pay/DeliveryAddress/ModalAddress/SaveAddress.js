import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function SaveAddress(props) {
    const { active } = props;
    return (
        <div
            className="save-address"
            style={{ display: active !== 3 ? 'none' : 'block' }}
        >
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
