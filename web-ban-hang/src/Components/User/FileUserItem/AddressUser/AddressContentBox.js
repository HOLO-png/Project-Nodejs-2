import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Tag, Popconfirm } from 'antd';
import styled from 'styled-components';
import AddressEditItem from './AddressEditItem';

const FileUserInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    p {
        margin-left: 10px;
        margin-bottom: 0;
        font-size: larger;
        color: #333;
    }
    label {
        color: #878787;
    }
    span.ant-tag.ant-tag-green {
        padding: 3px 15px;
        font-size: 15px;
        margin-left: 10px;
    }
    .ant-form-item-control-input-content {
        display: flex;
    }
`;

const AddressContentBoxStyle = styled.div`
    .address-content-box {
        width: 100%;
        height: 200px;
        padding: 0 30px;
        margin-top: 10px;
        .border {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            transition: 0.5s ease;
            .address-content-box-left {
                width: 70%;
            }

            .address-content-box-right {
                width: 30%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &:hover {
                box-shadow: 0px 0px 7px 1px #ececec;
                transform: translateY(-5px);
            }
        }
        .capacity-address {
            font-size: 20px;
            color: #a8a8a8;
        }
    }
`;

function AddressContentBox(props) {
    const {
        item,
        index,
        confirm,
        handleSetDefaultToAddress,
        address_api,
        importAddressUserItem,
    } = props;

    return (
        <AddressContentBoxStyle>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <div className="address-content-box">
                    <div className="border">
                        <FileUserInfo className="address-content-box-left">
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
                                    label="T??n ????ng Nh???p"
                                    style={{
                                        margin: 0,
                                        display: 'flex',
                                    }}
                                >
                                    <p className="user-name">{item.username}</p>
                                    {item.status ? (
                                        <Tag color="green">M???c ?????nh</Tag>
                                    ) : (
                                        ''
                                    )}
                                </Form.Item>

                                <Form.Item
                                    label="S??? ??i???n Tho???i"
                                    style={{ margin: 0 }}
                                >
                                    <p className="user-name">
                                        (+84) {item.phoneNumber}
                                    </p>
                                </Form.Item>
                                <Form.Item label="?????a Ch???">
                                    <p className="user-name">
                                        {item.address.mota} ~{' '}
                                        {item.address.xa.WardName} ~{' '}
                                        {item.address.quan.DistrictName} ~{' '}
                                        {item.address.tinh.ProvinceName}
                                    </p>
                                </Form.Item>
                            </Form>
                        </FileUserInfo>
                        <FileUserInfo className="address-content-box-right">
                            <div className="btn-group">
                                <AddressEditItem
                                    address_api={address_api}
                                    id_user={item.id_user}
                                    importAddressUserItem={
                                        importAddressUserItem
                                    }
                                    item={item}
                                />
                                <Popconfirm
                                    title="B???n c?? ch???c mu???n x??a ?????a ch??? n??y"
                                    onConfirm={() => confirm(item)}
                                    onVisibleChange={() =>
                                        console.log('visible change')
                                    }
                                >
                                    <Button
                                        type="dashed"
                                        danger
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Xo??
                                    </Button>
                                </Popconfirm>
                            </div>
                            <Button
                                type=""
                                success
                                style={{ marginTop: '10px' }}
                                onClick={() => handleSetDefaultToAddress(item)}
                                disabled={item.status}
                            >
                                ?????t l??m M???c ?????nh
                            </Button>
                        </FileUserInfo>
                        <div className="capacity-address">{index + 1}</div>
                    </div>
                </div>
            </Row>
        </AddressContentBoxStyle>
    );
}

AddressContentBox.propTypes = {};

export default AddressContentBox;
