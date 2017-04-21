import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { GridLoader as Loader } from 'halogen';
import InfiniteScroll from 'react-infinite-scroller';

import 'styles/timeline.scss';

const LIMIT = 10;
const EMPTY = 0;

export default class MyTimeline extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true,
            media: [],
            mediaOffset: 0
        };
    }

    componentDidMount() {
        this.fetchMedia();
    }

    fetchMedia() {
        console.log('ll');
        if (!this.state.hasMoreItems) {
            return;
        }

        fetch(`${this.props.url}/${this.state.mediaOffset}/${LIMIT}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            const newMedia = this.getMedia(response);
            const media = this.state.media.concat(newMedia);
            const mediaOffset = this.state.mediaOffset + newMedia.length;

            this.setState({
                hasMoreItems: newMedia.length === LIMIT,
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
            const date = new Date(mediaEntry.createdAt);

            if (date.getMonth() !== previousTimeStamp) {
                previousTimeStamp = date.getMonth();
                mediaList.push(<li key={key++}><div className="tldate">{ Moment(date).format("MMM") } { date.getFullYear()} </div></li>);
            }

            let mediaComponent = null;
            if (mediaEntry.type === "IMG") {
                mediaComponent = <img src={ mediaEntry.url }/>;
            } else if (mediaEntry.type === "VID") {
                mediaComponent = <iframe src={ mediaEntry.url }/>;
            }

            mediaList.push(
                <li className={`timeline${itemClassInverted
                    ? '-inverted'
                    : ''}`} key={key++}>
                    <div className="tl-circ" />
                    <div className="timeline-panel">
                        <div className="tl-heading">
                            <p><small className="text-muted pull-right"><i className="glyphicon glyphicon-time"/> { Moment(date).format('MMMM Do YYYY, h:mm') }</small></p>
                            <p><small className="text-muted"><i className="glyphicon glyphicon-tag"/> { mediaEntry.tags }</small></p>
                        </div>
                        <div className="tl-body">
                            {mediaComponent}

                            <p>{mediaEntry.description}</p>
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

        const loader =
            <div className="hor-align vert-align">
                <Loader color="#012935" className="loader"/>
            </div>;

        return (
            <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.fetchMedia.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}
                >
                    <ul className="timeline">
                        {this.state.media}
                    </ul>
                </InfiniteScroll>
            </Col>
        );
    }
}

MyTimeline.propTypes = {
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
