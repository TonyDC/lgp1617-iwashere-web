import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import RaisedButton from 'material-ui/RaisedButton';
import POICard from './POICard';

import Alerts from '../utils/Alerts';

import 'styles/utils.scss';
import 'styles/poi_detail_side.scss';

const DECIMAL_BASE = 10;

export default class POIPreview extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = {
            loadingPOIInfo: true,
            user: reduxState.userStatus.userInfo
        };
    }

    componentDidMount() {
        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            this.setState({ user: reduxState.userStatus.userInfo });
        });

        this.fetchPOIInfo();
    }

    componentWillUnmount() {
        this.reduxListenerUnsubscribe();
    }

    viewPoiDetail() {
        this.props.router.push(`/poi/${this.props.poiId}`);
    }

    fetchPOIInfo() {
        if (isNaN(parseInt(this.props.poiId, DECIMAL_BASE))) {
            this.setState({ error: true });

            return;
        }

        fetch(`/api/poi/${this.props.poiId}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            this.setState({
                loadingPOIInfo: false,
                poiInfo: response
            });
        }).
        catch(() => {
            this.setState({ error: true });
        });
    }

    render() {
        if (this.state.loadingPOIInfo) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        const closeButton =
            <RaisedButton
                className="poi-detail-button" backgroundColor="#39A8E0"
                label="Close"
                onTouchTap={this.props.onClose}
            />;

        if (this.state.error) {
            return (
                <Error errorMessage="Error while retrieving information about the point of interest." children={[closeButton]}/>
            );
        }

        const poiPreviewButtons =
            <div className="poi-detail-buttons">
                <RaisedButton
                    className="poi-detail-button" backgroundColor="#39A8E0"
                    label="View more"
                    onTouchTap={this.viewPoiDetail.bind(this)}
                />

                {closeButton}
            </div>;

        return (
            <POICard poiInfo={this.state.poiInfo} user={this.state.user} additionalElements={poiPreviewButtons} />
        );
    }
}

POIPreview.propTypes = {
    history: PropTypes.object,
    onClose: PropTypes.any,
    poiId: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired
};

// To access Redux store
POIPreview.contextTypes = { store: PropTypes.object };
