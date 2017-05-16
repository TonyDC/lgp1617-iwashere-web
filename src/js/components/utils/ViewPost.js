import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Post from '../utils/Post';

import 'styles/view_post.scss';

export default class ViewPostModal extends Component {

    constructor(props) {
        super(props);

        this.state = { open: true };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    render() {
        return (
            <Dialog autoScrollBodyContent
                    className="post-modal"
                    bodyClassName="post-modal-content"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={() => {
                        this.props.onClose();
                    }}>
                    <Post post={this.props.post}
                          displayUserMenu
                          onToggleLike={this.props.onToggleLike.bind(this)}
                          onDelete={this.props.onDelete.bind(this)}
                          user={this.props.user}/>
            </Dialog>
        );
    }
}

ViewPostModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onToggleLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
