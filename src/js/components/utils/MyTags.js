import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import httpCodes from 'http-status-codes';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/content/add-circle';

import 'styles/my_tags.scss';

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
        fetch('/api/tag/', {
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
        if (this.props.onRemveTag) {
            return (
                <Chip
                    onRequestDelete={() => {
                        this.props.onRemoveTag(tag.name);
                    }}
                    labelColor="white"
                    key={`tag#${tag.tagId}`}
                    className="tag-look"
                >
                    {tag.name}
                </Chip>
            );
        } else {
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

        const allTags = this.state.allTags.map((tag) => {
            return tag.name;
        });
        if (allTags.indexOf(tagName) === NOT_FOUND) {
            return;
        }

        this.setState({ filterInput: '' });
        this.props.onAddTag(tagName);
    }

    render() {
        let input = null;

        if (!this.props.readOnly) {
            const allTags = this.state.allTags.map((tag) => {
                return tag.name;
            });

            input =
                <AutoComplete
                    searchText={this.state.filterInput}
                    hintText="Filter by tag..."
                    dataSource={allTags}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    floatingLabelText="Filter by tag..."
                    onNewRequest={ (tag) => {
                        this.addTag(tag);
                    }}
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
    onRemvoTag: PropTypes.func,
    readOnly: PropTypes.bool.isRequired,
    tags: PropTypes.array
};
