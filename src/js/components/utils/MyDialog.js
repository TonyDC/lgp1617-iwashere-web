import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import Alerts from '../utils/Alerts';


export default class MyDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inProgress: false,
            open: false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    createPost(post) {
        console.log(post);
        if (!post || typeof post !== 'string') {
            throw new Error('Bad post parameter');
        }

        return fetch(this.props.url, {
            body: JSON.stringify({
                description: post,
                poiID: this.props.poiId,
                userID: this.props.user.uid
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then((response) => {
            if (!response.ok) {
                throw new Error();
            }
        }).
        catch(() => {
            if (!this.componentIsMounted) {
                return;
            }
            this.setState({ inProgress: false });
            Alerts.createErrorAlert('Error while creating a post');
        });
    }


    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
                onTouchTap={this.handleClose}
            />
        ];

        return (
            <div className="poi-detail-buttons">
                <RaisedButton
                    className="poi-detail-button" backgroundColor="#39A8E0"
                    label="Comment" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Create a new comment"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form onSubmit={ this.state.inProgress
                        ? null
                        : this.createPost.bind(this) } >
                        <TextField hintText="New Post"
                                   floatingLabelText="Create Comment"
                                   fullWidth
                        />
                    </form>
                </Dialog>
            </div>
        );
    }
}

MyDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    poiId: PropTypes.string,
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
