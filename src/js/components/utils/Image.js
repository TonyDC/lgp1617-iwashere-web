import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';

import 'styles/utils.scss';

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = { imageStatus: false };

        // Create a reference with an initial file path and name
        this.storage = firebase.storage();
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.handleImageDownload();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleImageLoaded() {
        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ imageStatus: true });
    }

    handleImageErrored() {
        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ error: true });
    }

    handleImageDownload() {
        if (!this.props.url) {
            return;
        }

        // Create a reference from an HTTPS URL
        // Note that in the URL, characters are URL escaped!
        this.storage.refFromURL(`gs://iwashere-mobile.appspot.com/${this.props.url}`).getDownloadURL().
        then((url) => {
            if (this.componentIsMounted) {
                this.setState({ url });
            }
        }).
        catch(() => {
            if (this.componentIsMounted) {
                this.setState({ error: true });
            }
        });
    }

    render() {
        const { url: propsURL, style, className, withLoader } = this.props;
        const additionalProps = {
            className,
            style
        };
        const { url: stateURL, imageStatus, error } = this.state;
        let loader = null;
        if (withLoader) {
            if (error) {
                loader = <i className="fa fa-exclamation-triangle" aria-hidden="true"/>;
            } else if (!imageStatus) {
                loader = <Loader color="#012935" className="loader"/>;
            }
        }

        if (propsURL) {
            return (
                <span>
                    { stateURL && !error &&
                    <img src={stateURL}
                         {...additionalProps}
                         onLoad={this.handleImageLoaded.bind(this)}
                         onError={this.handleImageErrored.bind(this)}/>
                    }
                    { loader }
                </span>
            );
        }

        return <div {...additionalProps} />;
    }
}

Image.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    url: PropTypes.string,
    withLoader: PropTypes.bool
};
