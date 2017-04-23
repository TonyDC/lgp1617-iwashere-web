import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { GridLoader as Loader } from 'halogen';
import InfiniteScroll from 'react-infinite-scroller';

import 'styles/timeline.scss';

const LIMIT = 10;
const EMPTY = 0;

export default class MyTimeline extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true,
            posts: [],
            postsOffset: 0
        };
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        if (!this.state.hasMoreItems) {
            return;
        }

        fetch(`${this.props.url}/${this.state.postsOffset}/${LIMIT}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            const newPosts = this.getPosts(response);
            const posts = this.state.posts.concat(newPosts);
            const postsOffset = this.state.postsOffset + newPosts.length;

            this.setState({
                hasMoreItems: newPosts.length === LIMIT,
                posts,
                postsOffset
            });
        });
    }

    getPosts(posts) {
        const postsList = [];

        let itemClassInverted = false;
        let previousTimeStamp = null;
        let key = 0;
        posts.forEach((postEntry) => {
            const date = new Date(postEntry.createdAt);

            if (date.getMonth() !== previousTimeStamp) {
                previousTimeStamp = date.getMonth();
                postsList.push(<li key={key++}><div className="tldate">{ Moment(date).format("MMM") } { date.getFullYear()} </div></li>);
            }

            let postComponent = null;
            if (postEntry.type === "IMG") {
                postComponent = <img src={ postEntry.url }/>;
            } else if (postEntry.type === "VID") {
                postComponent = <iframe src={ postEntry.url }/>;
            }

            let tagList = null;
            if (postEntry.tags.length) {
                const tags = [];

                postEntry.tags.forEach((tag) => {
                    tags.push(` ${tag.name} `);
                });

                tagList = <p><small className="text-muted"><i className="glyphicon glyphicon-tag"/>{tags}</small></p>;
            }

            postsList.push(
                <li className={`timeline${itemClassInverted
                    ? '-inverted'
                    : ''}`} key={key++}>
                    <div className="tl-circ" />
                    <div className="timeline-panel">
                        <div className="tl-heading">
                            <p><small className="text-muted pull-right"><i className="glyphicon glyphicon-time"/> { Moment(date).format('MMMM Do YYYY, h:mm') }</small></p>
                            {tagList}
                        </div>
                        <div className="tl-body">
                            {postComponent}

                            <p>{postEntry.description}</p>
                        </div>
                    </div>
                </li>
            );

            itemClassInverted = !itemClassInverted;
        });

        return postsList;
    }

    render() {
        if (this.state.posts.length === EMPTY) {
            return (
                <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}/>
            );
        }

        const loader =
            <div className="hor-align vert-align">
                <Loader color="#012935" className="loader"/>
            </div>;

        return (
            <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.fetchPosts.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}
                >
                    <ul className="timeline">
                        {this.state.posts}
                    </ul>
                </InfiniteScroll>
            </Col>
        );
    }
}

MyTimeline.propTypes = {
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
