import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import httpCodes from 'http-status-codes';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import InfiniteScroll from 'react-infinite-scroller';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MoreIcon from "material-ui/svg-icons/image/style";
import CancelIcon from "material-ui/svg-icons/navigation/close";
import Tags from '../utils/MyTags';
import Post from '../utils/Post';

import 'styles/timeline.scss';

const NO_ELEMENT_SIZE = 0;
const NOT_FOUND = -1;
const LIMIT = 10;

export default class POIPosts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filtering: false,
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

            if (response.status >= httpCodes.NO_CONTENT) {
                if (this.state.componentIsMounted) {
                    this.setState({ hasMoreItems: false });
                }

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
            postsList.push(
                <Post post={postEntry}
                      inverted={itemClassInverted}
                      onLike={() => {
                          this.toggleLike(postEntry.postId);
                      }}/>
            );

            itemClassInverted = !itemClassInverted;
        });

        const terminator = <li key="timeline-terminator" className="clearfix" style={{ 'float': 'none' }} />;
        postsList.push(terminator);

        return postsList;
    }

    addTagFilter(tagName) {
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
        if (!this.componentIsMounted) {
            return;
        }

        let { tagsFilter } = this.state;
        tagsFilter = tagsFilter.filter((tag) => {
            return tag !== tagName;
        });

        this.setState({
            filtering: tagsFilter.length > NO_ELEMENT_SIZE,
            tagsFilter
        });
    }

    toggleFiltering() {
        if (!this.componentIsMounted) {
            return;
        }

        if (this.state.filtering) {
            this.setState({
                filtering: false,
                tagsFilter: []
            });
        } else {
            this.setState({ filtering: true });
        }
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

        const filterIcon = this.state.filtering
                            ? <CancelIcon/>
                            : <MoreIcon/>;
        const toggleTagFilterButton =
            <div className="filter-button-container">
                <FloatingActionButton backgroundColor="#012935"
                                      onTouchTap={this.toggleFiltering.bind(this)}>
                    {filterIcon}
                </FloatingActionButton>
            </div>;

        const loader =
            <div className="hor-align vert-align">
                <Loader color="#012935" className="loader"/>
            </div>;

        let tagFilter =
            <div className="filter-container">
                <Paper className="paper-min-width" zDepth={4}>
                    <div className="filter-content">
                        <Tags className="tag-input"
                              tags={this.state.tagsFilter}
                              onAddTag={(tagName) => {
                                  this.addTagFilter(tagName);
                              }}
                              onRemoveTag={(tagName) => {
                                  this.removeTagFilter(tagName);
                              }}
                        />
                    </div>
                </Paper>
            </div>;

        if (!this.state.filtering) {
            tagFilter = null;
        }

        if (filteredPosts.length === NO_ELEMENT_SIZE) {
            if (this.state.tagsFilter.length === NO_ELEMENT_SIZE) {
                tagFilter = null;
            }

            return (
                <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                    {tagFilter}
                </Col>
            );
        }

        return (
            <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
                {toggleTagFilterButton}
                {tagFilter}
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
