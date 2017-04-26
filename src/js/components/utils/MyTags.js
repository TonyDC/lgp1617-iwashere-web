import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

import 'styles/my_tags.scss';

const ZERO_INDEX = 0;

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
            // this.fetchAllTags();
        }
    }

    parseTags(tagList) {
        const newTagList = tagList.slice();

        let key = ZERO_INDEX;
        newTagList.forEach((tag) => {
            tag.key = key++;
        });

        return newTagList;
    }

    fetchAllTags() {
        fetch('/api/tags/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((tagList) => {
            const allTags = this.parseTags(tagList);
            this.setState({ allTags });
        });
    }

    handleTagDelete(key) {
        const tags = this.state.tags.slice();

        tags.filter((tag) => {
            return tag.key !== key;
        });

        this.props.tags = tags;
    }

    renderTag(tag) {
        return (
            <Chip
                labelColor="white"
                key={`tag#${tag.tagId}`}
                className="tag-look"
            >
                {tag.name}
            </Chip>
        );
    }

    render() {
        return (
            <div className={`tags-wrapper ${this.props.class}`}>
                {this.props.tags.map(this.renderTag, this)}
            </div>
        );
    }
}


MyTags.defaultProps = {
    class: '',
    readOnly: false,
    tags: []
};

MyTags.propTypes = {
    class: PropTypes.string,
    readOnly: PropTypes.bool.isRequired,
    tags: PropTypes.any.isRequired
};
