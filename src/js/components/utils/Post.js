import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

import Tags from './MyTags';

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

    render() {
        const date = new Date(this.props.post.postDate);

        let mediaComponent = null;
        if (this.props.post.type === IMAGE_TYPE) {
            mediaComponent = <img src={ this.props.post.url }/>;
        } else if (this.props.post.type === VIDEO_TYPE) {
            mediaComponent = <iframe src={ this.props.post.url }/>;
        }

        let tagList = null;
        if (this.props.post.tags.length) {
            tagList = <Tags readOnly tags={this.props.post.tags} class="post-tags"/>;
        }

        const likeClass = this.props.post.likedByUser
                        ? 'liked'
                        : 'text-muted';

        const buttonStyle = this.props.post.likedByUser
                            ? likeButtonStyle.liked
                            : likeButtonStyle.disabled;

        let badge = null;
        if ('inverted' in this.props) {
            badge = <div className="timeline-badge primary"/>;
        }

        return (
            <li id={`post#${this.props.post.postId}`} className={`${this.props.inverted
                ? 'timeline-inverted'
                : ''}`}>

                {badge}

                <div className="timeline-panel">
                    <div className="timeline-heading">
                        {mediaComponent}
                    </div>

                    <div className="timeline-body">
                        <p>{this.props.post.description}</p>
                    </div>

                    <div className="timeline-footer">
                        {tagList}
                        <small className="text-muted"><i className="glyphicon glyphicon-time"/> { Moment(date).format('MMMM Do YYYY, h:mm') }</small>
                        <div className={`${likeClass} like-section`}>
                            <span className="likes-count">{this.props.post.likes}</span>
                            <IconButton iconStyle={buttonStyle} style={likeButtonSize}
                                        onTouchTap={() => {
                                            if (typeof this.props.onLike !== 'undefined') {
                                                this.props.onLike(this.props.post);
                                            }
                                        }}>
                                <LikeIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

Post.propTypes = {
    inverted: PropTypes.bool,
    onLike: PropTypes.any,
    post: PropTypes.object.isRequired
};
