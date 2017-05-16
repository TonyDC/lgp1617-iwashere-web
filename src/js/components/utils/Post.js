/* eslint no-underscore-dangle: "off" */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import * as firebase from 'firebase';
import Moment from 'moment';

import Alerts from '../utils/Alerts';
import Tags from './MyTags';
import Image from './Image';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import LikeIcon from "material-ui/svg-icons/action/thumb-up";

import 'styles/timeline.scss';

const API_POST = '/api/post/auth';
const API_LIKE_POST = `${API_POST}/like`;

const IMAGE_TYPE = "image;imagem";
const VIDEO_TYPE = "video;vídeo";

const likeButtonStyle = {
    disabled: {
        color: 'grey',
        height: 25,
        width: 25
    },
    liked: {
        color: '#012935',
        height: 25,
        width: 25
    }
};

const likeButtonSize = {
    height: 40,
    width: 40
};

export default class Post extends Component {

    setDeleted(post) {
        if (this.props.user) {
            const url = `${API_POST}/${post.postId}`;
            firebase.auth().currentUser.getToken().then((token) => {
                return fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'DELETE'
                });
            }).
            then((response) => {
                if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                    return Promise.reject(new Error(response.statusText));
                }

                return response.json();
            }).
            then(() => {
                if (typeof this.props.onDelete !== 'undefined') {
                    this.props.onDelete(post);
                }
            }).
            catch(() => {
                Alerts.createErrorAlert('Error deleting the post.');
            });
        }
    }

    toggleLike(post) {
        if (this.props.user) {
            firebase.auth().currentUser.getToken().then((token) => {
                return fetch(API_LIKE_POST, {
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
                post.likedByUser = !post.likedByUser;
                post.likes = response.likes;

                if (typeof this.props.onToggleLike !== 'undefined') {
                    this.props.onToggleLike(post);
                }
            }).
            catch(() => {
                Alerts.createErrorAlert('Error submitting the like.');
            });
        }
    }

    getPostDisplay(post) {
        const date = new Date(post.postDate);

        let mediaComponent = null;
        if (post.type === IMAGE_TYPE) {
            mediaComponent = <Image url={ post.urlM }/>;
        } else if (post.type === VIDEO_TYPE) {
            mediaComponent = <iframe src={ post.urlM }/>;
        }

        let tagList = null;
        if (post.tags.length) {
            tagList = <Tags readOnly tags={post.tags} class="post-tags"/>;
        }

        console.log(post);
        let deleteMenu = null;
        if (this.props.user && this.props.user.uid === post.userId) {
            deleteMenu =
                <IconMenu
                    iconButtonElement={
                        <IconButton><MoreVertIcon/></IconButton>
                    }
                    targetOrigin={ {
                        horizontal: 'right',
                        vertical: 'top'
                    } }
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'top'
                    } }>
                    <MenuItem onTouchTap={() => {
                        if (typeof this.props.onDelete !== 'undefined') {
                            this.setDeleted(post);
                        }
                    }}
                              primaryText="Delete" />
                </IconMenu>;
        }

        const likeClass = post.likedByUser
            ? 'liked'
            : 'text-muted';

        const buttonStyle = post.likedByUser
            ? likeButtonStyle.liked
            : likeButtonStyle.disabled;

        return (
            <div className="timeline-panel">
                <div className="timeline-heading">
                    {mediaComponent}
                </div>

                <div className="timeline-body">
                    <p>{post.description}</p>
                </div>

                <div className="timeline-footer">
                    {tagList}
                    <small className="text-muted"><i className="glyphicon glyphicon-time"/> { Moment(date).format('MMMM Do YYYY, h:mm') }</small>
                    <div className={`${likeClass} like-section`}>
                        <span className="likes-count">{post.likes}</span>
                        <IconButton iconStyle={buttonStyle} style={likeButtonSize}
                                    onTouchTap={() => {
                                        if (typeof this.props.onToggleLike !== 'undefined') {
                                            this.toggleLike(post);
                                        }
                                    }}>
                            <LikeIcon/>
                        </IconButton>
                        {deleteMenu}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let badge = null;
        if ('inverted' in this.props) {
            badge = <div className="timeline-badge primary"/>;
        }

        const postDisplay = this.getPostDisplay(this.props.post);

        if ('inverted' in this.props) {
            return (
                <li id={`post#${this.props.post.postId}`} className={`${this.props.inverted
                    ? 'timeline-inverted'
                    : ''}`}
                    onClick={(event) => {
                        if (event._targetInst._tag !== 'svg' && event._targetInst._tag !== 'path') {
                            if (typeof this.props.onClick !== 'undefined') {
                                this.props.onClick(this.props.post);
                            }
                        }
                    }}>
                    {badge}
                    {postDisplay}
                </li>
            );
        }

        return postDisplay;
    }
}

Post.propTypes = {
    inverted: PropTypes.bool,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
    onToggleLike: PropTypes.func,
    post: PropTypes.object.isRequired,
    user: PropTypes.object
};
