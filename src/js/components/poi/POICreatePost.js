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
import Dropzone from 'react-dropzone';
import nProgress from 'nprogress';

const API_POI_POST_URL = '/api/post/auth/';
const ONE_ELEMENT = 1;
const NOT_FOUND = -1;

export default class CreatePostDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inProgress: false,
            open: false,
            post: {
                description: '',
                files: [],
                tags: []
            }
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
        nProgress.start();
        firebase.auth().currentUser.getToken().then((token) => {
            const { description, tags, files } = this.state.post;
            const { poiId } = this.props;

            const form = new FormData();
            form.append('description', description);
            form.append('tags', tags);
            form.append('poiID', poiId);
            for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
                // Note: In order to detect the array of files in the server, each file, individually, must be appended to the same form key.
                form.append('postFiles', files[fileIndex]);
            }

            // 'Content-Type': `multipart/form-data` must not be added; the 'boundary' token must be provided automatically
            return fetch(API_POI_POST_URL, {
                body: form,
                headers: { 'Authorization': `Bearer ${token}` },
                method: 'POST'
            });
        }).
        then((response) => {
            console.log(response);
            if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((newPost) => {
            if (this.props.onNewPost) {
                this.props.onNewPost(newPost);
            }

            if (this.componentIsMounted) {
                this.setState({ open: false });
            }

            nProgress.done();
        }).
        catch((error) => {
            if (!this.componentIsMounted) {
                return;
            }
            nProgress.done();
            this.setState({ inProgress: false });
            Alerts.createErrorAlert('Error while creating the post.');
        });
    }

    handleOpen() {
        if (this.componentIsMounted) {
            this.setState({ open: true });
        }
    }

    handleClose() {
        const newState = { open: false };

        if (this.componentIsMounted) {
            this.setState(newState);
        }
    }

    handleDescription(event) {
        event.preventDefault();

        const { post } = this.state;
        post.description = event.target.value;
        if (this.componentIsMounted) {
            this.setState({ post });
        }
    }

    addTagToPost(tagId) {
        const { post } = this.state;
        const tagIndex = post.tags.indexOf(tagId);
        if (tagIndex !== NOT_FOUND) {
            return;
        }
        post.tags.push(tagId);
        if (this.componentIsMounted) {
            this.setState({ post });
        }
    }

    removeTagFromPost(tagId) {
        const { post } = this.state;
        const tagIndex = post.tags.indexOf(tagId);
        if (tagIndex === NOT_FOUND) {
            return;
        }
        post.tags.splice(tagIndex, ONE_ELEMENT);
        if (this.componentIsMounted) {
            this.setState({ post });
        }
    }

    onDrop(files) {
        this.state.post.files.forEach((file) => {
            window.URL.revokeObjectURL(file.preview);
        });
        this.setState({
            post: {
                ...this.state.post,
                files
            }
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={() => {
                    this.handleClose();
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
                        this.handleClose();
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
                        <Dropzone onDrop={this.onDrop.bind(this)}>
                            <p>Drop files here</p>
                        </Dropzone>
                        {
                            this.state.post.files.map((file, index) => {
                                return <span key={index} onClick={(event) => {
                                    event.preventDefault();

                                    const { files } = this.state.post;
                                    files.splice(index, 1);
                                    window.URL.revokeObjectURL(file.preview);
                                    this.setState({
                                        post: {
                                            ...this.state.post,
                                            files
                                        }
                                    });
                                }
                                }>
                                    <img src={file.preview} style={{width: '100px', objectFit: 'contain'}}/>
                                </span>;
                            })
                        }
                    </form>
                </Dialog>
            </div>
        );
    }
}

CreatePostDialog.propTypes = {
    onNewPost: PropTypes.func,
    poiId: PropTypes.string
};
