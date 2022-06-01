/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CommentsItemOption from './CommentsItemOption';

function CommentItem(props) {
    const { handleInSertCmt, user, product, setValue, value, tokenAuth,axiosJWT } =
        props;
    const [index, setIndex] = useState(null);
    const [idAuthor, setIdAuthor] = useState(null);
    const [commentMediaUrl, setCommentMediaUrl] = useState('');
    const [mediaShowActive, setMediaShowActive] = useState('');
    const [comments, setComments] = useState([]);
    const [replyComment, setReplyComment] = useState([]);

    useEffect(() => {
        if (product.comments) {
            const newComment = product.comments.filter((cmt) => !cmt.reply);
            setComments(newComment);
        }
    }, [product.comments]);

    useEffect(() => {
        if (product.comments) {
            const newRep = product.comments.filter((cmt) => cmt.reply);
            setReplyComment(newRep);
        }
    }, [product.comments]);

    const handleStatus = (item, key) => {
        setIndex(key);
        setIdAuthor(item.id_user);
    };

    const handleSetActiveCmt = () => {
        setIndex(null);
    };

    const handleSetIndex = (data) => {
        setIndex(data);
    };

    const handleSetImgshow = (img, commentId) => {
        setCommentMediaUrl(img.url);
        setMediaShowActive(commentId);
    };

    const CommentList = () => {
        if (comments) {
            return comments.map((comment) => {
                const styleCommentItem = {
                    opacity: comment._id ? 1 : 0.5,
                    pointerEvent: comment._id ? 'inherit' : 'none',
                };
                return (
                    <CommentsItemOption
                        styleCommentItem={styleCommentItem}
                        comment={comment}
                        handleStatus={handleStatus}
                        handleSetActiveCmt={handleSetActiveCmt}
                        handleSetIndex={handleSetIndex}
                        handleSetImgshow={handleSetImgshow}
                        commentMediaUrl={commentMediaUrl}
                        mediaShowActive={mediaShowActive}
                        index={index}
                        user={user}
                        idAuthor={idAuthor}
                        handleInSertCmt={handleInSertCmt}
                        setValue={setValue}
                        value={value}
                        tokenAuth={tokenAuth}
                        replyComment={replyComment}
                        setReplyComment={setReplyComment}
                        product={product}
                        axiosJWT={axiosJWT}
                    />
                );
            });
        } else {
            return '';
        }
    };

    return <CommentList />;
}

CommentItem.propTypes = {};

export default memo(CommentItem);
