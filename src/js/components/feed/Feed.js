import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import POISuggestions from '../poi/POISuggestions';

import 'styles/utils.scss';

const MINIMUM_WINDOW_SIZE = 700;

export default class FeedSideBar extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = {
            poisStyle: {},
            user: reduxState.userStatus.userInfo
        };
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

        this.resizeHandler = this.updateDimensions.bind(this);
        window.addEventListener("resize", this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
        this.resizeHandler = null;
        this.componentIsMounted = false;
    }

    updateDimensions() {
        let size = '30%';

        if (window.innerWidth < MINIMUM_WINDOW_SIZE) {
            size = '100%';
        }

        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ size });
    }

    render() {
        return (
        <div className="wrapper-fill">
            <Helmet>
                <title>#iwashere - Feed</title>
            </Helmet>

            <div className="container">
                <Row className="show-grid">
                    <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
                        <POISuggestions user={this.state.user} router={this.props.router}/>
                    </Col>
                </Row>
            </div>
        </div>
        );
    }
}

FeedSideBar.propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object
};

// To access Redux store
FeedSideBar.contextTypes = { store: PropTypes.object };
