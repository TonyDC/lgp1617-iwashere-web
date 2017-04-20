import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

const TRANSITION_INTERVAL = 10000;

export default class MyCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.fetchMedia();
    }

    fetchMedia() {
        fetch(this.props.url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {

            console.log(response);

            const media = this.getMedia(response);

            this.setState({ media });
        });
    }

    getMedia(media) {
        const mediaList = [];
        let key = 0;
        media.forEach((mediaEntry) => {
            if (mediaEntry.type === 'IMG') {
                mediaList.push(<div key={key++}>
                    <img src={mediaEntry.url} />
                </div>);
            } else if (mediaEntry.type === 'VID') {
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
