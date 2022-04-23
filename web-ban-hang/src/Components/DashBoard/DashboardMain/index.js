/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import TotalCate from './TotalCate';
import PercentProduct from './PercentProduct';
import Chart from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import {
    commentsUserSelector,
    getCommentsAllApi,
} from '../../../Store/Reducer/comments_user';
import { useGetUsers } from '../../../Hooks/useGetUsers';
import {
    getMobilesApi,
    mobilesSelector,
} from '../../../Store/Reducer/mobile_api';
import {
    getLaptopsApi,
    laptopsSelector,
} from '../../../Store/Reducer/laptop_api';
import {
    getTabletsApi,
    tabletsSelector,
} from '../../../Store/Reducer/tablet_api';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from 'styled-components';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    transition: display 0.5s ease;
`;

function DashboardMain(props) {
    const [order, setOrder] = useState([]);
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const comments_user = useSelector(commentsUserSelector);
    // const mobile_api = useSelector(mobilesSelector);
    // const laptop_api = useSelector(laptopsSelector);
    // const tablet_api = useSelector(tabletsSelector);

    useEffect(() => {
        // dispatch(getCommentsAllApi());
        // dispatch(getMobilesApi());
        // dispatch(getLaptopsApi());
        // dispatch(getTabletsApi());
    }, [dispatch]);

    useEffect(() => {
        // const unsubscribe = db
        //     .collection('orders')
        //     .onSnapshot((querySnapshot) => {
        //         const orders = [];
        //         querySnapshot.forEach((doc) => {
        //             orders.push(doc.data());
        //         });
        //         setOrder(orders);
        //     });
        // return unsubscribe;
    }, []);

    useEffect(() => {
        // const unsubscribe = db
        //     .collection('conversations')
        //     .onSnapshot((querySnapshot) => {
        //         const messages = [];
        //         querySnapshot.forEach((doc) => {
        //             messages.push(doc.data());
        //         });
        //         setMessages(messages);
        //     });
        // return unsubscribe;
    }, []);

    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>
                            <a href="#">
                                <em className="fa fa-home" />
                            </a>
                        </li>
                        <li className="active">Dashboard</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Dashboard</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="panel panel-container">
                    <div className="row">
                        {/* <TotalCate
                            data1={{
                                data: order,
                                title: 'New Orders',
                                icon: 'fa fa-xl fa-shopping-cart color-blue',
                            }}
                            data2={{
                                data: comments_user,
                                title: 'Comments',
                                icon: 'fa fa-xl fa-comments color-orange',
                            }}
                            data3={{
                                data: users,
                                title: 'New Users',
                                icon: 'fa fa-xl fa-users color-teal',
                            }}
                            data4={{
                                data: users,
                                title: 'Page Views',
                                icon: 'fa fa-xl fa-search color-red',
                            }}
                        /> */}
                        {/* <TotalCate
                            data1={{
                                data: mobile_api,
                                title: 'Mobile',
                                icon: 'fa fa-xl fa-mobile color-blue',
                            }}
                            data2={{
                                data: laptop_api,
                                title: 'Laptop',
                                icon: 'fa fa-xl fa-laptop color-orange',
                            }}
                            data3={{
                                data: tablet_api,
                                title: 'Tablet',
                                icon: 'fa fa-xl fa-tablet color-teal',
                            }}
                            data4={{
                                data: messages,
                                title: 'Messages',
                                icon: 'fa fa-xl fa-sms color-red',
                            }}
                        /> */}
                        <PercentProduct />
                    </div>
                    <Chart />
                    {/*/.row*/}
                </div>
            </div>
        </>
    );
}

DashboardMain.propTypes = {};

export default DashboardMain;
