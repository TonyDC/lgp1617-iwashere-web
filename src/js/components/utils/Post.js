/* eslint no-underscore-dangle: "off" */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

import Tags from './MyTags';
import Image from './Image';

import IconButton from 'material-ui/IconButton';
import LikeIcon from "material-ui/svg-icons/action/thumb-up";

import 'styles/timeline.scss';

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

    getPostDisplay(post) {
        const date = new Date(post.postDate);

        let mediaComponent = null;
        if (post.type === IMAGE_TYPE) {
            mediaComponent = <Image url={ post.url }/>;
        } else if (post.type === VIDEO_TYPE) {
            mediaComponent = <iframe src={ post.url }/>;
        }

        let tagList = null;
        if (post.tags.length) {
            tagList = <Tags readOnly tags={post.tags} class="post-tags"/>;
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
                                        if (typeof this.props.onLike !== 'undefined') {
                                            this.props.onLike(post);
                                        }
                                    }}>
                            <LikeIcon/>
                        </IconButton>
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
    onLike: PropTypes.func,
    post: PropTypes.object.isRequired
};
