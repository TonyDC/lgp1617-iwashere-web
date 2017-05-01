import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import * as firebase from 'firebase';
import Dialog from 'material-ui/Dialog';
import Alerts from '../utils/Alerts';
import Tags from '../utils/MyTags';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class CreatePostDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inProgress: false,
            open: false,
            post: {}
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
        console.log(this.state.post);

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
        then((newPost) => {
           // TODO update list of posts
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
        if (this.componentIsMounted) {
            this.setState({open: true});
        }
    }

    handleClose(clearData) {
        const newState = { open: false };

        if (clearData) {
            newState.post = null;
        }

        if (this.componentIsMounted) {
            this.setState(newState);
        }
    }

    handleDescription(event) {
        event.preventDefault();

        const { post } = this.state;
        post.description = event.target.value
        if (this.componentIsMounted) {
            this.setState({post});
        }
    }

    addTagToPost(tagId) {
        // TODO add tagId in this.state.tags
    }

    removeTagFromPost(tagId) {
        // TODO remove tagId in this.state.tags
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
                onTouchTap={() => {
                    this.createPost();
                }}
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
                        <Tags className="tag-input"
                              title="Add tag..."
                              tags={this.state.post.tags}
                              onAddTag={(tagId) => {
                                  this.addTagToPost(tagId);
                              }}
                              onRemoveTag={(tagId) => {
                                  this.removeTagFromPost(tagId);
                              }}
                        />
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
