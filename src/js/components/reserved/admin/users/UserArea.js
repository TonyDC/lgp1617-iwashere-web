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

export default class UserArea extends Component {

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

    handleEditRoute(route) {
        this.props.router.push(`/reserved/dash/route/${route.routeId}`);
    }

    render() {
        return (
            <div className="wrapper-fill vert-align hor-align">
            <Paper className="paper-min-width" zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - User area</title>
                </Helmet>
                <div style={mainStyle}>
                    <h4>Change an existing user...</h4>
                    <RouteSearch onRouteSelected={ this.handleEditRoute.bind(this) } router={this.props.router} />
                </div>
            </Paper>
                </div>
        );
    }
}

UserArea.propTypes = { router: PropTypes.object.isRequired };
