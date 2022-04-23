import React, { useEffect, useState } from 'react';
import { Drawer, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    DoubleRightOutlined,
    LaptopOutlined,
    MobileOutlined,
    TabletOutlined,
} from '@ant-design/icons';
import TableCategoryProducts from './TableCategoryProducts';
import { category_title_table } from '../../assets/fake-data';
import './style.scss';
import { useSelector } from 'react-redux';
import {
    menuSidebarSelector,
    useGetMenuCategoryQuery,
} from '../../Store/Reducer/menuReducer';

const SidebarLayout = styled.div`
    button.ant-btn {
        position: fixed;
        top: 20%;
        left: 0;
        z-index: 100;
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
    span.anticon.anticon-double-right {
        font-size: 15px;
    }
    .ant-drawer-content-wrapper {
        width: 300px;
    }
`;

const titleSidebar = <span>Menu Danh Mục Sản Phẩm</span>;
const titleLucky = <span>Bạn có 2 lượt quay</span>;
function Sidebar(props) {
    const [visible, setVisible] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [dataCategory, setDataCategory] = useState(null);
    const [active, setActive] = useState(null);
    const menu_api = useSelector(menuSidebarSelector);
    const [changeDataCategory, setChangeDataCategory] = useState(null);

    const { error, isLoading, data } = useGetMenuCategoryQuery();

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const someHandler = (item, index) => {
        setShowTable(true);
        setChangeDataCategory(item);
        setActive(index);
    };

    const handleShowCategoryProduct = (data, isShow) => {
        setDataCategory(data);
        setIsShow(isShow);
    };

    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            if (
                !e.target.closest('.table-category-product') &&
                !e.target.closest('#btn-show-table')
            ) {
                setShowTable(false);
                setActive(null);
            }
        });
        return () => {
            window.removeEventListener('mousemove', null);
        };
    }, []);

    const handleChangeIcon = (item) => {
        switch (item) {
            case 'Mobile':
                return <MobileOutlined />;
            case 'Laptop':
                return <TabletOutlined />;
            case 'Tablet':
                return <LaptopOutlined />;
            default:
                break;
        }
    };

    return (
        <SidebarLayout>
            <Tooltip placement="right" title={titleSidebar} color={'#2db7f5'}>
                <Button
                    icon={<DoubleRightOutlined />}
                    onClick={showDrawer}
                ></Button>
            </Tooltip>

            <Drawer
                title="Danh Mục Sản Phẩm"
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <TableCategoryProducts
                    showTable={showTable}
                    handleShowCategoryProduct={handleShowCategoryProduct}
                    data={dataCategory}
                    isShow={isShow}
                    changeDataCategory={changeDataCategory}
                />
                {menu_api.menu.map((item, index) => (
                    <Button
                        type="text"
                        icon={handleChangeIcon(item.title)}
                        onMouseEnter={() => someHandler(item, index)}
                        id="btn-show-table"
                        key={item.title}
                        className={`btn-sidebar ${
                            active === index ? 'active' : ''
                        }`}
                    >
                        <Link to={item.link}>{item.title} </Link>
                    </Button>
                ))}
                <Tooltip placement="right" title={titleLucky} color={'#2db7f5'}>
                    <Button type="text" className="btn-sidebar">
                        <Link to="/user/wheel">Vòng quay may mắn</Link>
                    </Button>
                </Tooltip>
            </Drawer>
        </SidebarLayout>
    );
}

Sidebar.propTypes = {};

export default Sidebar;
