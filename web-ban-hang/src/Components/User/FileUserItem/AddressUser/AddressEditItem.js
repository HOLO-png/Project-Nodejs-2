import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelecteValue from '../../../Pay/DeliveryAddress/ModalAddress/SelecteValue';
import { Form, Input, Button, Modal } from 'antd';
import { isEmptyObject } from '../../../../utils/checkEmptyObj';

function AddressEditItem(props) {
    const { address_api, item, importAddressUserItem } = props;
    const [modal, setModal] = useState(false);
    const [nameUser, setNameUser] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [objAddress, setObjAddress] = useState({});
    const [dataAddress, setDataAddress] = useState({});

    const [addressInfoSelect, setAddressInfoSelect] = useState({});

    useEffect(() => {
        if (Object.values(item).length !== 0) {
            const result = {
                tinh: item.address.tinh,
                quan: item.address.quan,
                xa: item.address.xa,
                mota: item.address.mota,
            };
            setAddressInfoSelect(result);
        }
    }, [item]);

    useEffect(() => {
        const addressUserObj = {
            username: nameUser,
            phoneNumber: numberPhone,
            address: item.address,
        };
        setDataAddress(addressUserObj);
    }, [item.address, nameUser, numberPhone]);

    const handleImportAddressUser = () => {
        setTimeout(() => {
            const isNullish = Object.values(objAddress).some((value) => {
                if (!value) {
                    return true;
                }
                return false;
            });

            const newUserAddress = {
                username: nameUser || item.username,
                phoneNumber: numberPhone || item.phoneNumber,
                address: isNullish ? item.address : objAddress,
                status: item.status,
            };
            importAddressUserItem({ newUserAddress, userAddressId: item._id });
        }, 500);
        setNameUser('');
        setNumberPhone('');
        setModal(false);
    };

    const setModal1Visible = (modal1Visible) => {
        setModal(modal1Visible);
        setNameUser(item.username);
        setNumberPhone('');
        setObjAddress({
            tinh: item.address.tinh,
            quan: item.address.quan,
            xa: item.address.xa,
            mota: item.address.mota,
        });
    };
    useEffect(() => {
        setNameUser(item.username);
        setNumberPhone(item.phoneNumber);
    }, [item.phoneNumber, item.username]);

    const onChangeName = (e) => {
        setNameUser(e.target.value);
    };

    const onChangeNumberPhone = (e) => {
        setNumberPhone(e.target.value);
    };

    const onHandleValueImportAddress = (obj) => {
        setObjAddress(obj);
    };

    return (
        <>
            <Button type="dashed" onClick={() => setModal1Visible(true)}>
                Sửa
            </Button>
            <Modal
                title="Địa chỉ mới"
                centered
                style={{ top: 20 }}
                visible={modal}
                onOk={() => handleImportAddressUser()}
                onCancel={() => setModal1Visible(false)}
                okButtonProps={{
                    disabled: isEmptyObject(dataAddress),
                }}
            >
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    layout="horizontal"
                    size="large"
                    // onValuesChange={onFormLayoutChange}
                >
                    <Form.Item
                        label="Họ và Tên"
                        style={{ margin: 0, fontSize: '16px' }}
                    >
                        <Input
                            placeholder="Họ và tên"
                            onChange={onChangeName}
                            value={nameUser}
                        />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" style={{ margin: 0 }}>
                        <Input
                            placeholder="Số điện thoại"
                            onChange={onChangeNumberPhone}
                            defaultValue={item.phoneNumber}
                        />
                    </Form.Item>
                    <Form.Item label="Địa Chỉ" style={{ margin: 0 }}>
                        <SelecteValue
                            active={1}
                            objAddress={addressInfoSelect}
                            address_api={address_api}
                            onHandleValueImportAddress={
                                onHandleValueImportAddress
                            }
                            widthInput="160px"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

AddressEditItem.propTypes = {};

export default memo(AddressEditItem);
