import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import numberWithCommas from '../../../../utils/numberWithCommas';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProducts } from '../../../../utils/randomProduct';

const ProductsTopItem = styled.div`
    .ant-card-cover {
        width: 180px;
        display: flex;
        justify-content: center;
        transform: translateX(30px);
        padding: 10px;
        img {
            width: 100%;
        }
    }
`;

function ProductsTop(props) {
    const { products_api } = props;

    const name_url = (name) => name.replace(/ /g, '-');

    console.log(products_api);

    const renderProductsTop = () =>
        products_api
            ? getProducts(
                  6,
                  products_api.products && products_api.products,
              ).map((item, i) => (
                  <Link
                      to={`/product/${item.category}/${name_url(item.name)}/${
                          item._id
                      }`}
                      key={i}
                  >
                      <Card
                          hoverable
                          style={{ width: 247 }}
                          cover={
                              <img alt="example" src={item.varation[0].image} />
                          }
                      >
                          <Meta
                              title={item.name}
                              description={numberWithCommas(item.price) + ' đ'}
                          />
                      </Card>
                  </Link>
              ))
            : '';
    return (
        <ProductsTopItem>
            <div className="product-max-saler">Top Sản Phẩm Bán Chạy</div>
            {renderProductsTop()}
        </ProductsTopItem>
    );
}

ProductsTop.propTypes = {};

export default ProductsTop;
