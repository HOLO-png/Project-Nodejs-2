import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { humanImg } from '../../../../assets/fake-data/human';

const FileUserEdit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    input[type='file'] {
        display: none;
    }
    label.file-custom {
        color: #fff;
        height: 45px;
        width: 120px;
        background: #45a8ff;
        margin: auto;
        font-size: 17px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        cursor: pointer;
        box-shadow: 1px 0px 5px 1px #c8c8c8;
        transform: translateY(10px);
    }
    i {
        font-size: 16px;
        margin-right: 8px;
    }
`;

function UploadFileImg(props) {
    const { photoURL, importImg } = props;
    const [imgUser, setImgUser] = useState('');

    function chooseFileImg(e) {
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                setImgUser(e.target.result);
                importImg(e.target.result);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }

    return (
        <FileUserEdit className="file-user-edit">
            <Avatar
                size={150}
                src={imgUser ? imgUser : photoURL ? photoURL : humanImg}
            />
            <input
                type="file"
                onChange={(e) => chooseFileImg(e)}
                accept="image/gif, image/jpeg, image/png"
                id="file"
            />
            <label className="file-custom" htmlFor="file">
                <i className="fas fa-file-image"></i>Tải ảnh lên
            </label>
        </FileUserEdit>
    );
}

UploadFileImg.propTypes = {};

export default UploadFileImg;
