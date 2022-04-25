import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox, Col, Input, Modal, Radio, Row, Button } from 'antd';
import SelecteValue from './SelecteValue';
import InfoAddress from './InfoAddress';
import SaveAddress from './SaveAddress';
import InputInfo from './InputInfo';

const ModalStyle = styled.div``;
function ModalAddress(props) {
    const {
        visible,
        handleOk,
        confirmLoading,
        handleCancel,
        address_api,
        onHandleValueImportAddress,
        handleImportImput,
        objAddress,
        inputName,
        inputNumber,
        handleChangeInputName,
        handleChangeInputNumber,
        onChangeCheckbox,
        address_user_api,
        userAddress,
        setUserAddressDefault,
        userAddressDefault,
    } = props;
    const [value, setValue] = useState(1);

    const onChangeRadio = (e) => {
        setValue(e.target.value);
    };

    return (
        <ModalStyle>
            <Modal
                title="Địa Chỉ Mới"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div className="info-user">
                    <i className="far fa-user"></i>
                    <p className="">Thông Tin Khách Hàng</p>
                </div>

                <InputInfo
                    handleImportImput={handleImportImput}
                    inputName={inputName}
                    inputNumber={inputNumber}
                    handleChangeInputName={handleChangeInputName}
                    handleChangeInputNumber={handleChangeInputNumber}
                />

                <div className="info-address">
                    <i className="far fa-map-marker-alt"></i>
                    <p className="">
                        Vui lòng điền thông tin bên dưới hoặc chọn địa chỉ đã
                        lưu
                    </p>
                </div>

                <Radio.Group
                    onChange={onChangeRadio}
                    value={value}
                    style={{ marginBottom: '20px' }}
                >
                    <Radio value={1}>Chọn Địa Chỉ</Radio>
                    <Radio value={2}>Định Vị</Radio>
                    <Radio value={3}>Địa Chỉ Giao Hàng Đã Lưu</Radio>
                </Radio.Group>

                {objAddress && (
                    <SelecteValue
                        active={value}
                        objAddress={objAddress}
                        address_api={address_api}
                        onHandleValueImportAddress={onHandleValueImportAddress}
                        widthInput="220px"
                    />
                )}
                <InfoAddress active={value} />
                <SaveAddress
                    active={value}
                    userAddress={userAddress}
                    setUserAddressDefault={setUserAddressDefault}
                    userAddressDefault={userAddressDefault}
                />

                {address_user_api && !address_user_api._id ? (
                    <Checkbox
                        onChange={onChangeCheckbox}
                        style={{ marginTop: 20 }}
                    >
                        Đặt làm địa chỉ mặc định
                    </Checkbox>
                ) : (
                    ''
                )}
            </Modal>
        </ModalStyle>
    );
}

ModalAddress.propTypes = {};

export default ModalAddress;
