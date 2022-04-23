import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { renderPhotoAccout } from '../../../utils/avartarChange';

function ChatContentItem(props) {
    const { con, chatUser } = props;
    const messageRef = useRef();

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [con.message]);

    return (
        <div className="row" ref={messageRef}>
            <li class="left clearfix-chat-content-item">
                <div className="col-lg-">
                    <span class="chat-img pull-left" style={{ marginLeft: 20 }}>
                        {renderPhotoAccout(
                            chatUser.photoURL,
                            30,
                            chatUser.displayName,
                        )}
                    </span>
                </div>
                <div
                    className="col-lg-14"
                    style={{ justifyContent: 'start', display: 'flex' }}
                >
                    <p>{con.message}</p>
                    <span className="date-message">{con.created}</span>
                </div>
            </li>
        </div>
    );
}

ChatContentItem.propTypes = {};

export default ChatContentItem;
