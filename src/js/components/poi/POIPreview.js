import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import RaisedButton from 'material-ui/RaisedButton';

import Alerts from '../utils/Alerts';
import Rater from '../utils/MyRater';
import Carousel from '../utils/MyCarousel';
import Tags from '../utils/MyTags';

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

    closePoiPreview() {
        this.props.onClose();
    }

    fetchPOIInfo() {
        if (isNaN(parseInt(this.props.poiId, DECIMAL_BASE))) {
            Alerts.createErrorAlert("Unable to find the point of interest.");

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
            Alerts.createErrorAlert("Unable to find the point of interest.");
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

        let poiMediaSlider = null;
        let poiTagsPanel = null;
        let ratingPanel = null;
        if (this.props.poiId) {
            poiMediaSlider = <Carousel url={`/api/poi/media/${this.props.poiId}`} />;
            ratingPanel = <Rater url="/api/poi/rating" poiId={this.props.poiId} user={this.state.user}/>;

            if (this.state.poiInfo) {
                poiTagsPanel = <Tags readOnly tags={this.state.poiInfo.tags} />;
            }
        }

        return (
            <div className="wrapper-fill">
                <div className="thumbnail">
                    { poiMediaSlider }

                    <div className="caption-full">
                        <h4>{this.state.poiInfo.name}</h4>
                        {poiTagsPanel}
                        <h5>{this.state.poiInfo.address}</h5>
                        <p>{this.state.poiInfo.description}</p>
                    </div>
                    {ratingPanel}

                    <div className="poi-detail-buttons">
                        <RaisedButton
                            className="poi-detail-button" backgroundColor="#39A8E0"
                            label="View more"
                            onTouchTap={this.viewPoiDetail.bind(this)}
                        />

                        <RaisedButton
                            className="poi-detail-button" backgroundColor="#39A8E0"
                            label="Close"
                            onTouchTap={this.props.onClose}
                        />
                    </div>
                </div>

            </div>
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
