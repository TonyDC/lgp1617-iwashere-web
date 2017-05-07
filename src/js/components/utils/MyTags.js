import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import httpCodes from 'http-status-codes';
import AutoComplete from 'material-ui/AutoComplete';

import 'styles/my_tags.scss';

const API_TAG = '/api/tag/';
const NOT_FOUND = -1;

export default class MyTags extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allTags: [],
            filterInput: '',
            tags: []
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        if (!this.props.readOnly) {
            this.fetchAllTags();
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchAllTags() {
        fetch(API_TAG, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((allTags) => {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ allTags });
        });
    }

    renderTag(tag) {
        if ('onRemoveTag' in this.props) {
            return (
                <Chip
                    onRequestDelete={() => {
                        this.props.onRemoveTag(tag.tagId);
                    }}
                    labelColor="white"
                    key={`tag#${tag.tagId}`}
                    className="tag-look"
                >
                    {tag.name}
                </Chip>
            );
        }

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

    handleUpdateInput(filterInput) {
        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ filterInput });
    }

    addTag(tagName) {
        if (!this.componentIsMounted) {
            return;
        }

        let tagId = NOT_FOUND;
        this.state.allTags.forEach((tag) => {
            if (tag.name === tagName) {
                ({ tagId } = tag);
            }
        });

        if (tagId === NOT_FOUND) {
            return;
        }

        this.setState({ filterInput: '' });
        this.props.onAddTag(tagId, tagName);
    }

    render() {
        let input = null;
        let tagList = this.props.tags.map(this.renderTag, this);

        if (!this.props.readOnly) {
            const allTags = this.state.allTags.map((tag) => {
                return tag.name;
            });

            input =
                <AutoComplete
                    searchText={this.state.filterInput}
                    hintText={this.props.title}
                    dataSource={allTags}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    floatingLabelText={this.props.title}
                    onNewRequest={ (tag) => {
                        this.addTag(tag);
                    }}
                />;

            tagList = this.state.allTags.filter((tag) => {
                return this.props.tags.indexOf(tag.tagId) !== NOT_FOUND;
            });

            tagList = tagList.map(this.renderTag, this);
        }

        return (
            <div className="tag-list-wrapper">
                {input}
                <div className={`tags-wrapper ${this.props.class}`}>
                    { tagList }
                </div>
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
    onRemoveTag: PropTypes.func,
    readOnly: PropTypes.bool.isRequired,
    tags: PropTypes.array,
    title: PropTypes.string
};
