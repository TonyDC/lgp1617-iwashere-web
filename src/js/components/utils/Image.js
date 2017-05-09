import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        // Create a reference with an initial file path and name
        this.storage = firebase.storage();
        this.handleImageDownload();
    }

    handleImageDownload() {
        // Create a reference from an HTTPS URL
        // Note that in the URL, characters are URL escaped!
        this.storage.refFromURL(this.props.url).getDownloadURL().then((url) => {
            this.setState({ url });
        }).
        catch((error) => {
            console.error(error);
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

Image.propTypes = { url: PropTypes.string.isRequired };
