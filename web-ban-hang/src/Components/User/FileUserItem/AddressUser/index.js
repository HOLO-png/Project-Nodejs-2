import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Row, Col, Divider, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import SelecteValue from '../../../Pay/DeliveryAddress/ModalAddress/SelecteValue';
import {
    addressApiSelector,
    getAddressApi,
} from '../../../../Store/Reducer/apiAddress';

import AddressContentBox from './AddressContentBox';
import { isEmptyObjectAll } from '../../../../utils/checkEmptyObjAll';
import { authSelector } from '../../../../Store/Reducer/authReducer';
import {
    deleteUserAddress,
    getUserAddress,
    updateStatusUserAddress,
    userAddressSelector,
} from '../../../../Store/Reducer/userAddressReducer';
import { insertUserAddress } from '../../../../Store/Reducer/userAddressReducer';
import { updateUserAddress } from '../../../../Store/Reducer/userAddressReducer';
import { toast } from 'react-toastify';

const FileUserAddress = styled.div`
    display: flex;
    flex-direction: column;

    span.ant-divider-inner-text {
        font-size: 13px;
        color: #cbcbcb;
    }
    .address-content {
        max-height: 300px;
        overflow-y: auto;
    }
    .address-title {
        height: 85px;
    box-shadow: 2px 2px 10px 0px #ececec;
    padding: 20px;
    }
}
`;

const FileUserTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p.file-user-address-title {
        font-size: 20px;
        margin: 0;
    }
    .ant-modal-header {
        font-size: 22px;
    }
`;

function AddressUser(props) {
    const dispatch = useDispatch();
    const address_api = useSelector(addressApiSelector);
    const auth = useSelector(authSelector);
    const userAddress = useSelector(userAddressSelector);
    const [modal, setModal] = useState(false);
    const [nameUser, setNameUser] = useState('');
    const [dataAddress, setDataAddress] = useState({});
    const [numberPhone, setNumberPhone] = useState('');
    const [objAddress, setObjAddress] = useState({
        tinh: '',
        quan: '',
        xa: '',
        mota: '',
    });

    useEffect(() => {
        dispatch(getAddressApi());
        dispatch(getUserAddress({ token: auth.tokenAuth }));
    }, [auth.tokenAuth, dispatch]);

    const onChangeName = (e) => {
        setNameUser(e.target.value);
    };

    const onChangeNumberPhone = (e) => {
        setNumberPhone(e.target.value);
    };

    const handleSetDefaultToAddress = (obj) => {
        if (auth.tokenAuth && obj._id) {
            dispatch(
                updateStatusUserAddress({
                    tokenAuth: auth.tokenAuth,
                    userAddressId: obj._id,
                }),
            );
        }
    };

    const setModal1Visible = (modal1Visible) => {
        setModal(modal1Visible);
        setNumberPhone('');
        setNameUser('');
    };

    const onHandleValueImportAddress = (obj) => {
        setObjAddress(obj);
    };

    useEffect(() => {
        if (auth) {
            const newUserAddress = {
                username: nameUser,
                phoneNumber: numberPhone,
                address: objAddress,
                status: false,
                tokenAuth: auth.tokenAuth,
            };
            setDataAddress(newUserAddress);
        }
    }, [auth, nameUser, numberPhone, objAddress]);

    const handleImportAddressUser = () => {
        console.log(dataAddress);
        const isCheck = Object.values(dataAddress.address).some((value) => {
            if (!value) {
                return true;
            }
            return false;
        });
        setTimeout(() => {
            if (!isCheck) {
                dispatch(insertUserAddress(dataAddress));
                console.log(dataAddress);
            } else {
                toast.warning('Invalid User Address Data!');
            }
        }, 500);
        setNameUser('');
        setNumberPhone('');
        setObjAddress({
            tinh: '',
            quan: '',
            xa: '',
            mota: '',
        });
        setModal(false);
    };

    const confirm = (obj) => {
        if (auth.tokenAuth) {
            setTimeout(() => {
                dispatch(
                    deleteUserAddress({
                        tokenAuth: auth.tokenAuth,
                        userAddressId: obj._id,
                    }),
                );
            }, 500);
        }
    };

    const importAddressUserItem = ({ newUserAddress, userAddressId }) => {
        if (auth.tokenAuth) {
            dispatch(
                updateUserAddress({
                    data: { ...newUserAddress, tokenAuth: auth.tokenAuth },
                    userAddressId,
                }),
            );
        }
    };

    return (
        <FileUserAddress>
            <div className="address-title">
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{ marginBottom: '20px' }}
                >
                    <Col
                        className="gutter-row"
                        span={24}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                        }}
                    >
                        <FileUserTitle>
                            <p className="file-user-address-title">
                                Địa chỉ người dùng
                            </p>
                            <Button
                                type="primary"
                                size="large"
                                icon={<PlusOutlined />}
                                onClick={() => setModal1Visible(true)}
                            >
                                Thêm Địa Chỉ Mới
                            </Button>
                            <Modal
                                title="Địa chỉ mới"
                                centered
                                style={{ top: 20 }}
                                visible={modal}
                                onOk={() => handleImportAddressUser()}
                                okButtonProps={{
                                    disabled: isEmptyObjectAll(dataAddress),
                                }}
                                onCancel={() => setModal1Visible(false)}
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
                                    <Form.Item
                                        label="Số điện thoại"
                                        style={{ margin: 0 }}
                                    >
                                        <Input
                                            placeholder="Số điện thoại"
                                            onChange={onChangeNumberPhone}
                                            value={numberPhone}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Địa Chỉ"
                                        style={{ margin: 0 }}
                                    >
                                        <SelecteValue
                                            active={1}
                                            objAddress={objAddress}
                                            address_api={address_api}
                                            onHandleValueImportAddress={
                                                onHandleValueImportAddress
                                            }
                                            widthInput="160px"
                                        />
                                    </Form.Item>

                                    <Form.Item label="Loại Địa Chỉ">
                                        <Button
                                            type="dashed"
                                            style={{ margin: '10px 10px' }}
                                            disabled
                                        >
                                            Nhà Riêng
                                        </Button>
                                        <Button type="dashed" disabled>
                                            Văn Phòng
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </FileUserTitle>
                    </Col>
                </Row>
                <Divider
                    orientation="left"
                    style={{ transform: 'translateY(-30px)' }}
                >
                    Address User
                </Divider>
            </div>
            <div className="address-content">
                {userAddress ? (
                    userAddress.items.length ? (
                        userAddress.items.map((item, index) => {
                            if (Object.keys(item).length) {
                                return (
                                    <AddressContentBox
                                        item={item}
                                        key={item.id}
                                        index={index}
                                        confirm={confirm}
                                        handleSetDefaultToAddress={
                                            handleSetDefaultToAddress
                                        }
                                        address_api={address_api}
                                        id_user={item.id_user}
                                        importAddressUserItem={
                                            importAddressUserItem
                                        }
                                    />
                                );
                            }
                        })
                    ) : (
                        <Empty />
                    )
                ) : (
                    <Empty />
                )}
            </div>
        </FileUserAddress>
    );
}

AddressUser.propTypes = {};

export default AddressUser;
