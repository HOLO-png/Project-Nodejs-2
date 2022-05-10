import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function Userlayout({
    name,
    component: YourComponent,
    path,
    exact,
    location,
}) {
    return (
        <Route
            name={name}
            path={location.pathname}
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
