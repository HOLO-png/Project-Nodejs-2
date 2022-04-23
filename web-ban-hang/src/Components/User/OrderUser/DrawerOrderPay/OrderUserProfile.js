import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

function OrderUserProfile(props) {
    const { photoURL, dataOrder } = props;
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="order__user-profile">
                    <span>Thông tin người mua hàng</span>
                    <div className="order__user-status">
                        <div className={dataOrder.status.title}>
                            <span className="title-status">
                                {dataOrder.status.title}
                            </span>
                            <i className={`fad ${dataOrder.status.icon}`}></i>
                        </div>
                    </div>
                </div>
                <div className="order__user">
                    <div className="order__user-title">
                        <div className="order__user-avatar">
                            <Avatar alt="" src={photoURL} size="large" />
                        </div>
                        <div className="order__user-name">
                            <span>{dataOrder.name_user}</span>
                        </div>
                    </div>
                    <div className="order__user-phone">
                        <span className="order__user-phone-title">
                            Số Điện Thoại:
                        </span>
                        <span className="order__user-phone-text">
                            {dataOrder.number_phone}
                        </span>
                    </div>
                    <div className="order__user-address">
                        <span className="order__user-address-title">
                            Địa Chỉ:
                        </span>
                        <span className="order__user-address-text">
                            {dataOrder.mota}, {dataOrder.quan}, {dataOrder.xa},{' '}
                            {dataOrder.tinh}
                        </span>
                    </div>
                    <div className="order__user-date-time">
                        <span className="order__user-date-time-title">
                            Thời gian:
                        </span>
                        <span className="order__user-date-time-text">
                            {dataOrder.dateTime}
                        </span>
                    </div>
                    <div className="order__user-message">
                        <span className="order__user-message-title">
                            Lời nhắn:
                        </span>
                        <span className="order__user-message-text">
                            {dataOrder.message || 'Không có lời nhắn'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

OrderUserProfile.propTypes = {};

export default OrderUserProfile;
