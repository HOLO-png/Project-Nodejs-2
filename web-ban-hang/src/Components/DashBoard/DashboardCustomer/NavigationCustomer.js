/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

function NavigationCustomer({ visible, handleSetVisible, user }) {
    const onClose = () => {
        handleSetVisible(false);
    };

    return (
        <>
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <p
                    className="site-description-item-profile-p"
                    style={{ marginBottom: 24 }}
                >
                    User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
            </Drawer>
        </>
    );
}

NavigationCustomer.propTypes = {};

export default NavigationCustomer;
