import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, Tag } from 'antd';

function ChangePhoneNumber(props) {
    const { phoneNumber, onChangePhoneNumber } = props;
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    return (
        <Form.Item label="Số Điện thoại" type="number">
            <Button type="link" onClick={showModal}>
                Thêm
            </Button>
            <Modal
                title=" Số Điện Thoại"
                visible={visible}
                onOk={hideModal}
                onCancel={hideModal}
            >
                <Form.Item label="Nhập Số Điện Thoại">
                    <Input onChange={onChangePhoneNumber} type="number" />
                </Form.Item>

                <Form.Item label="Số Hiện Tại">
                    <span className="user__phone-number-content">
                        {phoneNumber
                            ? '(84+ )' + phoneNumber
                            : 'Bạn chưa có số nào cả!'}
                    </span>
                    <Tag color="green" style={{ marginLeft: 10 }}>
                        Gốc
                    </Tag>
                </Form.Item>
            </Modal>
        </Form.Item>
    );
}

ChangePhoneNumber.propTypes = {};

export default ChangePhoneNumber;
