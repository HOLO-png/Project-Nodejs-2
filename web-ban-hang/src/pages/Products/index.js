import React, { useCallback, useEffect, useState } from 'react';
import Helmet from '../../Components/Helmet';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Col, message, Row } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProductApi,
    handleUpdateProduct,
    productItemSelector,
} from '../../Store/Reducer/product';
import ImgProduct from '../../Components/ProductItem/ImgProduct';
import SelectPay from '../../Components/ProductItem/SelectPay';
import Shop from '../../Components/ProductItem/Shop';
import ProductsCommans from '../../Components/ProductItem/ProductsCommans';
import {
    handleProduct,
    imgImportSelector,
} from '../../Store/Reducer/handleImgPrd';
import {
    commentsUserSelector,
    getCommentsUserApi,
    insertCmt,
} from '../../Store/Reducer/comments_user';
import { handleProductStatus } from '../../Store/Reducer/current_product';
import { authSelector } from '../../Store/Reducer/authReducer';
import {
    loadingSelector,
    setLoadingAction,
} from '../../Store/Reducer/loadingReducer';
import {
    cartSelector,
    handleAddProductToCart,
} from '../../Store/Reducer/cartReducer';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { humanImg } from '../../assets/fake-data/human';
import { useGetAllProductsQuery } from '../../Store/Reducer/productsReducer';

// import { AuthContext } from '../../Context/AuthProvider';

