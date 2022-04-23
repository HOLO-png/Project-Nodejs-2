// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import ChatList from './ChatList';
// import ChatBox from './ChatBox';
// import ChatBoxContent from './ChatBoxContent';
// import ChatMessing from './ChatMessing';
// import moment from 'moment';
// import { useGetUsers } from '../../../Hooks/useGetUsers';
// // import { AuthContext } from '../../../Context/AuthProvider';
// import { db } from '../../../Firebase/config';

// function DashboardChat(props) {
//     const users = useGetUsers();
//     // const data = useContext(AuthContext);
//     const [chatStarted, setChatStarted] = useState(false);
//     const [chatUser, setChatUser] = useState(null);
//     const [message, setMessage] = useState('');
//     const [conversationsArray, setConversationsArray] = useState(null);
//     const [userId, setUserId] = useState(null);

//     // const { uid } = data.user;

//     // const initChat = (user) => {
//     //     setChatUser(user);
//     //     setUserId(user.uid);
//     //     setChatStarted(true);
//     //     handleGetRealtimeConversation({ uid_1: uid, uid_2: user.uid });
//     // };

//     const handleSubmitMessage = () => {
//         const msgObj = {
//             user_uid_1: uid,
//             user_uid_2: userId,
//             message,
//         };
//         if (message !== '') {
//             db.collection('conversations')
//                 .add({
//                     ...msgObj,
//                     isView: true,
//                     created: moment().format('YYYY-MM-DD HH:mm:ss'),
//                     createAt: new Date(),
//                 })
//                 .then((data) => {
//                     console.log(data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }

//         setMessage('');
//     };

//     const handleGetRealtimeConversation = async (user) => {
//         await db
//             .collection('conversations')
//             .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
//             .orderBy('createAt', 'asc')
//             .onSnapshot((querySnapshot) => {
//                 const conversations = [];
//                 querySnapshot.forEach((doc) => {
//                     const data = doc.data();
//                     if (
//                         (data.user_uid_1 === user.uid_1 &&
//                             data.user_uid_2 === user.uid_2) ||
//                         (data.user_uid_1 === user.uid_2 &&
//                             data.user_uid_2 === user.uid_1)
//                     ) {
//                         conversations.push(doc.data());
//                     }
//                 });
//                 setConversationsArray(conversations);
//             });
//     };

//     return (
//         <div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
//             <div className="row">
//                 <ol className="breadcrumb">
//                     <li>
//                         <a href="#">
//                             <em className="fa fa-home" />
//                         </a>
//                     </li>
//                     <li className="active">Chat</li>
//                 </ol>
//             </div>
//             {/*/.row*/}
//             <div className="row">
//                 <div className="col-lg-12">
//                     <h1 className="page-header">Chat</h1>
//                 </div>
//             </div>
//             {/*/.row*/}
//             <div className="row">
//                 <div className="col-lg-4">
//                     <div className="panel panel-default articles">
//                         <div className="panel-heading">
//                             Danh Sách Chat
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
//                                                     <a>
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
//                         <div className="panel-body articles-container container-chat-box">
//                             <ChatList users={users} initChat={initChat} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-lg-8">
//                     <div className="panel panel-default articles">
//                         <div className="panel-heading">
//                             ChatBox
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
//                                                     <a>
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
//                             {chatStarted && (
//                                 <>
//                                     <ChatBox
//                                         chatStarted={chatStarted}
//                                         chatUser={chatUser}
//                                     />
//                                     <ChatBoxContent
//                                         chatUser={chatUser}
//                                         conversationsArray={conversationsArray}
//                                         uid={uid}
//                                     />
//                                     <ChatMessing
//                                         handleSubmitMessage={
//                                             handleSubmitMessage
//                                         }
//                                         message={message}
//                                         setMessage={setMessage}
//                                     />
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// DashboardChat.propTypes = {};

// export default DashboardChat;
