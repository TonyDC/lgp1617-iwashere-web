import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Post from '../utils/Post';

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
            <Dialog
                modal={false}
                open={this.state.open}
                onRequestClose={() => {
                    this.props.onClose();
                }}
            >
                <Post post={this.props.post}
                      onLike={() => {
                          this.props.onToggleLike(this.props.post);
                      }}/>
            </Dialog>
        );
    }
}

ViewPostModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onToggleLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};
