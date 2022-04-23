import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { renderPhotoAccout } from '../../../utils/avartarChange';
import { useGetMessage } from '../../../Hooks/useGetMessage';

function ChatItem(props) {
    const { activeClass, user, onClick } = props;
    const messageArray = useGetMessage(user.uid);
    console.log(messageArray);

    return (
        <div
            className={activeClass ? 'row active-chat' : 'row'}
            onClick={() => onClick(user)}
        >
            <li class="left clearfix" style={{ display: 'flex' }}>
                <div className="col-lg-2" style={{ marginTop: 8 }}>
                    <span class="chat-img pull-left">
                        {renderPhotoAccout(user.photoURL, 50, user.displayName)}
                    </span>
                </div>
                <div className="col-lg-9">
                    <div class="chat-body clearfix">
                        <div class="clearfix-header">
                            <strong class="primary-font">
                                {user.displayName}
                            </strong>{' '}
                            {user.isOnline ? (
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
                        <p>
                            {messageArray && messageArray.length
                                ? messageArray[0].message
                                : 'Bạn chưa có tin nhắn'}
                        </p>
                    </div>
                </div>
                <div className="col-lg-1">
                    <div className="box-alear"></div>
                </div>
            </li>
        </div>
    );
}

ChatItem.propTypes = {};

export default ChatItem;
