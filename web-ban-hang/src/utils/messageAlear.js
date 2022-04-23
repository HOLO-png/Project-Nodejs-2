import { Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export const openNotification = (title, des) => {
    notification.open({
        message: title,
        description: des,
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
};