const ProductsItem = styled.div`
    transform: translateY(20px);
    .slick-slide {
        width: 105px;
    }
    .ant-col {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .slick-arrow {
        color: #000;
        width: 27px;
        height: 45px;
        margin: 0 -7px;
        background: #33333333;
        border-radius: 2px;
    }
    img {
        cursor: pointer;
    }
    .product-interactive {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .product-share {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 150px;
            p {
                margin: 0 10px;
                font-size: 17px;
            }
            span {
                margin-right: 7px;
            }
        }
        .product-like {
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                font-size: 26px;
                color: red;
                cursor: pointer;
            }
            .product-cmt {
                margin: 0 5px;
                font-size: 17px;
            }
        }
    }
    .slick-slide.slick-active {
        width: 100px !important;
        img {
            cursor: pointer;
            border: 1px solid #c6c6c6;
            padding: 5px;
        }
    }
    .ant-row {
        width: 100%;
        align-items: flex-start;
    }
    .ant-col.ant-col-14.gutter-row {
        padding-top: 50px;
        width: 100%;
        .ant-row {
            span.ant-tag.ant-tag-has-color {
                height: 22px;
                margin-top: 8px;
            }
            p.product-name {
                margin: 0;
                font-size: 24px;
            }
        }
        .ant-col.ant-col-6.gutter-row {
            display: contents;
            width: 100%;
            p {
                margin: 10px 10px;
            }
        }
        .ant-row {
            font-size: 17px;
        }
        p.product-star {
            color: #dfdf16;
            font-weight: 600;
        }
        .ant-row.product-price {
            width: 100%;
            height: 70px;
            background: #faf9f9;
            display: flex;
            align-items: center;
            p.product-text {
                margin: 0 10px;
                color: #f80404;
                font-size: 35px;
            }
        }
    }
    .ant-col.ant-col-18.gutter-row {
        .product-move-title {
            display: flex;
            justify-content: flex-start;
            p {
                margin: 0 10px;
            }
            i {
                margin-top: 10px;
            }
        }
        .product-move-fee {
            display: flex;
        }
    }
    .product-info {
        width: 80%;
    }
    .ant-col.ant-col-18.gutter-row {
        display: block;
        margin-top: 10px;
        button.ant-btn {
            margin: 5px 10px;
        }
    }
    .buttons_added {
        margin-top: 10px;
        font-size: 20px;
        margin-left: 10px;
        .minus.is-form,
        .plus.is-form {
            width: 30px;
            height: 35px;
            background: #fff;
        }
        input.input-qty {
            width: 80px;
            height: 35px;
            font-size: 20px;
        }
    }
    .ant-row.product-add-cart {
        padding: 10px;
        button {
            width: 100%;
            height: 50px;
        }
    }
    p.product-move {
        color: #a2a2a2;
        width: 100%;
    }
    .ant-row.product-shop {
        width: 100%;
        display: flex;
        .ant-col.ant-col-10.gutter-row {
            display: contents;
            .product-shop-name {
                margin-left: 15px;
                font-size: 18px;
                p {
                    margin: 0;
                }
                p.product-work {
                    color: #aaa;
                    font-size: 15px;
                    margin-bottom: 10px;
                }
            }
        }
        .product-intro {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 17px;
            color: #bebebe;
            margin-top: 10px;
            p {
                color: #df0000;
                margin: 0 10px;
            }
        }
    }
    .product-img {
        width: 100%;
        height: 500px;
        margin-top: 50px;
    }
    .ant-image {
        width: 100%;
        height: 100%;
    }
    img.ant-image-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .select-product {
        display: contents !important;
        .ant-card.ant-card-bordered.ant-card-hoverable {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 93px;
        }
        .ant-card-body {
            height: 90px;
            width: 82px;
            padding: 0px 5px;
            background: #f8f8f8;
        }
        .ant-card-meta-title {
            white-space: normal !important;
        }
        .ant-card.ant-card-bordered.ant-card-hoverable.active {
            border: 2px solid #2d50fa;
            border-radius: 5px;
            .ant-card-body {
                background: #f0faff;
            }
        }
        svg {
            position: absolute;
            top: -18px;
            right: -81px;
            font-size: 17px;
            background: #dcdcff;
            border-radius: 50px;
        }
        img {
            cursor: pointer;
            margin-left: 1px;
            margin-top: 1px;
        }
        .ant-card-cover {
            width: 75px;
        }
    }
    .product-slide-item {
        img.active {
            border: 3px solid #d94600;
            border-radius: 3px;
        }
    }
    p.comment_author-name {
        font-size: 14px;
        color: #cdcdcd;
    }
    .ant-comment {
        .ant-comment-nested {
            .ant-image {
                margin-right: 10px;
            }
        }
    }
    p.product-text-old {
        margin: 0;
        padding: 20px 30px;
        font-size: 20px;
        color: #878787;
        font-weight: lighter;
    }
    .ant-card-meta {
        margin: -16px 0;
    }
    .ant-col.ant-col-18.gutter-row.product-accompanied {
        display: contents;
        .product-info {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            .ant-card-meta-detail > div:not(:last-child) {
                margin-bottom: 0;
            }
            p.product-price-accompanied {
                margin-left: 16px;
                color: #333;
                font-size: 20px;
            }
        }
        .ant-checkbox-wrapper {
            margin: 10px;
        }
    }
    .opacity {
        position: absolute;
        height: 150px;
        width: 100%;
        background: #ffffff3d;
        top: 39%;
        background-image: linear-gradient(#ffffff00, #ffffff);
    }
    .ant-skeleton-image {
        width: 100%;
        height: 500px;
    }
    .ant-skeleton.ant-skeleton-element {
        width: 100%;
    }
    .ant-comment-content-detail {
        font-size: 16px;
        color: #646464;
    }
    .ant-card-meta-title {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        flex: 1;
    }
    button.react-share__ShareButton {
        transform: scale(0.5);
    }
`;

