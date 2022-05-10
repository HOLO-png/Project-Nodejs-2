import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Select } from 'antd';
const { Option } = Select;

function SelecteValue(props) {
    const {
        active,
        address_api,
        onHandleValueImportAddress,
        widthInput,
        objAddress,
    } = props;
    
    const [stateAddress, setStateAddress] = useState([]);
    const [cities, setCities] = useState('');

    const [stateSecond, setStateSecond] = useState([]);
    const [secondCity, setSecondCity] = useState('');

    const [stateThir, setStateThir] = useState([]);
    const [thirCity, setThirCity] = useState('');

    const [input, setInput] = useState('');

    useEffect(() => {
        address_api.length && setStateAddress(address_api);
    }, [address_api]);

    useEffect(() => {
        onHandleValueImportAddress({
            tinh: cities,
            quan: secondCity,
            xa: thirCity,
            mota: input,
        });
    }, [cities, input, secondCity, thirCity]);

    const handleProvinceChange = (value) => {
        setCities(stateAddress[value].name);
        setStateSecond(stateAddress[value].districts);
        setSecondCity(stateAddress[value].districts[0].name);
    };

    const onSecondCityChange = (value) => {
        setSecondCity(stateSecond[value].name);
        setStateThir(stateSecond[value].wards);
        setThirCity(stateSecond[value].wards[0].name);
    };

    const onThirCityChange = (value) => {
        setThirCity(stateThir[value].name);
    };

    const handleChangeInput = (e) => {
        setInput(e.target.value);
    };

    return (
        <div
            className="selection-value"
            style={{ display: active !== 1 ? 'none' : 'block' }}
        >
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                className="delivery-address__row"
                style={{ marginBottom: 20 }}
            >
                <Col
                    className="gutter-row delivery-address__col--des"
                    span={12}
                >
                    <Select
                        style={{ width: widthInput, height: 40 }}
                        value={
                            cities
                                ? cities
                                : objAddress.tinh !== ''
                                ? objAddress.tinh
                                : 'Tỉnh / Thành Phố'
                        }
                        onChange={handleProvinceChange}
                    >
                        {stateAddress.map((province, index) => (
                            <Option key={index}>{province.name}</Option>
                        ))}
                    </Select>
                </Col>
                <Col
                    className="gutter-row delivery-address__col--des"
                    span={12}
                >
                    <Select
                        style={{ width: widthInput, height: 40 }}
                        value={
                            secondCity
                                ? secondCity
                                : objAddress.quan !== ''
                                ? objAddress.quan
                                : 'Quận / Huyện'
                        }
                        onChange={onSecondCityChange}
                    >
                        {stateSecond.map((province, index) => (
                            <Option key={index}>{province.name}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                className="delivery-address__row"
            >
                <Col
                    className="gutter-row delivery-address__col--des"
                    span={12}
                >
                    <Select
                        style={{ width: widthInput, height: 40 }}
                        value={
                            thirCity
                                ? thirCity
                                : objAddress.xa !== ''
                                ? objAddress.xa
                                : 'Phường / Xã'
                        }
                        onChange={onThirCityChange}
                    >
                        {stateThir.map((province, index) => (
                            <Option key={index}>{province.name}</Option>
                        ))}
                    </Select>
                </Col>
                <Col
                    className="gutter-row delivery-address__col--des"
                    span={12}
                >
                    <Input
                        placeholder="Số Nhà, Đường,..."
                        style={{ height: 40 }}
                        onChange={handleChangeInput}
                        value={input ? input : objAddress.mota}
                    />
                </Col>
            </Row>
        </div>
    );
}

SelecteValue.propTypes = {};

export default SelecteValue;
