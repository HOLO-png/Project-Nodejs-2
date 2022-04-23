import React from 'react';
import PropTypes from 'prop-types';

function ChatMessing(props) {
    const { handleSubmitMessage, message, setMessage } = props;
    return (
        <div className="row chat-messing">
            <div className="col-lg-1">
                <i class="fad fa-plus-circle"></i>
            </div>
            <div className="col-lg-1 image-file">
                <i class="fad fa-file-image"></i>
                <input type="file" className="image-file-input" />
            </div>
            <div className="col-lg-1">
                <i class="fad fa-photo-video"></i>
            </div>
            <div className="col-lg-8">
                <div className="input-form">
                    <input
                        placeholder="Nhập tin nhắn của bạn ..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-lg-1" onClick={handleSubmitMessage}>
                <i class="fad fa-paper-plane"></i>
            </div>
        </div>
    );
}

ChatMessing.propTypes = {};

export default ChatMessing;
