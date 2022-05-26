import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import numberWithCommas from '../../../../utils/numberWithCommas';

function TableOrder({ orders, confirm, handleShowNavigation }) {
    const [activeTd, setActiveTd] = useState(null);

    const timeCreatedAtOrder = (dataOrder) => {
        const d = new Date(dataOrder.createdAt);
        return d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString();
    };

    const someHandler = (i, item) => {
        setActiveTd(i);
    };

    return (
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Phí giao hàng</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">hành động</th>
                </tr>
            </thead>
            <tbody>
                {orders &&
                    orders.map((order, index) => (
                        <tr
                            key={order.id}
                            onMouseEnter={() => someHandler(index, order)}
                        >
                            <th scope="row">
                                {order._id}{' '}
                                <p className={order.complete}>
                                    {order.complete}
                                </p>
                            </th>
                            <td className="table-img">
                                {timeCreatedAtOrder(order)}
                            </td>
                            <td>{order.username}</td>
                            <td>{numberWithCommas(order.paymentFee)} đ</td>
                            <td>{order.phoneNumber}</td>
                            <td>
                                {numberWithCommas(
                                    order.products.reduce(
                                        (accumulator, item) => {
                                            return (
                                                accumulator +
                                                Number(item.price) * item.qty
                                            );
                                        },
                                        0,
                                    ) + order.paymentFee,
                                )}
                                đ
                            </td>
                            {activeTd === index ? (
                                <td>
                                    <Button
                                        type="primary"
                                        icon={<SearchOutlined />}
                                        style={{ marginRight: 10 }}
                                        onClick={() =>
                                            handleShowNavigation(order)
                                        }
                                    >
                                        Xem
                                    </Button>
                                    {/* <Button
                                        type="dashed"
                                        icon={<EditOutlined />}
                                        style={{ marginRight: 10 }}
                                    >
                                        Sửa
                                    </Button>

                                    <Popconfirm
                                        title="Bạn có chắc muốn xóa người dùng này ?"
                                        onConfirm={() => confirm(item)}
                                        onVisibleChange={() =>
                                            console.log('visible change')
                                        }
                                    >
                                        <Button
                                            type="dashed"
                                            danger
                                            ghost
                                            icon={<DeleteOutlined />}
                                        >
                                            Xóa
                                        </Button>
                                    </Popconfirm> */}
                                </td>
                            ) : (
                                ''
                            )}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

TableOrder.propTypes = {};

export default TableOrder;
