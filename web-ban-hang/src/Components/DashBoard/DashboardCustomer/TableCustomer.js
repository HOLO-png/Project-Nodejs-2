import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { humanImg } from '../../../assets/fake-data/human';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
function TableCustomer(props) {
    const { users, confirm } = props;
    const [activeTd, setActiveTd] = useState(null);
    const [user, setUser] = useState(null);

    const someHandler = (i, item) => {
        setActiveTd(i);
    };

    return (
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Uy Tín</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số Điện Thoại</th>
                    <th scope="col">Địa Chỉ</th>
                    <th scope="col">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                {users &&
                    users.map((item, index) => (
                        <tr
                            key={item.id}
                            onMouseEnter={() => someHandler(index, item)}
                        >
                            <th scope="row">{index + 1}</th>
                            <td className="table-img">
                                <img
                                    alt={item.displayName}
                                    src={item.photoURL || humanImg}
                                />
                            </td>
                            <td>{item.displayName}</td>
                            <td>100</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber || 'chưa có SĐT'}</td>
                            <td>
                                {item.address[0]
                                    ? item.address[0].mota +
                                      ', ' +
                                      item.address[0].quan +
                                      ', ' +
                                      item.address[0].xa +
                                      ', ' +
                                      item.address[0].tinh
                                    : 'Chưa có dữ liệu!'}
                            </td>
                            {activeTd === index ? (
                                <td>
                                    <Button
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
                                    </Popconfirm>
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

TableCustomer.propTypes = {};

export default TableCustomer;
