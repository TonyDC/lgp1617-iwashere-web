import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridLoader as Loader } from 'halogen';
import POICard from './POICard';

import Error from '../utils/Error';
import Timeline from '../utils/MyTimeline';

import 'styles/poi_card.scss';
import 'styles/utils.scss';

const DECIMAL_BASE = 10;
const PLACE_TYPE = 'place;lugar';

export default class POIDetail extends Component {

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

    fetchPOIInfo() {
        if (isNaN(parseInt(this.props.params.id, DECIMAL_BASE))) {
            this.setState({ error: true });

            return;
        }

        fetch(`/api/poi/${this.props.params.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {

            console.log(response);
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
        if (this.state.error) {
            return (
                <Error errorMessage="Error while retrieving information about the point of interest." />
            );
        }

        if (this.state.loadingPOIInfo) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        let poiCard = null;
        let userMediaTimeline = null;
        if (this.props.params.id) {

            if (this.state.poiInfo) {
                poiCard = <POICard poiInfo={this.state.poiInfo} user={this.state.user} />;

                if (this.state.poiInfo.type === PLACE_TYPE) {
                    userMediaTimeline =
                        <Timeline url={`/api/post`} poiId={this.props.params.id} user={this.state.user}/>;
                }
            }
        }

        return (
            <div className="wrapper-fill">
                <Helmet>
                    <title>#iwashere</title>
                </Helmet>

                <div className="container">
                    <Row className="show-grid">

                        <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
                            {poiCard}
                        </Col>

                        {userMediaTimeline}
                    </Row>
                </div>
            </div>
        );
    }
}

POIDetail.propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object
};

// To access Redux store
POIDetail.contextTypes = { store: PropTypes.object };
