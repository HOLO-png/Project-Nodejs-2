import { Avatar } from 'antd';
import { humanImg } from '../assets/fake-data/human';

export const renderPhotoAccout = (photoURL, val, displayName) => {
    if (photoURL) {
        return <Avatar src={photoURL} alt={displayName} size={val} />;
    } else {
        return <Avatar src={humanImg} alt={displayName} size={val} />;
    }
};
