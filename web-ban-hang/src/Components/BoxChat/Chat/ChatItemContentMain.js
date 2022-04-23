import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { renderPhotoAccout } from '../../../utils/avartarChange';

function ChatItemContentMain(props) {
    const { data, con } = props;
    const messageRef = useRef();

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [con.message]);

    return (
        <div
            className="chat-msg left"
            style={{ justifyContent: 'end' }}
            ref={messageRef}
        >
            <div className="chat-content-text">
                <p>{con.message}</p>
            </div>
            <div className="chat-image-user">
                {renderPhotoAccout(data.user.photoURL, 30, 'ok')}
            </div>
        </div>
    );
}

ChatItemContentMain.propTypes = {};

export default ChatItemContentMain;