export default function Products() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, category } = useParams();
    const productStore = useSelector(productItemSelector);
    const loading = useSelector(loadingSelector);
    const productObj = useSelector(imgImportSelector);
    const user = useSelector(authSelector);
    const comments_user = useSelector(commentsUserSelector);
    const cart = useSelector(cartSelector);
    const [productObjChange, setProductObjChange] = useState(null);
    const [amout, setAmout] = useState(1);

    const { product, totalCmt } = productStore;

    const handleNumAmount = (num) => {
        setAmout(num);
    };

    const { data } = useGetAllProductsQuery({ pageNum: 1, limitNum: 5 });

    useEffect(() => {
        if (product) {
            if (product.description) {
                Object.keys(productObj).length !== 0 &&
                    setProductObjChange({
                        ...productObj,
                        trademark: product.description.trademark,
                        category: product.category,
                        capacity: product.description,
                    });
            }
        }
    }, [productObj, product]);

    useEffect(() => {
        dispatch(setLoadingAction(true));
        dispatch(getProductApi({ id }));
        dispatch(getCommentsUserApi(id));
        setTimeout(() => {
            dispatch(setLoadingAction(false));
        }, 500);
    }, [dispatch, id, category]);

    useEffect(() => {
        if (product) {
            const productCount = {
                _id: product._id,
                count: 0,
                name: product.name,
                image: product.image && product.image[0].image,
                price: product.price,
                priceOld: product.priceOld,
                capacity: product.capacity,
            };
            dispatch(handleProduct(productCount));
            dispatch(handleProductStatus(productCount));
        }
    }, [dispatch, product]);

    const handleImportProduct = useCallback(
        (product) => {
            dispatch(handleProduct(product));
            dispatch(handleProductStatus(product));
        },
        [dispatch],
    );

    const handleInSertCmt = (obj) => {
        const newComment = {
            ...obj,
            user: {
                ...obj.user,
                profilePicture: obj.user.profilePicture
                    ? obj.user.profilePicture
                    : humanImg,
            },
            likes: [],
            createdAt: new Date().toISOString(),
            productId: product._id,
        };

        if (product) {
            const newProduct = {
                ...product,
                comments: [newComment, ...product.comments],
            };
            dispatch(handleUpdateProduct(newProduct));
        }
        dispatch(insertCmt({ auth: user, newComment, dispatch, product }));
    };

    const handleProductToCart = (obj) => {
        if (user.user && user.tokenAuth) {
            dispatch(handleAddProductToCart({ cart, obj, amout, user }));
        } else {
            toast.warning('Bạn cần phải đăng nhập để sử dụng dịch vụ này');
            history.push('/buyer/signin');
        }
    };

    const messageToCart = (status) => {
        if (status) {
            message.success({
                content: 'Sản phẩm đã được thêm vào giỏ hàng !',
                className: 'custom-class',
                style: {
                    marginTop: '0vh',
                },
            });
        } else {
            message.warning({
                content: 'Sản Phẩm đã có trong giỏ hàng!',
                className: 'custom-class',
                style: {
                    marginTop: '0vh',
                },
            });
        }
    };

    const handleProductToBuy = (obj) => {
        messageToCart(true);
    };

    return (
        <Helmet title={product?.name}>
            <ProductsItem>
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                        background: '#fff',
                        boxShadow: '0 0 2px 2px rgb(227 227 227)',
                    }}
                >
                    <Col className="gutter-row" span={10}>
                        <ImgProduct
                            productImg={product?.image && product?.image}
                            imageArr={productObj.image && productObj.image}
                            loading={loading}
                            likes={product?.likes}
                            auth={user}
                            productId={product._id}
                            product={product}
                        />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={14}
                        style={{ paddingBottom: '20px' }}
                    >
                        <SelectPay
                            product={product}
                            handleImportProduct={handleImportProduct}
                            productObj={productObj}
                            handleProductToCart={handleProductToCart}
                            handleNumAmount={handleNumAmount}
                            handleProductToBuy={handleProductToBuy}
                            loading={loading}
                            comments_user={comments_user}
                            user={user.user}
                            productObjChange={productObjChange}
                            totalCmt={totalCmt}
                        />
                    </Col>
                </Row>
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    className="product-shop"
                    style={{
                        padding: '10px',
                        background: '#fff',
                        boxShadow: '0 0 2px 2px rgb(227 227 227)',
                        marginTop: '20px',
                    }}
                >
                    <Shop product={product} loading={loading} />
                </Row>
            </ProductsItem>
            <ProductsCommans
                product={product}
                products_api={data}
                commentsUser={comments_user}
                handleInSertCmt={handleInSertCmt}
                user={user.user}
                tokenAuth={user.tokenAuth}
            />
        </Helmet>
    );
}
