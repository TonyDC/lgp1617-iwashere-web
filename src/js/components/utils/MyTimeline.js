import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { GridLoader as Loader } from 'halogen';
import InfiniteScroll from 'react-infinite-scroller';
import Tags from './MyTags';

import 'styles/timeline.scss';

const LIMIT = 10;
const EMPTY = 0;

export default class MyTimeline extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true,
            lastKey: 0,
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

        fetch(`${this.props.url}/poi_posts/${this.props.poiId}/${this.state.postsOffset}/${LIMIT}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            const newPosts = this.getPosts(response);
            let posts = this.state.posts.slice();
            posts.pop();
            posts = posts.concat(newPosts);
            const postsOffset = this.state.postsOffset + newPosts.length;

            this.setState({
                hasMoreItems: newPosts.length === LIMIT,
                posts,
                postsOffset
            });
        });
    }

    toggleLike(postId) {
        let post = null;

        this.state.posts.forEach((postTemp) => {
            if (postTemp.postId === postId) {
                post = postTemp;
            }
        });

        fetch(`${this.props.url}/like`, {
            body: JSON.stringify({
                liked: post.liked,
                postID: postId,
                userID: this.props.user.uid
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            if (!response.ok) {
                return;
            }

            const { posts } = this.state.posts;

            posts.forEach((postTemp) => {
                if (postTemp.postId === postId) {
                    postTemp.liked = !postTemp.liked;
                }
            });

            this.setState({ posts });
        });
    }

    getPosts(posts) {
        const postsList = [];

        if (!posts || !posts.length) {
            return postsList;
        }

        let { lastKey } = this.state;
        let itemClassInverted = false;
        posts.forEach((postEntry) => {
            const date = new Date(postEntry.postDate);
            console.log(postEntry);

            let mediaComponent = null;
            if (postEntry.type === "image;imagem") {
                mediaComponent = <img src={ postEntry.url }/>;
            } else if (postEntry.type === "video;vídeo") {
                mediaComponent = <iframe src={ postEntry.url }/>;
            }

            let tagList = null;
            if (postEntry.tags.length) {
                tagList = <Tags readOnly tags={postEntry.tags} class="post-tags"/>;
            }

            postsList.push(
                <li id={`post#${postEntry.postId}`} className={`${itemClassInverted
                    ? 'timeline-inverted'
                    : ''}`} key={lastKey++}>
                    <div className="timeline-badge primary" />

                    <div className="timeline-panel">
                        <div className="timeline-heading">
                            {mediaComponent}
                        </div>

                        <div className="timeline-body">
                            <p>{postEntry.description}</p>
                        </div>

                        <div className="timeline-footer">
                            {tagList}
                            <small className="text-muted"><i className="glyphicon glyphicon-time"/> { Moment(date).format('MMMM Do YYYY, h:mm') }</small>
                            <a className="pull-right">{postEntry.likes} <i className="glyphicon glyphicon-thumbs-up"/></a>
                        </div>
                    </div>
                </li>
            );

            itemClassInverted = !itemClassInverted;
        });

        const terminator = <li key={lastKey++} className="clearfix" style={{ 'float': 'none' }} />;
        postsList.push(terminator);

        this.setState({ lastKey });

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
            <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.fetchPosts.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}
                >
                    <ul className="timeline timeline-container">
                        {this.state.posts}
                    </ul>
                </InfiniteScroll>
            </Col>
        );
    }
}

MyTimeline.propTypes = {
    poiId: PropTypes.any.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
