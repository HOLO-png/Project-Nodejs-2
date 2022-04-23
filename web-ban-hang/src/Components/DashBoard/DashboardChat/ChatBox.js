import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { renderPhotoAccout } from '../../../utils/avartarChange';
function ChatBox(props) {
    const { chatStarted, chatUser } = props;
    return (
        <div className="row chat-box-active">
            <div className="col-lg-8">
                <div className="col-lg-2" style={{ marginTop: 8 }}>
                    <span
                        class="chat-img pull-left"
                        style={{ marginBottom: 9 }}
                    >
                        {renderPhotoAccout(
                            chatUser.photoURL,
                            50,
                            chatUser.displayName,
                        )}
                    </span>
                </div>
                <div className="col-lg-9">
                    <div class="chat-body clearfix">
                        <div class="clearfix-header">
                            <strong class="primary-font">
                                {chatStarted ? chatUser.displayName : ''}
                            </strong>
                            <br />
                            {chatUser.isOnline ? (
                                <div className="active-acount">
                                    <div className="active-acount-check"></div>
                                    <small class="text-muted">
                                        Đang hoạt động
                                    </small>
                                </div>
                            ) : (
                                <small>
                                    {moment().format('YYYY-MM-DD HH:mm:ss')}
                                </small>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-1">
                <i className="fas fa-phone"></i>
            </div>
            <div className="col-lg-1">
                <i className="fad fa-video"></i>
            </div>
            <div className="col-lg-1">
                <i className="fad fa-filter"></i>
            </div>
        </div>
    );
}

ChatBox.propTypes = {};

export default ChatBox;
