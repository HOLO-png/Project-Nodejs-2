import React from 'react';
// import PropTypes from 'prop-types';
// import { APP_SHARE } from '../../../../assets/fake-data/app-share';
// import Avatar from 'antd/lib/avatar/avatar';
import { Skeleton } from 'antd';
// import { openNotification } from '../../../../utils/messageAlear';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon } from 'react-share';
function ProductShare(props) {
    const { loading } = props;
    let url = '';

    // const handleChangeShare = () => {
    //     openNotification(
    //         'Xin lỗi!',
    //         'Chức năng này tui chưa làm nên lướt chỗ khác đi nha',
    //     );
    // };

    if (typeof window === 'object') {
        url = String(window.location);
    }

    return (
        <>
            {loading ? (
                <Skeleton.Button
                    active={true}
                    size="large"
                    shape="default"
                    block={false}
                    style={{ width: 140, marginRight: 150 }}
                />
            ) : (
                <div className="product-share">
                    <p>Chia Sẻ:</p>
                    <FacebookShareButton
                        url={url}
                        quote={'Hey !! product is the best'}
                        hashtag="#React"
                    >
                        <FacebookIcon
                            logoFillColor="white"
                            round={true}
                        ></FacebookIcon>
                    </FacebookShareButton>
                    <WhatsappShareButton title="Sharing Content" url={url}>
                        <WhatsappIcon
                            logoFillColor="white"
                            round={true}
                        ></WhatsappIcon>
                    </WhatsappShareButton>
                </div>
            )}
        </>
    );
}

ProductShare.propTypes = {};

export default ProductShare;
