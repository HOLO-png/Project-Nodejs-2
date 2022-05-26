/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import MessageInfo from './MessageInfo';
import Alear from './Alear';
import Calendars from './Calendar';
import { Link } from 'react-router-dom';

function DashboardHeader(props) {
    return (
        <nav
            className="navbar navbar-custom navbar-fixed-top"
            role="navigation"
        >
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand">
                        <Link to="/">
                            <span>Shop IPhone </span>
                        </Link>
                        Admin
                    </a>
                    <ul className="nav navbar-top-links navbar-right">
                        <MessageInfo />
                        <Alear />
                        <Calendars />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

DashboardHeader.propTypes = {};

export default DashboardHeader;
