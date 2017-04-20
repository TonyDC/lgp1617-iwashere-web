import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'moment';

import 'styles/timeline.scss';

const LIMIT = 6;
const EMPTY = 0;

export default class MyTimeline extends Component {

    constructor(props) {
        super(props);

        this.state = {
            media: [],
            mediaOffset: 0
        };
    }

    componentDidMount() {
        this.fetchMedia();
    }

    fetchMedia() {
        fetch(this.props.url, {
            body: {
                limit: LIMIT,
                offset: this.state.userMediaOffset
            },
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            console.log(response);

            const media = this.state.media.concat(this.getMedia(response));

            const mediaOffset = this.state.mediaOffset + LIMIT;

            this.setState({
                media,
                mediaOffset
            });
        });
    }

    getMedia(media) {
        const mediaList = [];

        let itemClassInverted = false;
        let previousTimeStamp = null;
        let key = 0;
        media.forEach((mediaEntry) => {
            const date = new Date(mediaEntry.time);

            if (date.getMonth() !== previousTimeStamp) {
                previousTimeStamp = date.getMonth();
                mediaList.push(<li key={key++}><div className="tldate">{ Moment(date).format("MMM") } { date.getFullYear()} </div></li>);
            }

            mediaList.push(
                <li className={`timeline${itemClassInverted
                    ? '-inverted'
                    : ''}`} key={key++}>
                    <div className="tl-circ" />
                    <div className="timeline-panel">
                        <div className="tl-heading">
                            <p><small className="text-muted"><i className="glyphicon glyphicon-time"/> { mediaEntry.time }</small></p>
                        </div>
                        <div className="tl-body">
                            <p><img src={ mediaEntry.url }/></p>
                        </div>
                    </div>
                </li>
            );

            itemClassInverted = !itemClassInverted;
        });

        return mediaList;
    }

    render() {
        if (this.state.media.length === EMPTY) {
            return (
                <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}/>
            );
        }

        return (
            <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                <ul className="timeline">
                    {this.state.media}
                </ul>
            </Col>
        );
    }
}

MyTimeline.propTypes = {
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
