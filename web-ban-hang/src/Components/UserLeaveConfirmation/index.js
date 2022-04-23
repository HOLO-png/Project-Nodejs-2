import ReactDOM from 'react-dom';
import React from 'react';
import { Modal } from 'antd';

function UserLeaveConfirmation(message, callback, confirmOpen, setConfirmOpen) {
    const container = document.createElement('div');

    container.setAttribute('custom-confirm-view', '');

    const handleConfirm = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);
        callback(callbackState);
        setConfirmOpen(false);
    };

    const handleCancel = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);
        callback();
        setConfirmOpen(false);
    };

    document.body.appendChild(container);

    ReactDOM.render(
        <Modal
            title="Bạn Chưa Lưu Lại"
            visible={confirmOpen}
            onOk={handleConfirm}
            onCancel={handleCancel}
        >
            <p>{message}</p>
        </Modal>,
        container,
    );
}

export default UserLeaveConfirmation;
