import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import RouteSearch from './RouteSearch';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import EditorLinearScale from 'material-ui/svg-icons/editor/linear-scale';

import ContextSelector from '../../../utils/ContextSelector';

import 'styles/panel.scss';
import 'styles/utils.scss';

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
            <div className="colorPrimary wrapper-fill vert-align hor-align">
                <Paper className="paper-min-width main-style" zDepth={2}>
                    <Helmet>
                        <title>#iwashere - Route area</title>
                    </Helmet>
                    <div className="main-style">
                        <ContextSelector/>
                        <h4>Change an existing Route...</h4>
                        <RouteSearch onRouteSelected={ this.handleEditRoute.bind(this) } router={this.props.router} />
                        <Divider style={dividerStyle}/>
                        <h4>... or create a new Route</h4>
                        <RaisedButton label="Create Route" icon={<EditorLinearScale/>} onTouchTap={ this.handleCreateRoute.bind(this) } />
                    </div>
                </Paper>
            </div>
        );
    }
}

RouteArea.propTypes = { router: PropTypes.object.isRequired };
