import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import httpCodes from 'http-status-codes';
import AutoComplete from 'material-ui/AutoComplete';

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
            this.fetchAllTags();
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
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((tagList) => {
            if (!this.componentIsMounted) {
                return;
            }

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
        let input = null;

        if (!this.props.readOnly) {
            input =
                <AutoComplete
                    hintText="Filter by tag..."
                    dataSource={this.state.allTags}
                    onUpdateInput={this.handleUpdateInput}
                    floatingLabelText="Enter a tag name"
                />;
        }

        return (
            <div>
                <div className={`tags-wrapper ${this.props.class}`}>
                    {this.props.tags.map(this.renderTag, this)}
                </div>
                {input}
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
    onAddTag: PropTypes.func,
    readOnly: PropTypes.bool.isRequired,
    tags: PropTypes.array
};
