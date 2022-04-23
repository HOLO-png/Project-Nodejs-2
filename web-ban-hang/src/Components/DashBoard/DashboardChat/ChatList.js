import React from 'react';
import PropTypes from 'prop-types';
import ChatItem from './ChatItem';
import { Empty } from 'antd';

function ChatList(props) {
    const { users, initChat } = props;
    return (
        <ul>
            {users ? (
                users.map((user) => (
                    <ChatItem
                        activeClass={true}
                        user={user}
                        key={user.id}
                        onClick={initChat}
                    />
                ))
            ) : (
                <Empty />
            )}
        </ul>
    );
}

ChatList.propTypes = {};

export default ChatList;
