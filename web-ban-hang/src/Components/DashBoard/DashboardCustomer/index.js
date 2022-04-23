// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import TableCustomer from './TableCustomer';
// import NavigationCustomer from './NavigationCustomer';
// import TopUser from './TopUser';
// import { useGetUsers } from '../../../Hooks/useGetUsers';
// // import { db } from '../../../Firebase/config';
// import { toast } from 'react-toastify';

// function DashboardCustomer(props) {
//     const [visible, setVisible] = useState(false);
//     const users = useGetUsers();

//     const handleSetVisible = () => {
//         setVisible(false);
//     };

//     const handleShowNavigation = () => {
//         setVisible(true);
//     };

//     const confirm = (item) => {
//         setTimeout(() => {
//             db.collection('users')
//                 .doc(item.id)
//                 .delete()
//                 .then(() => {
//                     toast.success(`Bạn đã xóa thành công!`);
//                 })
//                 .catch((error) => {
//                     toast.error(`Có lỗi, vui lòng thực hiện lại!`);
//                 });
//         }, 500);
//     };

//     return (
//         <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
//             <div className="row">
//                 <ol className="breadcrumb">
//                     <li>
//                         <a href="#">
//                             <em className="fa fa-home" />
//                         </a>
//                     </li>
//                     <li className="active">Customer</li>
//                 </ol>
//             </div>
//             {/*/.row*/}
//             <div className="row">
//                 <div className="col-lg-12">
//                     <h1 className="page-header">Customer</h1>
//                 </div>
//             </div>
//             {/*/.row*/}
//             <div className="row">
//                 <div className="col-md-12">
//                     <div className="panel panel-default articles">
//                         <div className="panel-heading">
//                             Danh Sách Người Sử Dụng
//                             <ul className="pull-right panel-settings panel-button-tab-right">
//                                 <li className="dropdown">
//                                     <a
//                                         className="pull-right dropdown-toggle"
//                                         data-toggle="dropdown"
//                                         href="#"
//                                     >
//                                         <i class="far fa-clipboard-user"></i>
//                                     </a>
//                                     <ul className="dropdown-menu dropdown-menu-right">
//                                         <li>
//                                             <ul className="dropdown-settings">
//                                                 <li>
//                                                     <a
//                                                         onClick={
//                                                             handleShowNavigation
//                                                         }
//                                                     >
//                                                         <i class="fad fa-user-tag"></i>{' '}
//                                                         Xem Thông Tin (Chỉ 1
//                                                         người)
//                                                     </a>
//                                                 </li>
//                                                 <li className="divider" />
//                                                 <li>
//                                                     <a href="#">
//                                                         <i class="fad fa-user-minus"></i>{' '}
//                                                         Xoá Ra Khỏi Danh Sách
//                                                     </a>
//                                                 </li>
//                                                 <li className="divider" />
//                                                 <li>
//                                                     <a href="#">
//                                                         <i class="fad fa-user-lock"></i>{' '}
//                                                         Chặn Người Này
//                                                     </a>
//                                                 </li>
//                                                 <li className="divider" />
//                                                 <li>
//                                                     <a href="#">
//                                                         <i class="fad fa-user-cog"></i>{' '}
//                                                         Sửa Thông Tin (Chỉ 1
//                                                         Người)
//                                                     </a>
//                                                 </li>
//                                             </ul>
//                                         </li>
//                                     </ul>
//                                 </li>
//                             </ul>
//                             <span className="pull-right clickable panel-toggle panel-button-tab-left">
//                                 <i class="fad fa-user-plus"></i>
//                             </span>
//                         </div>
//                         <div className="panel-body articles-container">
//                             <TableCustomer users={users} confirm={confirm} />
//                             <NavigationCustomer
//                                 visible={visible}
//                                 handleSetVisible={handleSetVisible}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="row">
//                 <TopUser />
//             </div>
//         </div>
//     );
// }

// DashboardCustomer.propTypes = {};

// export default DashboardCustomer;
