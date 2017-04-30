import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import httpCodes from 'http-status-codes';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.css';

const NO_ELEMENT_SIZE = 0;
const TRANSITION_INTERVAL = 10000;

export default class MyCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.fetchMedia();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchMedia() {
        fetch(this.props.url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST ||
                response.status === httpCodes.NO_CONTENT) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((response) => {
            if (!this.componentIsMounted) {
                return;
            }

            const media = this.getMedia(response);
            this.setState({ media });
        });
    }

    getMedia(media) {
        const mediaList = [];
        let key = 0;
        media.forEach((mediaEntry) => {
            if (mediaEntry.type === 'image;imagem') {
                mediaList.push(<div key={key++}>
                    <img src={mediaEntry.url} />
                </div>);
            } else if (mediaEntry.type === 'video;vídeo') {
                mediaList.push(<div key={key++}>
                    <iframe src={mediaEntry.url} />
                </div>);
            }
        });

        return mediaList;
    }

    render() {
        if (!this.state.media) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        if (this.state.media.length === NO_ELEMENT_SIZE) {
            return null;
        }

        return (
            <Carousel useKeyboardArrows autoPlay infiniteLoop
                      showArrows showThumbs={ false } showStatus={ false }
                      interval={TRANSITION_INTERVAL}>
                {this.state.media}
            </Carousel>
        );
    }
}

MyCarousel.propTypes = { url: PropTypes.string.isRequired };
