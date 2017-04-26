import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { GridLoader as Loader } from 'halogen';
import InfiniteScroll from 'react-infinite-scroller';
import Tags from '../utils/MyTags';
import httpCodes from 'http-status-codes';

import 'styles/timeline.scss';

const NO_ELEMENT_SIZE = 0;
const NOT_FOUND = -1;
const LIMIT = 10;
const EMPTY = 0;

export default class POIPosts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true,
            posts: [],
            postsOffset: 0,
            tagsFilter: []
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;

        this.fetchPosts();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
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
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((newPosts) => {
            const posts = this.state.posts.slice();
            const postIds = this.state.posts.map((post) => {
                return post.postId;
            });

            newPosts.forEach((post) => {
                if (postIds.indexOf(post.postId) === NOT_FOUND) {
                    posts.push(post);
                }
            });

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
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

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

        let itemClassInverted = false;
        posts.forEach((postEntry) => {
            const date = new Date(postEntry.postDate);

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
                    : ''}`} key={postEntry.postId}>
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

        const terminator = <li key="timeline-terminator" className="clearfix" style={{ 'float': 'none' }} />;
        postsList.push(terminator);

        return postsList;
    }

    addTagFilter(tagName) {
        console.log('added', tagName);

        if (!this.componentIsMounted) {
            return;
        }

        const tagsFilter = this.state.tagsFilter.slice();
        if (tagsFilter.indexOf(tagName) !== NOT_FOUND) {
            return;
        }

        tagsFilter.push(tagName);

        this.setState({ tagsFilter });
    }

    removeTagFilter(tagName) {
        console.log(tagName);
        if (!this.componentIsMounted || !tagName) {
            return;
        }

        let { tagsFilter } = this.state;
        tagsFilter = tagsFilter.filter((tag) => {
            return tag !== tagName;
        });

        this.setState({ tagsFilter });
    }

    render() {
        let filteredPosts = this.state.posts.slice();

        if (this.state.tagsFilter.length) {
            filteredPosts = filteredPosts.filter((post) => {
                const postTagsInFilter = post.tags.filter((postTag) => {
                    return this.state.tagsFilter.indexOf(postTag.name) !== NOT_FOUND;
                });

                return postTagsInFilter.length > NO_ELEMENT_SIZE;
            });
        }

        if (filteredPosts === EMPTY) {
            return (
                <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}/>
            );
        }

        const loader =
            <div className="hor-align vert-align">
                <Loader color="#012935" className="loader"/>
            </div>;

        const tagFilter = <Tags className="tag-input"
                                tags={this.state.tagsFilter}
                                onAddTag={(tagName) => {
                                    this.addTagFilter(tagName);
                                }}
                                onRemoveTag={(tagName) => {
                                    this.removeTagFilter(tagName);
                                }}
                            />;

        return (
            <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
                <div className="vert-align hor-align filter-container">
                    <Paper className="paper-min-width" zDepth={5}>
                        <div className="filter-content">
                            {tagFilter}
                        </div>
                    </Paper>
                </div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.fetchPosts.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}
                >
                    <ul className="timeline timeline-container">
                        {this.getPosts(filteredPosts)}
                    </ul>
                </InfiniteScroll>
            </Col>
        );
    }
}

POIPosts.propTypes = {
    poiId: PropTypes.any.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
