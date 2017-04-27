/* eslint no-underscore-dangle: "off" */

import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReactDOM from "react-dom";
import POISuggestions from '../poi/POISuggestions';

import 'styles/utils.scss';

export default class Feed extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = { user: reduxState.userStatus.userInfo };
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        this.componentIsMounted = true;

        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ user: reduxState.userStatus.userInfo });
        });

        // The same function object must be used when binding and unbinding the event listener
        this.resizeHandler = this.updateDimensions.bind(this);
        window.addEventListener("resize", this.resizeHandler);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
        this.resizeHandler = null;
        this.componentIsMounted = false;
    }

    updateDimensions() {
        if (!this.componentIsMounted || !this.feedContainer) {
            return;
        }

        this.setState({
            feedHeight: ReactDOM.findDOMNode(this.feedContainer).offsetHeight,
            feedWidth: ReactDOM.findDOMNode(this.feedContainer).offsetWidth
        });
    }

    render() {

        const feedStyle = {};
        if (this.state.feedWidth && this.state.feedHeight) {
            feedStyle.width = this.state.feedWidth;
            feedStyle.height = this.state.feedHeight;
        }

        return (
            <div className="wrapper-fill">
                <Helmet>
                    <title>#iwashere - Feed</title>
                </Helmet>

                <div className="container">
                    <Row className="show-grid">
                        <Col xs={12} mdOffset={3} md={6} lgOffset={3} lg={6}>
                            <POISuggestions user={this.state.user} router={this.props.router} style={feedStyle}
                                            ref={(node) => {
                                                if (node !== null) {
                                                    this.feedContainer = node;
                                                }
                                            }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

Feed.propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object
};

// To access Redux store
Feed.contextTypes = { store: PropTypes.object };
