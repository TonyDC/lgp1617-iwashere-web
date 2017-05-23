import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import RouteSearch from './RouteSearch';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import EditorLinearScale from 'material-ui/svg-icons/editor/linear-scale';

import 'styles/panel.scss';
import 'styles/utils.scss';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const dividerStyle = {
    marginBottom: 40,
    marginTop: 40,
    width: 'auto'
};

export default class RouteArea extends Component {

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleCreateRoute(event) {
        event.preventDefault();
        this.props.router.push('/reserved/dash/route/create');
    }

    handleEditRoute(routeId) {
        this.props.router.push(`/reserved/dash/route/${routeId}`);
    }

    render() {
        return (
            <div className="wrapper-fill vert-align hor-align">
            <Paper className="paper-min-width" zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Route area</title>
                </Helmet>
                <div style={mainStyle}>
                    <h4>Change an existing route...</h4>
                    <RouteSearch onRouteSelected={ this.handleEditRoute.bind(this) } router={this.props.router} />
                    <Divider style={dividerStyle}/>
                    <h4>... or create a new route</h4>
                    <RaisedButton label="Create Route" icon={<EditorLinearScale/>} onTouchTap={ this.handleCreateRoute.bind(this) } />
                </div>
            </Paper>
                </div>
        );
    }
}

RouteArea.propTypes = { router: PropTypes.object.isRequired };
