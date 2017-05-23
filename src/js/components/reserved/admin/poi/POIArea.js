import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import POISearch from './POISearch';

import ActionSearch from 'material-ui/svg-icons/action/search';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const dividerStyle = {
    marginBottom: 10,
    marginTop: 30,
    width: 'auto'
};

export default class POIArea extends Component {

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleCreatePOI(event) {
        event.preventDefault();
        this.props.router.push('/reserved/dash/poi/create');
    }

    handlePOISelection(poi) {
        const { poiId } = poi;
        this.props.router.push(`/reserved/dash/poi/${poiId}`);
    }

    render() {
        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - POI area</title>
                </Helmet>
                <div style={mainStyle}>
                        <h4>Search for an existing Point of Interest</h4>
                        <POISearch onPOISelected={ this.handlePOISelection.bind(this) }/>
                        <Divider style={dividerStyle}/>
                        <h4>or create a new Point of Interest</h4>
                        <RaisedButton label="Create POI" icon={<MapsAddLocation/>} onTouchTap={ this.handleCreatePOI.bind(this) } />
                </div>
            </Paper>
        );
    }
}

POIArea.propTypes = { router: PropTypes.object.isRequired };
