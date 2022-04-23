import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function Userlayout(props) {
    const { name, component: YourComponent, path, exact } = props;
    return (
        <Route
            name={name}
            path={path}
            exact={exact}
            render={(props) => <YourComponent {...props} />}
        />
    );
}

Userlayout.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
    path: PropTypes.string,
    exact: PropTypes.bool,
};
