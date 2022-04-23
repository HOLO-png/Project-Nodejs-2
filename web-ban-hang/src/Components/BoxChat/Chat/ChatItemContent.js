import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { renderPhotoAccout } from '../../../utils/avartarChange';

function ChatItemContent(props) {
    const { con } = props;
    const messageRef = useRef();

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [con.message]);

    return (
        <div className="chat-msg" ref={messageRef}>
            <div className="chat-image-user">
                {renderPhotoAccout(
                    'https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-anh-girl-xinh-toc-ngan-de-thuong.jpg',
                    30,
                    'ok',
                )}
            </div>
            <div className="chat-content-text">
                <p>{con.message}</p>
            </div>
        </div>
    );
}

ChatItemContent.propTypes = {};

export default ChatItemContent;
