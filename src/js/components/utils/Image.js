import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {};

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
            this.setState({ error: true });
        });
    }

    render() {
        if (this.state.url) {
            return <img src={this.state.url}/>;
        }

        return <div/>;
    }
}

Image.propTypes = { url: PropTypes.string };
