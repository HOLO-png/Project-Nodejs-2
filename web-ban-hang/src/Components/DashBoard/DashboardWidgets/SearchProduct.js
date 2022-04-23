import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Input, AutoComplete } from 'antd';
import numberWithCommas from '../../../utils/numberWithCommas';

export default function CompleteSearch(props) {
    const {
        handleSearchInputToProduct,
        search_products,
        handleImportProductToTablet,
        setIsActive,
        isActive,
    } = props;

    const [inputSearch, setInputSearch] = useState('');

    const handleChangeInputSearch = (e) => {
        const value = e.target.value;
        setInputSearch(value.trim());
        value.trim() ? setIsActive(true) : setIsActive(false);
        handleSearchInputToProduct(value.trim());
    };

    return (
        <div className="input-search-list-products" style={{ width: 400 }}>
            <Input.Search
                size="large"
                placeholder="search product ..."
                value={inputSearch}
                enterButton
                onChange={handleChangeInputSearch}
            />
            <div
                className={`input-search-list-products-table ${
                    isActive ? 'active' : ''
                }`}
            >
                {search_products.length
                    ? search_products.map((item, index) => (
                          <div
                              className="input-search-list-products-table-item"
                              key={index}
                              onClick={() => handleImportProductToTablet(item)}
                          >
                              <div className="search-image-product">
                                  <img
                                      src={item.varation[0].image || ''}
                                      alt={item.name}
                                  />
                              </div>
                              <div className="search-content">
                                  <div className="search-name-product">
                                      <span>{item.name}</span>
                                  </div>
                                  <div className="search-price">
                                      {numberWithCommas(item.price)}
                                      <sup> đ</sup>
                                  </div>
                              </div>
                          </div>
                      ))
                    : ''}
            </div>
        </div>
    );
}
