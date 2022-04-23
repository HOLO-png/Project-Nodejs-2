import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Paginations from './Pagination/index';
import { Comment, Avatar, Form, Button, Input, Rate } from 'antd';

import CommentItem from './CommentItem';
import { toast } from 'react-toastify';
import { renderPhotoAccout } from '../../../utils/avartarChange';
import { imagesUpload, imageUpload } from '../../../utils/imageUpload';
import EditorComment from './EditorComment';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCommentsToProduct,
    productItemSelector,
} from '../../../Store/Reducer/product';

function Comments(props) {
    const { commentsUser, product, handleInSertCmt, user, tokenAuth } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const totalComments = useSelector(productItemSelector);

    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [star, setStar] = useState(0);
    const [img, setimg] = useState([]);
    const [video, setvideo] = useState([]);

    const { search } = history.location;

    const { total } = totalComments;

    useEffect(() => {
        setComments(commentsUser);
    }, [commentsUser]);

    useEffect(() => {
        if (!product) {
            dispatch(getCommentsToProduct({ productId: product._id, search }));
        }
    }, [dispatch, product, search]);

    const handleSubmit = async (e) => {
        if (value) {
            e.preventDefault();
            setSubmitting(true);
            const imgURL = [];
            const videoURL = [];
            let imageMedia = [];
            let videoMedia = [];
            if (img.length) {
                img.forEach((el) => {
                    if (el.thumbUrl) {
                        imgURL.push(el.thumbUrl);
                    }
                });
                imageMedia = await imagesUpload(imgURL);
            }
            if (video.length) {
                video.forEach(async (el) => {
                    if (el.originFileObj) {
                        videoURL.push(el.originFileObj);
                    }
                });
                videoMedia = await imagesUpload(videoURL);
            }

            setTimeout(async () => {
                setSubmitting(false);
                setValue('');
                setStar(0);
                handleInSertCmt({
                    user: user,
                    star: star,
                    content: value.trim(),
                    tag: {},
                    media: {
                        image: imageMedia,
                        video: videoMedia,
                    },
                });

                setimg([]);
                setvideo([]);
            }, 1000);
        } else {
            toast.warning('Bạn chưa nhập nội dung vào trường này');
        }
    };

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const handleChangeStar = (value) => {
        setStar(value);
    };

    const importImg = useCallback((media) => {
        media.forEach(async (element) => {
            if (element.type === 'video/mp4') {
                setvideo([element]);
            } else if (element.type === 'image/jpeg') {
                setimg(media);
            }
        });
    });

    const handlePagination = (num) => {
        const search = `?page=${num}`;
        dispatch(getCommentsToProduct({ productId: product._id, search }));
    };

    return (
        <>
            {user && tokenAuth && (
                <Comment
                    avatar={renderPhotoAccout(
                        user.profilePicture,
                        30,
                        user.displayName,
                    )}
                    content={
                        <EditorComment
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                            star={star}
                            handleChangeStar={handleChangeStar}
                            importImg={importImg}
                            img={img}
                            video={video}
                            user={user}
                        />
                    }
                />
            )}
            <CommentItem
                comments={comments}
                handleInSertCmt={handleInSertCmt}
                user={user}
                product={product}
                setValue={setValue}
                value={value}
                tokenAuth={tokenAuth}
            />
            <Paginations total={total} callBack={handlePagination} />
            <br />
        </>
    );
}

Comments.propTypes = {};

export default memo(Comments);
