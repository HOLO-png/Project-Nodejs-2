import React, { useState } from 'react';
import TableProduct from './TableProduct';
import CompleteSearch from './SearchProduct';
import CategorySelect from './CategorySelect';
import { Button, Collapse, Input } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const genExtra = () => (
    <SettingOutlined
        onClick={(event) => {
            event.stopPropagation();
        }}
    />
);

function callback(key) {}

function ProductDescriptionList(props) {
    const {
        products,
        productsPerPage,
        totalProduct,
        paginate,
        isShowCategoryOptions,
        handleRemoveProductItem,
        comments_users,
        handleEditProduct,
        setVisible,
        visible,
        product,
        setProduct,
        active,
        setActive,
        handleOnNavigation,
        handleSearchInputToProduct,
        search_products,
    } = props;
    const [productsSearch, setProductsSearch] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const handleImportProductToTablet = (product) => {
        setProductsSearch([product]);
        setIsActive(false);
    };

    return (
        <div className="panel-body">
            <Collapse onChange={callback} expandIconPosition="right">
                <Panel header="Tìm Kiếm Sản Phẩm" key="1" extra={genExtra()}>
                    <div>
                        <div className="row">
                            <div className="col-lg-5">
                                <p className="" style={{ margin: '27px 0' }}>
                                    Nhập Giá Trị Cần Tìm :
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <CompleteSearch
                                    handleSearchInputToProduct={
                                        handleSearchInputToProduct
                                    }
                                    search_products={search_products}
                                    handleImportProductToTablet={
                                        handleImportProductToTablet
                                    }
                                    isActive={isActive}
                                    setIsActive={setIsActive}
                                />
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
            <div className="row">
                <div className="col-lg-12 panel-heading">
                    Sản Phẩm Trong Kho
                </div>
                <div className="col-lg-12">
                    <TableProduct
                        products={products}
                        productsPerPage={productsPerPage}
                        totalProduct={totalProduct}
                        paginate={paginate}
                        isShowCategoryOptions={isShowCategoryOptions}
                        handleRemoveProductItem={handleRemoveProductItem}
                        comments_users={comments_users}
                        handleEditProduct={handleEditProduct}
                        setVisible={setVisible}
                        visible={visible}
                        product={product}
                        setProduct={setProduct}
                        active={active}
                        setActive={setActive}
                        handleOnNavigation={handleOnNavigation}
                        productsSearch={productsSearch}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductDescriptionList;
