import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import * as firebase from 'firebase';
import Dialog from 'material-ui/Dialog';
import Alerts from '../utils/Alerts';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class CreatePostDialog extends Component {

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

    createPost() {

        firebase.auth().currentUser.getToken(true).then((token) => {
            return fetch(this.props.url, {
                body: JSON.stringify({
                    description: this.state.post.description,
                    poiID: this.props.poiId,
                    userID: this.props.user.uid
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
        catch(() => {
            if (!this.componentIsMounted) {
                return;
            }
            this.setState({ inProgress: false });
            Alerts.createErrorAlert('Error while creating the post.');
        });
    }


    handleOpen() {
        this.setState({ open: true });
    }

    handleClose(clearData) {
        const newState = { open: false };

        if (clearData) {
            newState.post = null;
        }

        this.setState(newState);
    }

    handleDescription(event) {
        event.preventDefault();

        const { post } = this.state;
        post.description = event.target.value
        this.setState({ post });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={() => {
                    this.handleClose(true);
                }}
            />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
            />
        ];

        return (
            <div className="poi-detail-buttons">
                <RaisedButton
                    className="poi-detail-button" backgroundColor="#39A8E0"
                    label="New Post" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Create a new post"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={() => {
                        this.handleClose(true);
                    }}
                >
                    <form>
                        <TextField hintText="Enter a description"
                                   floatingLabelText="Description"
                                   onChange={ this.handleDescription.bind(this) }
                                   fullWidth
                        />
                    </form>
                </Dialog>
            </div>
        );
    }
}

CreatePostDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    poiId: PropTypes.string,
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
