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
import ViewPost from "../utils/ViewPost";
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
        firebase.auth().onAuthStateChanged((user) => {
            if (this.componentIsMounted) {
                this.setState({ user }, () => {
                    this.fetchPosts();
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost && this.props.newPost !== nextProps.newPost && this.componentIsMounted) {
            const posts = this.state.posts.slice();
            const postIds = posts.map((post) => {
                return post.postId;
            });
            if (postIds.indexOf(nextProps.newPost.postId) === NOT_FOUND) {
                posts.unshift(nextProps.newPost);
            }
            this.setState({ posts });
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchPosts() {
        if (this.state.hasMoreItems) {
            let url = `${this.props.url}/poi_posts/`;
            if (this.state.user) {
                url += `${this.state.user.uid}/`;
            }
            url += `${this.props.poiId}/${this.state.postsOffset}/${LIMIT}`;

            fetch(url, {
                headers: { 'Accept': 'application/json' },
                method: 'GET'
            }).then((response) => {
                if (response.status === httpCodes.NO_CONTENT) {
                    if (this.componentIsMounted) {
                        this.setState({ hasMoreItems: false });
                    }

                } else if (response.status >= httpCodes.BAD_REQUEST) {
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
    }

    getTimelinePosts(posts) {
        const postsList = [];
        let itemClassInverted = false;
        posts.forEach((postEntry) => {
            postsList.push(
                <Post post={postEntry}
                      user={this.props.user}
                      inverted={itemClassInverted}
                      onClick={this.openPostView.bind(this)}
                      onDelete={this.handlePostDelete.bind(this)}
                      onToggleLike={this.handlePostLike.bind(this)}
                      key={postEntry.postId}/>
            );
            itemClassInverted = !itemClassInverted;
        });
        postsList.push(<li key="timeline-terminator" className="clearfix" style={{ 'float': 'none' }} />);

        return postsList;
    }

    handlePostLike(post) {
        if (this.componentIsMounted) {
            const { posts } = this.state;
            const postIndex = posts.indexOf(post);
            if (postIndex !== NOT_FOUND) {
                posts[postIndex] = post;
            }
            this.setState({ posts });
        }
    }

    handlePostDelete(post) {
        if (this.componentIsMounted) {
            const posts = this.state.posts.filter((postEntry) => {
                return postEntry.postId !== post.postId;
            });
            this.setState({
                postSelected: null,
                posts
            });
        }
    }

    openPostView(postSelected) {
        if (this.componentIsMounted) {
            this.setState({ postSelected });
        }
    }

    closePostView() {
        if (this.componentIsMounted) {
            this.setState({ postSelected: null });
        }
    }

    getPostView() {
        if (this.state.postSelected) {
            return <ViewPost post={this.state.postSelected}
                             onClose={this.closePostView.bind(this)}
                             onDelete={this.handlePostDelete.bind(this)}
                             onToggleLike={this.handlePostLike.bind(this)}
                             user={this.state.user}/>;
        }

        return null;
    }

    addTagFilter(tagId) {
        if (this.componentIsMounted) {
            const tagsFilter = this.state.tagsFilter.slice();
            if (tagsFilter.indexOf(tagId) === NOT_FOUND) {
                tagsFilter.push(tagId);
                this.setState({ tagsFilter });
            }
        }
    }

    removeTagFilter(tagId) {
        if (this.componentIsMounted) {
            const tagsFilter = this.state.tagsFilter.filter((tag) => {
                return tag !== tagId;
            });
            this.setState({ tagsFilter });
        }
    }

    toggleFiltering() {
        if (this.componentIsMounted) {
            if (this.state.filtering) {
                this.setState({
                    filtering: false,
                    tagsFilter: []
                });
            } else {
                this.setState({ filtering: true });
            }
        }
    }

    render() {
        let filteredPosts = this.state.posts.slice();
        if (this.state.tagsFilter.length) {
            filteredPosts = filteredPosts.filter((post) => {
                return post.tags.filter((postTag) => {
                    return this.state.tagsFilter.indexOf(postTag.tagId) !== NOT_FOUND;
                }).length > NO_ELEMENT_SIZE;
            });
        }

        const filterIcon = this.state.filtering
            ? <CancelIcon/>
            : <MoreIcon/>;
        const toggleTagFilterButton = Array.isArray(this.state.posts) && this.state.posts.length > NO_ELEMENT_SIZE
            ? (<div className="filter-button-container">
                <FloatingActionButton backgroundColor="#012935" onTouchTap={this.toggleFiltering.bind(this)}>
                    {filterIcon}
                </FloatingActionButton>
            </div>)
            : null;

        const loader =
            <div className="hor-align vert-align">
                <Loader color="#012935" className="loader"/>
            </div>;

        let tagFilter = null;
        if (this.state.filtering) {
            tagFilter =
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
        }

        if (filteredPosts.length === NO_ELEMENT_SIZE) {
            if (this.state.tagsFilter.length === NO_ELEMENT_SIZE) {
                tagFilter = null;
            }

            return <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}> {toggleTagFilterButton} {tagFilter} </Col>;
        }

        return <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
            {this.getPostView()}
            {toggleTagFilterButton}
            {tagFilter}
            <InfiniteScroll pageStart={0} loadMore={this.fetchPosts.bind(this)} hasMore={this.state.hasMoreItems} loader={loader}>
                <ul className="timeline timeline-container">
                    {this.getTimelinePosts(filteredPosts)}
                </ul>
            </InfiniteScroll>
        </Col>;
    }
}

POIPosts.propTypes = {
    newPost: PropTypes.object,
    poiId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.object
};

// To access Redux store
POIPosts.contextTypes = { store: PropTypes.object };
