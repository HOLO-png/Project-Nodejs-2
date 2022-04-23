import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFound from '../../pages/NotFound';

export default function Layout(props) {
    const { name, component: YourComponent, exact, path } = props;

    return (
        <Route
            name={name}
            exact={exact}
            path={path}
            component={YourComponent}
            render={(routeProps) => <YourComponent {...routeProps} />}
        />
    );
}

Layout.propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
};
