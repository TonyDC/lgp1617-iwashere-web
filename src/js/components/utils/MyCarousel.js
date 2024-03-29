import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import { Carousel } from 'react-responsive-carousel';
import Image from './Image';
import { checkFetchResponse } from '../../functions/fetch';

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
            return checkFetchResponse(response, true);
        }).
        then((media) => {
            if (this.componentIsMounted) {
                this.setState({ media });
            }
        });
    }

    getMedia(media) {
        const mediaList = [];
        let key = 0;
        media.forEach((mediaEntry) => {
            if (mediaEntry.type === 'image;imagem') {
                mediaList.push(<div key={key++}>
                    <Image url={mediaEntry.urlM} />
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

        if (this.state.media.length === NO_ELEMENT_SIZE || !this.componentIsMounted) {
            return null;
        }

        return (
            <Carousel useKeyboardArrows autoPlay infiniteLoop
                      showArrows showThumbs={ false } showStatus={ false }
                      interval={TRANSITION_INTERVAL}>
                {this.getMedia(this.state.media)}
            </Carousel>
        );
    }
}

MyCarousel.propTypes = { url: PropTypes.string.isRequired };
