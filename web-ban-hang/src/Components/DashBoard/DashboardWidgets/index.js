/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import ProductOptions from './ProductOptions';
import ProductsDescription from './ProductsDescription';
import { useDispatch, useSelector } from 'react-redux';
import {
    getMobilesApi,
    handleInsertProductToMobile,
    handleRemoveMobileItemApi,
    handleUpdateMobileItemApi,
    mobilesSelector,
} from '../../../Store/Reducer/mobile_api';
import {
    getLaptopsApi,
    handleInsertProductToLaptop,
    handleRemoveLaptopItemApi,
    handleUpdateLaptopItemApi,
    laptopsSelector,
} from '../../../Store/Reducer/laptop_api';
import {
    getTabletsApi,
    handleInsertProductToTablet,
    handleRemoveTabletItemApi,
    handleUpdateTabletItemApi,
    tabletsSelector,
} from '../../../Store/Reducer/tablet_api';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from 'styled-components';
import { messageInfoToast } from '../../../utils/messageInfoToast';
import { isEmptyObjectAll } from '../../../utils/checkEmptyObjAll';
import {
    categoryProductsSelector,
    deleteCategoryProductAllApi,
    getCategoryProductsAllApi,
    insertCategory,
} from '../../../Store/Reducer/category_product_api';
import {
    deleteInputFieldApi,
    getInputField,
    InputFieldsSelector,
    insertInputField,
    updateInputField,
} from '../../../Store/Reducer/input_field';

