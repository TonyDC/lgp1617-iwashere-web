/* eslint no-underscore-dangle: "off" */

import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import PostSuggestions from './PostFeed';

import 'styles/utils.scss';

export default class Feed extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = { user: reduxState.userStatus.userInfo };
    }

    componentDidMount() {
        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ user: reduxState.userStatus.userInfo });
        });
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    render() {
        return (
            <div className="colorAccentSecondary wrapper-fill">
                <Helmet>
                    <title>#iwashere - Feed</title>
                </Helmet>

                <div className="container">
                    <Row className="show-grid">
                        <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                            <PostSuggestions user={this.state.user} router={this.props.router}/>
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
