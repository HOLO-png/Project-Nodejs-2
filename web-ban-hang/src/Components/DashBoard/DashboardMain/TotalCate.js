import React from 'react';
import PropTypes from 'prop-types';
import Count from '../../CountUp';
import { Link } from 'react-router-dom';

function TotalCate(props) {
    const { data1, data2, data3, data4 } = props;
    const arrayData = [data1, data2, data3, data4];

    return (
        <div className="col-xs-12">
            {arrayData.map((item, index) => (
                <Link
                    key={item.icon}
                    to={`/dashboard/widgets/list-all/${item.title.toLowerCase()}`}
                >
                    <div className="col-xs-3 col-md-3 col-lg-3 no-padding">
                        <div className="panel panel-teal panel-widget border-right">
                            <div className="row no-padding">
                                <em
                                    className={`fa fa-xl ${item.icon} color-blue`}
                                />
                                <div className="large">
                                    {item.data && item.data.length}
                                </div>
                                <div className="text-muted">{item.title}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

TotalCate.propTypes = {};

export default TotalCate;
