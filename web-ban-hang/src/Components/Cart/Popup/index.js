import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal/Modal';
import { CloseSquareOutlined } from '@ant-design/icons';
import styled from 'styled-components';

function Popup(props) {
    const {
        modal,
        setModalVisibleAlear,
        currentProduct,
        setModalVisibleCancel,
    } = props;

    return (
        <Modal
            title={`Bạn chắc chắn muốn ${currentProduct.length} bỏ sản phẩm này ?`}
            centered
            icon={<CloseSquareOutlined />}
            visible={modal}
            onOk={() => setModalVisibleAlear()}
            onCancel={() => setModalVisibleCancel()}
            className="popup-product-cart"
        >
            {currentProduct.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </Modal>
    );
}

Popup.propTypes = {};

export default Popup;
