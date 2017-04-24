import { Component } from 'react';
// import React, { Component } from 'react';
// import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';

export default class MyTags extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allTags: [],
            tags: []
        };
    }

    componentDidMount() {
        if (!this.props.readOnly) {
            this.fetchTags();
        }
    }

    fetchTags() {
        fetch('/api/tags/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((allTags) => {
            this.setState({ allTags });
        });
    }

    /*
    handleChange(tags) {
        this.setState({tags});
    } */

    render() {
        return null;

        // return <TagsInput value={this.state.tags} onChange={this.handleChange} />;
    }
}


MyTags.defaultProps = { readOnly: false };

MyTags.propTypes = {
    readOnly: PropTypes.any.isRequired,
    tags: PropTypes.any.isRequired
};
