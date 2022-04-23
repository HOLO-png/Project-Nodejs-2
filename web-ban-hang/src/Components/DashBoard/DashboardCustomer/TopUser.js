/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

function TopUser(props) {
    return (
        <div className="col-lg-6">
            <div class="panel panel-default ">
                <div class="panel-heading">
                    Top User
                    <ul class="pull-right panel-settings panel-button-tab-right">
                        <li class="dropdown">
                            <a
                                class="pull-right dropdown-toggle"
                                data-toggle="dropdown"
                                href="#"
                            >
                                <em class="fa fa-cogs"></em>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <ul class="dropdown-settings">
                                        <li>
                                            <a href="#">
                                                <em class="fa fa-cog"></em>{' '}
                                                Settings 1
                                            </a>
                                        </li>
                                        <li class="divider"></li>
                                        <li>
                                            <a href="#">
                                                <em class="fa fa-cog"></em>{' '}
                                                Settings 2
                                            </a>
                                        </li>
                                        <li class="divider"></li>
                                        <li>
                                            <a href="#">
                                                <em class="fa fa-cog"></em>{' '}
                                                Settings 3
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <span class="pull-right clickable panel-toggle panel-button-tab-left">
                        <em class="fa fa-toggle-up"></em>
                    </span>
                </div>
                <div class="panel-body">
                    <div class="col-md-12 no-padding">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Top</th>
                                    <th>Hình Ảnh</th>
                                    <th>Tên</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Uy Tín</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {handleRenderUITableItem} */}
                                <tr className="active-row">
                                    <td>1</td>
                                    <td className="user-image">
                                        <img
                                            alt=""
                                            src="https://anhdepblog.com/wp-content/uploads/2020/09/hinh-girl-xinh-de-thuong-10.jpg"
                                            style={{ width: 70 }}
                                        />
                                    </td>
                                    <td>Trần Thị Mai Anh</td>
                                    <td>0332142432</td>
                                    <td>100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

TopUser.propTypes = {};

export default TopUser;
