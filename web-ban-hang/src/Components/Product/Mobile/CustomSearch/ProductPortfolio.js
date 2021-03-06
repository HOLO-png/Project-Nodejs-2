import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Row,
    List,
    Button,
    Rate,
    InputNumber,
    Checkbox,
    Radio,
    Tabs,
} from 'antd';
import ModalAdress from '../ModalAdress';
import { useDispatch } from 'react-redux';
import {
    changeRateStar,
    handleSetIsLoad,
    onChangePriceProduct,
} from '../../../../Store/Reducer/searchProductCategory';
import {
    categoryApi,
    handleSetLoadingCategory,
    handleSetProducts,
    useGetProductsToPriceMutation,
    useGetProductsToStarMutation,
    useGetProductsToTrademarkQuery,
} from '../../../../Store/Reducer/categoryReducer';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

function ProductPortfolio(props) {
    const dispatch = useDispatch();
    const [activeButton, setactiveButton] = useState(0);
    const [activeSearch, setactiveSearch] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [priceBelow, setPriceBelow] = useState(0);
    const [priceHight, setPriceHight] = useState(0);
    const [isSetAddress, setIsSetAddress] = useState(false);

    const {
        data1,
        data2,
        data3,
        data4,
        data5,
        data10,
        changeProductSmartPhone,
        changeProductCommonPhone,
        changeAllProduct,
        changeProductLandline,
        trademark,
        keyword,
        category,
    } = props;

    const [trademarkData, setTrademarkData] = useState({
        trademarkName: '',
        category: '',
        numPage: 1,
    });
    const [getProductsToStar, { error }] = useGetProductsToStarMutation();
    const history = useHistory();
    const [getProductsToPrice, { error2 }] = useGetProductsToPriceMutation();

    const { error3, isLoading, data } = useGetProductsToTrademarkQuery(
        trademarkData,
        {
            skip:
                trademarkData.trademarkName === '' &&
                trademarkData.category === '',
        },
    );

    useEffect(() => {
        if (data) {
            dispatch(handleSetProducts(data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (error || error2 || error3) {
            toast.error(`Fail ????`);
        }
    }, [error, error2, error3]);

    function onChangeCheckBox(e, item, index) {
        history.push(`?page=${1}`);
        const numPage = history.location.search.slice(6) || 1;
        dispatch(handleSetLoadingCategory(true));
        setactiveSearch(index);
        setTrademarkData({ trademarkName: item, category, numPage });
    }

    function onChange(e) {}

    function onChangePriceBelow(value) {
        setPriceBelow(value);
    }

    function onChangePriceHight(value) {
        setPriceHight(value);
    }

    const ChangePriceButtonInput = (x, y) => {
        if (category) {
            dispatch(handleSetLoadingCategory(true));
            getProductsToPrice({
                price: {
                    minPrice: x,
                    maxPrice: y,
                },
                keyword,
                category,
            });
        } else {
            dispatch(handleSetIsLoad(true));
            dispatch(
                onChangePriceProduct({
                    price: {
                        minPrice: x,
                        maxPrice: y,
                    },
                    keyword,
                }),
            );
        }
    };

    const changeStatusButton = (item, index) => {
        if (data1.length === 4) {
            switch (item) {
                case data1[0]:
                    setactiveButton(index);
                    changeAllProduct();
                    break;
                case data1[1]:
                    changeProductSmartPhone();
                    setactiveButton(index);
                    break;
                case data1[2]:
                    changeProductCommonPhone();
                    setactiveButton(index);
                    break;
                case data1[3]:
                    changeProductLandline();
                    setactiveButton(index);
                    break;
                default:
                    break;
            }
        } else {
            switch (item) {
                case data1[0]:
                    setactiveButton(index);
                    changeAllProduct();
                    break;
                case data1[1]:
                    changeProductCommonPhone();
                    setactiveButton(index);
                    break;
                case data1[2]:
                    changeProductLandline();
                    setactiveButton(index);
                    break;
                default:
                    break;
            }
        }
    };

    const changeEvaluate = (title, index) => {
        if (category) {
            if (keyword) {
                switch (title) {
                    case 'T??? 5 sao':
                        dispatch(handleSetLoadingCategory(true));
                        getProductsToStar({ star: 5, keyword, category });
                        break;
                    case 'T??? 4 sao':
                        dispatch(handleSetLoadingCategory(true));
                        getProductsToStar({ star: 4, keyword, category });
                        break;
                    case 'D?????i 3 sao':
                        dispatch(handleSetLoadingCategory(true));
                        getProductsToStar({ star: 3, keyword, category });
                        break;
                    default:
                        break;
                }
            }
        } else {
            if (keyword) {
                switch (title) {
                    case 'T??? 5 sao':
                        dispatch(handleSetIsLoad(true));
                        dispatch(
                            changeRateStar({ star: 5, keyword, category }),
                        );
                        break;
                    case 'T??? 4 sao':
                        dispatch(handleSetIsLoad(true));
                        dispatch(
                            changeRateStar({ star: 4, keyword, category }),
                        );
                        break;
                    case 'D?????i 3 sao':
                        dispatch(handleSetIsLoad(true));
                        dispatch(
                            changeRateStar({ star: 3, keyword, category }),
                        );
                        break;
                    default:
                        break;
                }
            }
        }
    };

    const changePriceButton = (item, index) => {
        if (category) {
            if (keyword) {
                switch (item.title) {
                    case 'D?????i 500.000':
                        dispatch(handleSetLoadingCategory(true));
                        getProductsToPrice({
                            price: item.price,
                            keyword,
                            category,
                        });

                        break;
                    case 'T??? 500.000 ?????n 5.000.000':
                        dispatch(handleSetLoadingCategory(true));
                        getProductsToPrice({
                            price: item.price,
                            keyword,
                            category,
                        });
                        break;
                    case 'T??? 5.000.000 ?????n 22.500.000':
                        dispatch(handleSetLoadingCategory(true));
                        getProductsToPrice({
                            price: item.price,
                            keyword,
                            category,
                        });
                        break;
                    case 'Tr??n 22.500.000':
                        dispatch(handleSetLoadingCategory(true));
                        getProductsToPrice({
                            price: item.price,
                            keyword,
                            category,
                        });
                        break;
                    default:
                        break;
                }
            }
        } else {
            if (keyword) {
                switch (item.title) {
                    case 'D?????i 500.000':
                        dispatch(handleSetIsLoad(true));
                        dispatch(
                            onChangePriceProduct({
                                price: item.price,
                                keyword,
                            }),
                        );
                        break;
                    case 'T??? 500.000 ?????n 5.000.000':
                        dispatch(handleSetIsLoad(true));
                        dispatch(
                            onChangePriceProduct({
                                price: item.price,
                                keyword,
                            }),
                        );
                        break;
                    case 'T??? 5.000.000 ?????n 22.500.000':
                        dispatch(handleSetIsLoad(true));
                        dispatch(
                            onChangePriceProduct({
                                price: item.price,
                                keyword,
                            }),
                        );
                        break;
                    case 'Tr??n 22.500.000':
                        dispatch(handleSetIsLoad(true));
                        dispatch(
                            onChangePriceProduct({
                                price: item.price,
                                keyword,
                            }),
                        );
                        break;
                    default:
                        break;
                }
            }
        }
    };
    // Add Adress

    const onChangeRadio = (e) => {
        setIsSetAddress(!e.target.value);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 3000);
    };

    const handleCancel = () => {
        setVisible(false);
        setIsSetAddress(false);
    };

    const ChangePriceReset = (x, y) => {
        setPriceBelow(x);
        setPriceHight(y);
        // ChangePriceButtonInput(x, y);
        console.log(x, y);
    };
    return (
        <Col
            className="gutter-row product-optional"
            span={5}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                borderRight: '1px solid #eee',
            }}
        >
            <List
                size="small"
                header={<div>DANH M???C S???N PH???M</div>}
                bordered
                dataSource={data1}
                renderItem={(item, index) => (
                    <List.Item>
                        <Button
                            type="text"
                            onClick={() => changeStatusButton(item, index)}
                            disabled={index === activeButton ? true : false}
                        >
                            {item}
                        </Button>
                    </List.Item>
                )}
            />
            <List
                size="small"
                header={<div>?????A CH??? NH???N H??NG</div>}
                bordered
                className="mobile-address"
                dataSource={data2}
                renderItem={(item) => (
                    <List.Item>
                        {item}
                        <Button type="link" onClick={showModal}>
                            NH???P ?????A CH???
                        </Button>
                    </List.Item>
                )}
            />
            <ModalAdress
                visible={visible}
                loading={loading}
                handleCancel={handleCancel}
                handleOk={handleOk}
                onChangeRadio={onChangeRadio}
                isSetAddress={isSetAddress}
            />
            <List
                size="small"
                header={<div>D???CH V???</div>}
                bordered
                className="mobile-service"
                dataSource={data3}
                renderItem={(item) => (
                    <List.Item>
                        <Checkbox onChange={onChange}>{item}</Checkbox>
                    </List.Item>
                )}
            />
            <List
                size="small"
                header={<div>????NH GI??</div>}
                bordered
                className="mobile-evaluate"
                dataSource={data4}
                renderItem={(item, index) => (
                    <List.Item
                        onClick={() => changeEvaluate(item.title, index)}
                    >
                        <Rate disabled defaultValue={item.rate} />
                        <p>{item.title}</p>
                    </List.Item>
                )}
            />
            <List
                size="small"
                header={<div>GI??</div>}
                bordered
                className="mobile-price"
                dataSource={data5}
                renderItem={(item, index) => (
                    <List.Item>
                        <Button
                            type="dashed"
                            onClick={() => changePriceButton(item, index)}
                        >
                            {item.title}
                        </Button>
                    </List.Item>
                )}
            />
            <div className="mobile-price-clause">
                <p>Ch???n Kho???ng Gi??</p>
                <InputNumber
                    style={{
                        width: 150,
                    }}
                    defaultValue="0"
                    min="0"
                    max="100000000"
                    onChange={onChangePriceBelow}
                    stringMode
                    value={priceBelow}
                />
                ~
                <InputNumber
                    style={{
                        width: 150,
                    }}
                    defaultValue="100000"
                    min="100000"
                    max="1000000000"
                    onChange={onChangePriceHight}
                    stringMode
                    value={priceHight}
                />
                <Button
                    onClick={() =>
                        ChangePriceButtonInput(priceBelow, priceHight)
                    }
                >
                    ??p D???ng
                </Button>
                <Button onClick={() => ChangePriceReset(0, 0)}>?????t L???i</Button>
            </div>

            {keyword === 'all' ? (
                <List
                    size="small"
                    header={<div>TH????NG HI???U</div>}
                    bordered
                    className="mobile-ROM"
                    dataSource={trademark !== null ? trademark : []}
                    renderItem={(item, index) => (
                        <List.Item>
                            <Checkbox
                                onChange={(e) =>
                                    onChangeCheckBox(e, item._id, index)
                                }
                                checked={index === activeSearch ? true : false}
                            >
                                {item._id}
                            </Checkbox>
                        </List.Item>
                    )}
                />
            ) : (
                ''
            )}

            <List
                size="small"
                header={<div>GIAO H??NG</div>}
                bordered
                className="mobile-delivery"
                dataSource={data10}
                renderItem={(item) => (
                    <List.Item>
                        <Radio>{item}</Radio>
                    </List.Item>
                )}
            />
        </Col>
    );
}

ProductPortfolio.propTypes = {};

export default ProductPortfolio;
