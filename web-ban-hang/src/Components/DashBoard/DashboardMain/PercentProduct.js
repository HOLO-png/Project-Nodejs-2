import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import EmptyComponent from '../../EmplyComponent';

function PercentProduct(props) {
    return (
        <div className="col-xs-6">
            <EmptyComponent>
                <div className="row">
                    <div className="col-xs-6 col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body easypiechart-panel">
                                <h4>New Orders</h4>
                                <Progress type="circle" percent={92} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body easypiechart-panel">
                                <h4>Comments</h4>
                                <Progress
                                    type="circle"
                                    percent={65}
                                    style={{
                                        stroke: '#4cc541 !important',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body easypiechart-panel">
                                <h4>New Users</h4>
                                <Progress type="circle" percent={56} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body easypiechart-panel">
                                <h4>Visitors</h4>
                                <Progress type="circle" percent={27} />
                            </div>
                        </div>
                    </div>
                </div>
            </EmptyComponent>
        </div>
    );
}

PercentProduct.propTypes = {};

export default PercentProduct;
