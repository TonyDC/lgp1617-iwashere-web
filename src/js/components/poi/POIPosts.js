import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import httpCodes from 'http-status-codes';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import InfiniteScroll from 'react-infinite-scroller';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MoreIcon from "material-ui/svg-icons/image/style";
import CancelIcon from "material-ui/svg-icons/navigation/close";
import Tags from '../utils/MyTags';
import Post from '../utils/Post';
import Alerts from '../utils/Alerts';

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
            tagsFilter: [],
            user: null
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        firebase.auth().onAuthStateChanged((user) => {
            if (this.componentIsMounted) {
                this.setState({ user }, () => {
                    this.fetchPosts();
                });
            }
        });
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchPosts() {
        if (!this.state.hasMoreItems) {
            return;
        }

        let url = `${this.props.url}/poi_posts/`;
        if (this.state.user) {
            url += `${this.state.user.uid}/`;
        }
        url += `${this.props.poiId}/${this.state.postsOffset}/${LIMIT}`;

        fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            if (response.status === httpCodes.NO_CONTENT) {
                if (this.componentIsMounted) {
                    this.setState({ hasMoreItems: false });
                }

                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((newPosts) => {
            const posts = this.state.posts.slice();
            const postIds = posts.map((post) => {
                return post.postId;
            });

            newPosts.forEach((post) => {
                if (postIds.indexOf(post.postId) === NOT_FOUND) {
                    posts.push(post);
                }
            });
            const postsOffset = this.state.postsOffset + newPosts.length;

            if (this.componentIsMounted) {
                this.setState({
                    hasMoreItems: newPosts.length === LIMIT,
                    posts,
                    postsOffset
                });
            }
        });
    }

    toggleLike(post) {
        if (!this.state.user) {
            return;
        }

        firebase.auth().currentUser.getToken().then((token) => {
            return fetch(`${this.props.url}/auth/like`, {
                body: JSON.stringify({
                    liked: !post.likedByUser,
                    postID: post.postId
                }),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((response) => {
            const { posts } = this.state;
            const postIndex = posts.indexOf(post);

            if (postIndex === NOT_FOUND) {
                return;
            }

            post.likedByUser = !post.likedByUser;
            post.likes = response.likes;
            posts[postIndex] = post;

            if (this.componentIsMounted) {
                this.setState({ posts });
            }
        }).
        catch(() => {
            Alerts.createErrorAlert('Error submitting the like.');
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
                          this.toggleLike(postEntry);
                      }}
                      key={postEntry.postId}/>
            );
            itemClassInverted = !itemClassInverted;
        });
        postsList.push(<li key="timeline-terminator" className="clearfix" style={{ 'float': 'none' }} />);

        return postsList;
    }

    addTagFilter(tagId) {
        if (!this.componentIsMounted) {
            return;
        }
        const tagsFilter = this.state.tagsFilter.slice();
        if (tagsFilter.indexOf(tagId) !== NOT_FOUND) {
            return;
        }
        tagsFilter.push(tagId);
        this.setState({ tagsFilter });
    }

    removeTagFilter(tagId) {
        let { tagsFilter } = this.state;
        tagsFilter = tagsFilter.filter((tag) => {
            return tag !== tagId;
        });
        if (this.componentIsMounted) {
            this.setState({
                filtering: tagsFilter.length > NO_ELEMENT_SIZE,
                tagsFilter
            });
        }
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
                    return this.state.tagsFilter.indexOf(postTag.tagId) !== NOT_FOUND;
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
                              class="tag-filter"
                              title="Filter by tag..."
                              tags={this.state.tagsFilter}
                              onAddTag={(tagId) => {
                                  this.addTagFilter(tagId);
                              }}
                              onRemoveTag={(tagId) => {
                                  this.removeTagFilter(tagId);
                              }}/>
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
                <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}> {toggleTagFilterButton} {tagFilter} </Col>
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
                    loader={loader}>
                    <ul className="timeline timeline-container">
                        {this.getPosts(filteredPosts)}
                    </ul>
                </InfiniteScroll>
            </Col>
        );
    }
}

POIPosts.propTypes = {
    poiId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.object
};

// To access Redux store
POIPosts.contextTypes = { store: PropTypes.object };
