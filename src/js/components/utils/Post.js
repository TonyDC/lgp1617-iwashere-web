import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Tags from './MyTags';

import 'styles/timeline.scss';

const IMAGE_TYPE = "image;imagem";
const VIDEO_TYPE = "video;vídeo";

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

        return (
            <li id={`post#${this.props.post.postId}`} className={`${this.props.inverted
                ? 'timeline-inverted'
                : ''}`} key={this.props.post.postId}>
                <div className="timeline-badge primary" />

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
                        <a className="pull-right">{this.props.post.likes} <i className="glyphicon glyphicon-thumbs-up"/></a>
                    </div>
                </div>
            </li>
        );
    }
}

Post.propTypes = {
    inverted: PropTypes.bool.isRequired,
    onLike: PropTypes.any,
    post: PropTypes.object.isRequired
};
