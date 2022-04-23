import React, { createElement, useState } from 'react';
import ReactDOM from 'react-dom';
import { Comment, Tooltip, Avatar, Rate, Button } from 'antd';
import moment from 'moment';
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
    CaretUpOutlined,
    CaretDownOutlined,
} from '@ant-design/icons';

function UserComments(props) {
    const { comment } = props;
    const [action, setAction] = useState(null);
    const [statusHeight, setStatusHeight] = useState(false);

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{comment.like}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span>
                {React.createElement(
                    action === 'disliked' ? DislikeFilled : DislikeOutlined,
                )}
                <span className="comment-action">{comment.dislike}</span>
            </span>
        </Tooltip>,
    ];
    const ExampleComment = ({ children }) => (
        <Comment
            actions={actions}
            author={<a>{comment.author}</a>}
            avatar={<Avatar src={comment.avatar} alt={comment.author} />}
            content={<p>{comment.content}</p>}
            datetime={
                <Tooltip title={comment.datetime}>
                    <span>{comment.datetime}</span>
                </Tooltip>
            }
        >
            <div className="rate-comment">
                <Rate disabled defaultValue={comment.star} />
            </div>
            {children}
        </Comment>
    );

    const handleCommentsList = (key) => {
        setStatusHeight(!statusHeight);
    };

    return (
        <div className="user-comments">
            <ExampleComment>
                {comment.cmt_item.length ? (
                    <Button
                        type="link"
                        icon={
                            statusHeight ? (
                                <CaretUpOutlined />
                            ) : (
                                <CaretDownOutlined />
                            )
                        }
                        onClick={handleCommentsList}
                    >
                        {!statusHeight ? 'Xem' : 'Ẩn'} {comment.cmt_item.length}{' '}
                        câu trả lời
                    </Button>
                ) : (
                    ''
                )}
                {comment.cmt_item.map((item) => (
                    <div
                        className="list-comment-item"
                        key={item.id_author}
                        style={{
                            height: statusHeight ? 'auto' : '0px',
                        }}
                    >
                        <Comment
                            actions={actions}
                            author={<a>{item.author}</a>}
                            avatar={
                                <Avatar src={item.avatar} alt={item.author} />
                            }
                            content={<p>{item.content}</p>}
                            datetime={
                                <Tooltip title={item.datetime}>
                                    <span>{item.datetime}</span>
                                </Tooltip>
                            }
                        />
                    </div>
                ))}
            </ExampleComment>
        </div>
    );
}

UserComments.propTypes = {};

export default UserComments;
