/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { nav_dashboard } from '../../../assets/fake-data';

function OptionalNav(props) {
    const renderOptionalNav = nav_dashboard.map((item, index) => {
        return (
            <li className="active" key={index}>
                <NavLink
                    to={item.link}
                    activeStyle={{
                        fontWeight: 'bold',
                        color: '#fff',
                        backgroundColor: '#30a5ff',
                    }}
                >
                    <i className={item.icon}></i> {item.name}
                </NavLink>
            </li>
        );
    });
    return <ul className="nav menu">{renderOptionalNav}</ul>;
}

OptionalNav.propTypes = {};

export default OptionalNav;
