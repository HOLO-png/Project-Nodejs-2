import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function DashboardItemLayout(props) {
    const { name, component: YourComponent, path, exact, url } = props;
    return (
        <Route
            name={name}
            path={path}
            exact={exact}
            render={(props) => <YourComponent {...props} url={url} />}
        />
    );
}

DashboardItemLayout.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
    path: PropTypes.string,
    exact: PropTypes.bool,
};