import {
    deleteImageFieldApi,
    getImageField,
    ImageFieldsSelector,
    insertImageField,
} from '../../../Store/Reducer/config_input_image';
import {
    deleteSelectFieldApi,
    getSelectField,
    insertSelectField,
    SelectFieldsSelector,
    updateSelectField,
} from '../../../Store/Reducer/select_field';
import {
    handleCreateProductConfig,
    handleInsertDataToProductConfig,
    handleInsertProductConfig,
    handlePushImgProductConfig,
    handleResetProductConfigChange,
    handleUpdateProductConfigChange,
    productConfigSelector,
} from '../../../Store/Reducer/productConfig';
import { message } from 'antd';
import { useExitPrompt } from '../../../Hooks/useExitPrompt';
import { useParams } from 'react-router-dom';
import {
    commentsUserSelector,
    getCommentsAllApi,
} from '../../../Store/Reducer/comments_user';
import {
    handleSearchProductToDashboard,
    handleSearchSimilar,
    searchSimilarSelector,
} from '../../../Store/Reducer/searchSimilar';
// import { handleInsertProduct } from '../../../Store/Reducer/productsReducer';
import { setLoadingAction } from '../../../Store/Reducer/loadingReducer';
import {
    productsApi,
    usePostProductMutation,
} from '../../../Store/Reducer/productsReducer';
import { toast } from 'react-toastify';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    transition: display 0.5s ease;
`;

function DashboardWidgets({ url }) {
    const dispatch = useDispatch();
    const { keyProducts } = useParams();
    const paginateRef = useRef(null);
    const mobile_api = useSelector(mobilesSelector);
    const laptop_api = useSelector(laptopsSelector);
    const tablet_api = useSelector(tabletsSelector);
    const input_feild = useSelector(InputFieldsSelector);
    const category_products = useSelector(categoryProductsSelector);
    const select_field = useSelector(SelectFieldsSelector);
    const image_field = useSelector(ImageFieldsSelector);
    const product_config = useSelector(productConfigSelector);
    const comments_users = useSelector(commentsUserSelector);
    const search_products = useSelector(searchSimilarSelector);

    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

    const [products, setProducts] = useState(null);
    const [isShowCategory, setIsShowCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTabletProduct, setShowTabletProduct] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [image, setImage] = useState('');
    const [input, setInput] = useState('');
    const [timeActive, setTimeActive] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productVaratior, setProductVaratior] = useState({});
    const [indexProduct, setIndexProduct] = useState(
        product_config.varation.length - 1,
    );
    const [varation, setVaration] = useState({
        count: 0,
        title: '',
        image: '',
    });

    const [arrayData, setArrayData] = useState(null);
    const indexOfLastProducts = currentPage * productsPerPage;
    const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
    const currentProducts =
        products && products.slice(indexOfFirstProducts, indexOfLastProducts);
    const [isShowProductDes, setIsShowProductDes] = useState('list');
    const [isShowCategoryOptions, setIsShowCategoryOptions] = useState(true);
    const [isShow, setIsShow] = useState(false);
    const [categoryProducts, setCategoryProducts] = useState(null);

    const [addData, setVal] = useState('');
    const [description, setDescription] = useState({});
    const [inputConfig, setInputConfig] = useState({});
    const [logo, setLogo] = useState('');
    const [visible, setVisible] = useState(false);
    const [product, setProduct] = useState(null);
    const [active, setActive] = useState(null);
    // const [inputSearch, setInputSearch] = useState('')

    const [postProduct, { isLoading, data, error }] = usePostProductMutation();

    console.log(postProduct);

    useEffect(() => {
        if (error) {
            toast.error('Insert product failure');
        }
    }, [error]);

    useEffect(() => {
        dispatch(getMobilesApi());
        dispatch(getLaptopsApi());
        dispatch(getTabletsApi());
        dispatch(getCategoryProductsAllApi());
        dispatch(getInputField());
        dispatch(getImageField());
        dispatch(getSelectField());
        dispatch(getCommentsAllApi());
    }, [dispatch]);

    useEffect(() => {
        setArrayData([...mobile_api, ...laptop_api, ...tablet_api]);
    }, [laptop_api, mobile_api, tablet_api]);

    useEffect(() => {
        setLoading(true);
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = '';
        }, 600);
    }, [laptop_api, mobile_api, tablet_api]);

    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            if (!e.target.closest('#product-hunt')) {
                setTimeActive(null);
            }
        });
        return () => {
            window.removeEventListener('mousemove', null);
        };
    }, []);

    useEffect(() => {
        product_config.varation.length &&
            setIndexProduct(product_config.varation.length - 1);
    }, [product_config.varation.length]);

    useEffect(() => {
        keyProducts
            ? handleShowTableProduct(keyProducts)
            : handleShowTableProduct('Mobile');
        // eslint-disable-next-line no-use-before-define
    }, [keyProducts]);

    useEffect(() => {
        if (arrayData) {
            if (categoryProducts) {
                const result = arrayData.filter(
                    (item) => item.category === categoryProducts.toLowerCase(),
                );
                setProducts(result);
            }
        }
    }, [arrayData, categoryProducts]);

    const formHarlObject =
        Object.values(product_config.varation).filter(
            (item) => item && item !== '',
        )?.length > 0;

    const handleOnNavigation = (index, item) => {
        setVisible(true);
        setActive(index);
        setProduct(item);
    };

    useEffect(() => {
        setShowExitPrompt(formHarlObject);
    }, [formHarlObject, setShowExitPrompt]);

    const importImg = useCallback(
        (img) => {
            dispatch(insertImageField(img));
        },
        [dispatch],
    );

    const handleShowTableProduct = (item) => {
        setShowTabletProduct(true);
        setIsShowCategoryOptions(false);
        setCategoryProducts(item);
        setCurrentPage(1);
    };

    const paginate = (number) => {
        setCurrentPage(number);
        setTimeout(() => {
            window.scrollBy(0, -10);
        }, 500);
    };

    const handleShowCategorySetting = () => {
        setIsShowCategory(!isShowCategory);
    };

    const handleImportObjCategorySetting = (obj) => {
        setImage(obj.image);
        setInput(obj.title);
    };

    const handlePushValueCategory = () => {
        const isEmpty = isEmptyObjectAll({ image, title: input });
        if (!isEmpty) {
            dispatch(insertCategory({ image, title: input }));
            messageInfoToast(true, 'Đã tạo thành công danh mục sản phẩm!');
            setImage('');
            setInput('');
            setIsShowCategory(false);
        } else {
            messageInfoToast(false, 'Bạn chưa nhập đầy đủ dữ kiện');
        }
    };

    const someHandler = (i) => {
        setTimeActive(i);
    };

    const handleRemoveCategory = (obj) => {
        dispatch(deleteCategoryProductAllApi(obj));
    };

    const handleShowProductDesSetting = (info) => {
        if (!formHarlObject) {
            if (info === 'list') {
                setIsShowCategoryOptions(!isShowCategoryOptions);
            } else {
                setIsShowCategoryOptions(false);
            }
            setIsShowProductDes(info);
        }
    };

    const handleResetProductConfig = () => {
        dispatch(handleResetProductConfigChange());
        setIsShow(false);
        handleResetStateConfig();
        message.error('Bạn đã reset thành công');
    };

    const handleResetStateConfig = () => {
        setVal('');
        setDescription({});
        setInputConfig({});
        setLogo({});
    };

    const passingInputArray = (tags) => {
        dispatch(insertInputField(tags[tags.length - 1]));
    };

    const handleRemoveTagInput = (tagId) => {
        dispatch(deleteInputFieldApi(tagId));
    };

    const handleEditInputValue = (id, value) => {
        const newInputField = {
            _id: id,
            value,
        };
        dispatch(updateInputField(newInputField));
    };

    const handleRemoveImage = (item) => {
        dispatch(deleteImageFieldApi(item._id));
        item.value && URL.revokeObjectURL(item.value);
    };

    const handlePassingDataObj = (obj) => {
        const isEmptyObj = isEmptyObjectAll(obj);
        if (!isEmptyObj) {
            dispatch(insertSelectField(obj));
        } else {
            messageInfoToast(false, 'Bạn chưa nhập đầy đủ dữ kiện');
        }
    };

    const handleRemoveOption = (id) => {
        dispatch(deleteSelectFieldApi(id));
    };

    const handlePassingEditOptions = (obj) => {
        const result = obj.options.filter(function (el) {
            return el !== '';
        });
        dispatch(updateSelectField({ ...obj, options: result }));
    };

    useEffect(() => {
        handleInsertProductConfig(productVaratior);
    }, [productVaratior]);

    const handleCreateProductList = useCallback(() => {
        setIsModalVisible(true);
        setVaration({
            count: varation.count + 1,
            title: '',
            image: '',
        });
    }, [varation.count]);

    const handleOkProductConfig = useCallback(() => {
        setIsShow(true);
        setIsModalVisible(false);
        dispatch(
            handleCreateProductConfig({
                ...varation,
                count: varation.count + 1,
                image: varation.image,
            }),
        );
    }, [dispatch, varation]);

    const handleCancelProductConfig = () => {
        setIsModalVisible(false);
    };

    const handleImportImgPush = (img) => {
        dispatch(handlePushImgProductConfig(img));
    };

    const handleRemoveProductItem = (product) => {
        switch (product.category) {
            case 'mobile':
                dispatch(handleRemoveMobileItemApi(product));
                break;
            case 'laptop':
                dispatch(handleRemoveLaptopItemApi(product));
                break;
            case 'tablet':
                dispatch(handleRemoveTabletItemApi(product));
                break;
            // case 'orther':
            //     dispatch(handleRemoveOrtherItemApi(product));
            // break;
            default:
                break;
        }
        messageInfoToast(
            true,
            `Bạn đã xóa thành công sản phẩm ${product.name}`,
        );
    };

    const hanldeImportProductToDB = (data) => {
        const result = {
            ...productVaratior,
            ...inputConfig,
            category: description.category,
            description: description,
            detail: addData,
            logo: logo,
            varation: product_config.varation,
            image: product_config.image,
            shop: {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzeqIvRaVq68013nRoOCQAoezYI4nnpPDUG2eiVTbJ7egWB0zwqrhHR2FYnIykkwbEKg&usqp=CAU',
                address: '68 Lý Thường Kiệt - Tam Đảo - Đà Nẵng',
                name: 'Hoàng Long Shop',
                evaluate: 73000,
                response_rate: 35,
                response_time: 2,
                participation: 46,
                monitor: 1700,
            },
        };

        if (product_config.status === 'update') {
            switch (product_config.category) {
                case 'mobile':
                    dispatch(handleUpdateMobileItemApi(product_config));
                    break;
                case 'laptop':
                    dispatch(handleUpdateLaptopItemApi(product_config));
                    break;
                case 'tablet':
                    dispatch(handleUpdateTabletItemApi(product_config));
                    break;
                // case 'orther':
                //     dispatch(handleInsertProductToOrther(product_config));
                //     break;
                default:
                    break;
            }
            messageInfoToast(true, 'Sản phẩm đã được cập nhật thành công');
        } else {
            dispatch(setLoadingAction(true));
            postProduct(result);
            // dispatch(handleInsertProduct(result));
            dispatch(setLoadingAction(false));
        }

        handleResetProductConfig();
    };

    const handleSetImageField = (img) => {
        img && dispatch(handlePushImgProductConfig(img));
    };

    const handleEditProduct = (data) => {
        data &&
            dispatch(
                handleInsertDataToProductConfig({ ...data, status: 'update' }),
            );
    };

    useEffect(() => {
        if (product_config.status === 'update') {
            setIsShow(true);
        }
    }, [input, product_config.status]);

    const handleSetValueInputFieldUpdate = (e, key) => {
        dispatch(
            handleUpdateProductConfigChange({
                key: key,
                value: e.target.value,
            }),
        );
    };

    const handlePassingSelectProductConfig = (key, value) => {
        dispatch(
            handleUpdateProductConfigChange({
                key: key,
                value: value,
                des: 'description',
            }),
        );
    };

    const handleSearchInputToProduct = (value) => {
        if (value) {
            if (products) {
                dispatch(
                    handleSearchProductToDashboard({
                        dataSearch: products,
                        dataSearchToObj: { name: value },
                    }),
                );
            }
        }
    };

    return (
        <>
            {loading && (
                <div className="loading__container">
                    <ScaleLoader
                        color={'#2963B3'}
                        loading={loading}
                        css={override}
                        size={200}
                    />
                </div>
            )}
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>
                            <p>
                                <em className="fa fa-home" />
                            </p>
                        </li>
                        <li className="active">Widgets</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Widgets /{' '}
                            {keyProducts
                                ? keyProducts.charAt(0).toUpperCase() +
                                  keyProducts.slice(1)
                                : url
                                ? url
                                : ''}{' '}
                            {product_config.status ? product_config.status : ''}
                        </h1>
                    </div>
                </div>
                <div className="row">
                    {isShowCategoryOptions ? (
                        <ProductOptions
                            handleShowTableProduct={handleShowTableProduct}
                            handleShowCategorySetting={
                                handleShowCategorySetting
                            }
                            isShowCategory={isShowCategory}
                            handleImportObjCategorySetting={
                                handleImportObjCategorySetting
                            }
                            handlePushValueCategory={handlePushValueCategory}
                            category={category_products}
                            image={image}
                            input={input}
                            timeActive={timeActive}
                            someHandler={someHandler}
                            handleRemoveCategory={handleRemoveCategory}
                            arrayData={arrayData}
                        />
                    ) : (
                        ''
                    )}

                    <ProductsDescription
                        showTabletProduct={showTabletProduct}
                        products={currentProducts}
                        totalProduct={products}
                        productsPerPage={productsPerPage}
                        paginate={paginate}
                        ref={paginateRef}
                        handleShowProductDesSetting={
                            handleShowProductDesSetting
                        }
                        isShowProductDes={isShowProductDes}
                        isShowCategoryOptions={isShowCategoryOptions}
                        passingInputArray={passingInputArray}
                        input_feild={input_feild}
                        handleRemoveTagInput={handleRemoveTagInput}
                        importImg={importImg}
                        image_field={image_field}
                        handleEditInputValue={handleEditInputValue}
                        handleRemoveImage={handleRemoveImage}
                        handlePassingDataObj={handlePassingDataObj}
                        select_field={select_field}
                        handleRemoveOption={handleRemoveOption}
                        handlePassingEditOptions={handlePassingEditOptions}
                        handleCreateProductList={handleCreateProductList}
                        isShow={isShow}
                        handleOkProductConfig={handleOkProductConfig}
                        handleCancelProductConfig={handleCancelProductConfig}
                        isModalVisible={isModalVisible}
                        varation={varation}
                        setVaration={setVaration}
                        product_config={product_config}
                        setProductVaratior={setProductVaratior}
                        productVaratior={productVaratior}
                        handleImportImgPush={handleImportImgPush}
                        indexProduct={indexProduct}
                        setIndexProduct={setIndexProduct}
                        hanldeImportProductToDB={hanldeImportProductToDB}
                        formHarlObject={formHarlObject}
                        handleResetProductConfig={handleResetProductConfig}
                        setVal={setVal}
                        setDescription={setDescription}
                        setInputConfig={setInputConfig}
                        setLogo={setLogo}
                        addData={addData}
                        description={description}
                        inputConfig={inputConfig}
                        logo={logo}
                        handleRemoveProductItem={handleRemoveProductItem}
                        handleSetImageField={handleSetImageField}
                        comments_users={comments_users}
                        handleEditProduct={handleEditProduct}
                        handleSetValueInputFieldUpdate={
                            handleSetValueInputFieldUpdate
                        }
                        handlePassingSelectProductConfig={
                            handlePassingSelectProductConfig
                        }
                        setVisible={setVisible}
                        visible={visible}
                        product={product}
                        setProduct={setProduct}
                        active={active}
                        setActive={setActive}
                        handleOnNavigation={handleOnNavigation}
                        handleSearchInputToProduct={handleSearchInputToProduct}
                        search_products={search_products}
                    />
                </div>
            </div>
        </>
    );
}

DashboardWidgets.propTypes = {};

export default memo(DashboardWidgets);
