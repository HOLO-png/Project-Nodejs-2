/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

function DashboardOrder(props) {
    return (
        <div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
            <div className="row">
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <em className="fa fa-home" />
                        </a>
                    </li>
                    <li className="active">Order</li>
                </ol>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Order</h1>
                </div>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default articles">
                        <div className="panel-heading">
                            Danh Sách Đơn Đặt Hàng
                            <ul className="pull-right panel-settings panel-button-tab-right">
                                <li className="dropdown">
                                    <a
                                        className="pull-right dropdown-toggle"
                                        data-toggle="dropdown"
                                        href="#"
                                    >
                                        <i class="far fa-clipboard-user"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <ul className="dropdown-settings">
                                                <li>
                                                    <a>
                                                        <i class="fad fa-user-tag"></i>{' '}
                                                        Xem Thông Tin (Chỉ 1
                                                        người)
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i class="fad fa-user-minus"></i>{' '}
                                                        Xoá Ra Khỏi Danh Sách
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i class="fad fa-user-lock"></i>{' '}
                                                        Chặn Người Này
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i class="fad fa-user-cog"></i>{' '}
                                                        Sửa Thông Tin (Chỉ 1
                                                        Người)
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <span className="pull-right clickable panel-toggle panel-button-tab-left">
                                <i class="fad fa-user-plus"></i>
                            </span>
                        </div>
                        <div className="panel-body articles-container">
                            {/* <OrderItem />    */}
                        </div>
                    </div>
                </div>
            </div>
            <OrderItem />
            <OrderItem />
        </div>
    );
}

DashboardOrder.propTypes = {};

export default DashboardOrder;
