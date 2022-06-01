import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Select } from 'antd';
import { useDispatch } from 'react-redux';
import {
    getDistrictApi,
    getProvinceApi,
    getWardApi,
} from '../../../../Store/Reducer/apiAddress';
import { toast } from 'react-toastify';
const { Option } = Select;

function SelecteValue(props) {
    const {
        active,
        address_api,
        onHandleValueImportAddress,
        widthInput,
        objAddress,
    } = props;
    const { dataProvince, dataWard, dataDistrict } = address_api;

    console.log(address_api);
    const dispatch = useDispatch();

    const [cities, setCities] = useState(null);

    const [secondCity, setSecondCity] = useState(null);

    const [thirCity, setThirCity] = useState(null);

    const [input, setInput] = useState('');

    useEffect(() => {
        return () => {
            setCities(null);
            setSecondCity(null);
            setThirCity(null);
        };
    }, []);

    useEffect(() => {
        onHandleValueImportAddress({
            tinh: cities,
            quan: secondCity,
            xa: thirCity,
            mota: input,
        });
    }, [cities, input, secondCity, thirCity]);

    const handleProvinceChange = (value) => {
        setCities(dataProvince[value]);
    };

    const onSecondCityChange = (value) => {
        setSecondCity(dataDistrict[value]);
    };

    const onThirCityChange = (value) => {
        setThirCity(dataWard[value]);
    };

    const handleChangeInput = (e) => {
        setInput(e.target.value);
    };

    const handleGetProvince = () => {
        dispatch(getProvinceApi());
    };

    const handleGetDistrict = () => {
        if (cities) {
            dispatch(getDistrictApi({ provinceId: cities.ProvinceID }));
        } else {
            toast.warning('Hãy chọn tỉnh/thành phố trước!');
        }
    };

    const handleGetWard = () => {
        if (secondCity) {
            dispatch(getWardApi({ districtID: secondCity.DistrictID }));
        } else {
            toast.warning('Hãy chọn phường/xã trước!');
        }
    };
    console.log(objAddress);

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
                                ? cities.ProvinceName
                                : objAddress.tinh !== null
                                ? objAddress.tinh.ProvinceName
                                : 'Tỉnh / Thành Phố'
                        }
                        onClick={handleGetProvince}
                        onChange={handleProvinceChange}
                    >
                        {dataProvince.map((province, index) => (
                            <Option key={index}>{province.ProvinceName}</Option>
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
                                ? secondCity.DistrictName
                                : objAddress.quan !== null
                                ? objAddress.quan.DistrictName
                                : 'Quận / Huyện'
                        }
                        onClick={handleGetDistrict}
                        onChange={onSecondCityChange}
                    >
                        {dataDistrict.map((district, index) => (
                            <Option key={index}>{district.DistrictName}</Option>
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
                                ? thirCity.WardName
                                : objAddress.xa !== null
                                ? objAddress.xa.WardName
                                : 'Phường / Xã'
                        }
                        onClick={handleGetWard}
                        onChange={onThirCityChange}
                    >
                        {dataWard.map((ward, index) => (
                            <Option key={index}>{ward.WardName}</Option>
                        ))}
                    </Select>
                </Col>
                <Col
                    className="gutter-row delivery-address__col--des"
                    span={12}
                >
                    <Input
                        placeholder="Số Nhà, Đường,..."
                        style={{ height: 40, width: widthInput }}
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
