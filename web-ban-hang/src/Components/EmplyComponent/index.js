import React from 'react';
import PropTypes from 'prop-types';

function EmptyComponent(props) {
    return <div className="empty-component">{props.children}</div>;
}

EmptyComponent.propTypes = {};

export default EmptyComponent;
