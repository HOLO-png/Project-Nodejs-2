// /* eslint-disable no-unused-expressions */
// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Form, Input, Button, Radio, Row, Col, DatePicker } from 'antd';
// import { SaveOutlined } from '@ant-design/icons';
// import { AuthContext } from '../../../../Context/AuthProvider';

// import UploadFileImg from './UploadFileImg';
// import ChangePhoneNumber from './ChangePhoneNumber';
// import { isEmptyObject } from '../../../../utils/checkEmptyObj';
// import { toast } from 'react-toastify';
// import firebase from '../../../../Firebase/config';

// const FileUserContent = styled.div`
//     .file-user-title {
//         margin-left: 40px;
//     }
//     .file-user-name {
//         font-size: 23px;
//         margin: 0;
//     }
//     .file-user-des {
//         font-weight: 300;
//         color: #aeaeae;
//     }
//     .user-name {
//         margin: 0;
//     }
//     .ant-row.ant-form-item {
//         margin: 10px;
//     }
//     .date-title {
//         font-size: 16px;
//         color: #969696;
//         font-weight: 600;
//         margin: 5px 10px;
//     }
// `;
// function FileUser(props) {
//     const data = React.useContext(AuthContext);
//     const [loadings, setLoadings] = useState(false);
//     const [dataUser, setDataUser] = useState({
//         displayName: '',
//         email: '',
//         sex: '',
//         date_of_birth: '',
//         number_phone: '',
//         photoURL: '',
//     });
//     const { email, photoURL, displayName, dateOfBirth, sex, phoneNumber, id } =
//         data.user;

//     const user = firebase.auth().currentUser;

//     const enterLoading = () => {
//         setLoadings(true);
//         setTimeout(() => {
//             let o = Object.fromEntries(
//                 Object.entries(dataUser).filter(([_, v]) => v !== ''),
//             );
//             if (user === null) {
//                 return;
//             }
//             var db = firebase.firestore();

//             db.collection('users')
//                 .doc(id)
//                 .update({
//                     ...o,
//                 })
//                 .then(() => {
//                     toast.success(
//                         `Bạn đã cập nhật thành công tài khoản của mình 😂`,
//                     );
//                 })
//                 .catch((error) => {
//                     toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
//                 });

//             setDataUser({
//                 displayName: '',
//                 email: '',
//                 sex: '',
//                 date_of_birth: '',
//                 number_phone: '',
//                 photoURL: '',
//             });
//             setLoadings(false);
//         }, 2000);
//     };

//     const onChangeDate = (date, dateString) => {
//         setDataUser({ ...dataUser, dateOfBirth: dateString });
//     };

//     const onChangeSex = (e) => {
//         setDataUser({ ...dataUser, sex: e.target.value });
//     };

//     const onChangeInputName = (e) => {
//         setDataUser({ ...dataUser, displayName: e.target.value });
//     };

//     const importImg = (img) => {
//         setDataUser({ ...dataUser, photoURL: img });
//     };

//     const onChangePhoneNumber = (e) => {
//         setDataUser({ ...dataUser, phoneNumber: e.target.value });
//     };

//     return (
//         <FileUserContent>
//             <div className="file-user-title">
//                 <p className="file-user-name">Hồ Sơ Của Tôi</p>
//                 <p className="file-user-des">
//                     Quản lý thông tin hồ sơ để bảo mật tài khoản
//                 </p>
//             </div>
//             <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//                 <Col className="gutter-row" span={16}>
//                     <div className="file-user-content">
//                         <Form
//                             labelCol={{
//                                 span: 6,
//                             }}
//                             wrapperCol={{
//                                 span: 18,
//                             }}
//                             layout="horizontal"
//                             size="large"
//                         >
//                             <Form.Item
//                                 label="Tên Đăng Nhập"
//                                 style={{ margin: 0, fontSize: '16px' }}
//                             >
//                                 <p className="user-name">{displayName}</p>
//                             </Form.Item>
//                             <Form.Item label="Tên">
//                                 <Input
//                                     onChange={onChangeInputName}
//                                     placeholder="Nhập đầy đủ họ tên..."
//                                 />
//                             </Form.Item>
//                             <Form.Item label="Email">
//                                 <Input value={email} />
//                             </Form.Item>
//                             <Form.Item label="Tên Shop">
//                                 <Input
//                                     defaultValue="Vo Danh Shop"
//                                     value={displayName + ' SHOP'}
//                                     placeholder="Nhập tên Shop"
//                                 />
//                             </Form.Item>

//                             <ChangePhoneNumber
//                                 phoneNumber={phoneNumber}
//                                 onChangePhoneNumber={onChangePhoneNumber}
//                             />
//                             <Form.Item label="Ngày Sinh">
//                                 <DatePicker onChange={onChangeDate} />
//                                 {dateOfBirth ? (
//                                     <p className="date-title">{dateOfBirth}</p>
//                                 ) : (
//                                     ''
//                                 )}
//                             </Form.Item>

//                             <Form.Item label="Giới Tính">
//                                 <Radio.Group
//                                     onChange={onChangeSex}
//                                     value={sex}
//                                     defaultValue="orther"
//                                 >
//                                     <Radio value={'male'}>Nam</Radio>
//                                     <Radio value={'female'}>Nữ</Radio>
//                                     <Radio value={'orther'}>Khác</Radio>
//                                 </Radio.Group>
//                             </Form.Item>
//                             <Button
//                                 type="primary"
//                                 loading={loadings}
//                                 onClick={enterLoading}
//                                 size="large"
//                                 icon={<SaveOutlined />}
//                                 style={{ marginLeft: '144px' }}
//                                 disabled={isEmptyObject(dataUser)}
//                             >
//                                 Lưu
//                             </Button>
//                         </Form>
//                     </div>
//                 </Col>
//                 <Col
//                     className="gutter-row"
//                     span={8}
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <UploadFileImg photoURL={photoURL} importImg={importImg} />
//                 </Col>
//             </Row>
//         </FileUserContent>
//     );
// }

// FileUser.propTypes = {};

// export default FileUser;
