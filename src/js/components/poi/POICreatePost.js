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

import 'styles/dropzone.scss';

const API_POI_POST_URL = '/api/post/auth/';
const NO_ELEMENTS = 0;
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
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    checkPost(post) {
        const { description, files } = post;

        return description.trim() || files.length === ONE_ELEMENT;
    }

    onDragEnter() {
        this.setState({ dropzoneActive: true });
    }

    onDragLeave() {
        this.setState({ dropzoneActive: false });
    }

    createPost() {
        const { currentUser } = firebase.auth();
        if (!this.componentIsMounted || !this.checkPost(this.state.post) || !currentUser) {
            return;
        }

        if (this.errorAlert) {
            Alerts.close(this.errorAlert);
        }

        nProgress.start();
        this.setState({ inProgress: true });

        currentUser.getToken().then((token) => {
            const { description, tags, files } = this.state.post;
            const { poiId } = this.props;

            const form = new FormData();
            form.append('description', description.trim());
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
            if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((newPost) => {
            if (typeof this.props.onNewPost !== 'undefined') {
                this.props.onNewPost(newPost);
            }

            if (this.componentIsMounted) {
                this.setState({
                    open: false,
                    post: {
                        description: '',
                        files: [],
                        tags: []
                    }
                });
            }

            nProgress.done();
            this.errorAlert = null;
        }).
        catch(() => {
            if (!this.componentIsMounted) {
                return;
            }
            nProgress.done();
            this.setState({ inProgress: false });
            this.errorAlert = Alerts.createErrorAlert('Error while creating the post.');
        });
    }

    handleOpen() {
        if (this.componentIsMounted) {
            this.setState({
                inProgress: false,
                open: true
            });
        }
    }

    handleClose() {
        if (!this.state.inProgress && this.componentIsMounted) {
            this.setState({
                open: false,
                post: {
                    description: '',
                    files: [],
                    tags: []
                }
            });
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
        if (tagIndex === NOT_FOUND) {
            post.tags.push(tagId);
            if (this.componentIsMounted) {
                this.setState({ post });
            }
        }
    }

    removeTagFromPost(tagId) {
        const { post } = this.state;
        const tagIndex = post.tags.indexOf(tagId);
        if (tagIndex !== NOT_FOUND) {
            post.tags.splice(tagIndex, ONE_ELEMENT);
            if (this.componentIsMounted) {
                this.setState({ post });
            }
        }
    }

    onDrop(files, rejected) {
        let error = false;

        this.setState({ dropzoneActive: false });
        if (files && files.length > ONE_ELEMENT) {
            files.forEach((file) => {
                window.URL.revokeObjectURL(file.preview);
            });
            this.setState({ rejected: true });
            error = true;
        }

        if (rejected && rejected.length > NO_ELEMENTS) {
            rejected.forEach((file) => {
                window.URL.revokeObjectURL(file.preview);
            });
            this.setState({ rejected: true });
            error = true;
        }

        // If any error has been detected, return
        if (error) {
            return;
        }

        this.state.post.files.forEach((file) => {
            window.URL.revokeObjectURL(file.preview);
        });

        // NOTE: the order matters!
        // ...this.state.post,
        // files
        this.setState({
            post: {
                ...this.state.post,
                files
            },
            rejected: false
        });
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary
                        onTouchTap={() => {
                            this.handleClose();
                        }}
            />,
            <FlatButton label="Submit" primary disabled={this.state.inProgress}
                        onTouchTap={() => {
                            this.createPost();
                        }}
            />
        ];

        return (
            <div className="poi-detail-buttons">
                <RaisedButton className="poi-detail-button" backgroundColor="#39A8E0" label="New Post" labelColor="#FFF" onTouchTap={this.handleOpen.bind(this)} />
                <Dialog autoScrollBodyContent title="Create a new post" actions={actions} modal={false} open={this.state.open}
                        onRequestClose={() => {
                            this.handleClose();
                        }}>
                    <form>
                        <Tags title="Add tag..." tags={this.state.post.tags}
                              onAddTag={(tagId) => {
                                  this.addTagToPost(tagId);
                              }}
                              onRemoveTag={(tagId) => {
                                  this.removeTagFromPost(tagId);
                              }}
                        />
                        <TextField hintText="Enter a description" floatingLabelText="Description" onChange={ this.handleDescription.bind(this) } fullWidth />
                        <Dropzone className="custom-dropzone" onDrop={this.onDrop.bind(this)} accept="image/jpeg, image/png" onDragEnter={this.onDragEnter.bind(this)} onDragLeave={this.onDragLeave.bind(this)}>
                            <div>
                                { this.state.dropzoneActive && <div className="overlay">Drop files...</div> }
                                <p className="dropzone-info">Drag and drop a file here (png, jpeg), or click here to open the select file window</p>
                                { this.state.rejected && <p className="dropzone-info">Files were rejected. Only one .png or .jpeg file is accepted</p> }
                                { this.state.post.files.length > NO_ELEMENTS && <p className="dropzone-info">File to upload</p> }
                                {
                                    this.state.post.files &&
                                    this.state.post.files.map((file, index) => {
                                        return <span key={index} onClick={(event) => {
                                            event.preventDefault();

                                            const { files } = this.state.post;
                                            files.splice(index, ONE_ELEMENT);
                                            window.URL.revokeObjectURL(file.preview);
                                            this.setState({
                                                post: {
                                                    ...this.state.post,
                                                    files
                                                }
                                            });
                                        }}>
                                            <div>
                                        <img src={file.preview} className="dropzone-thumbnail"/>
                                            <i className="fa fa-trash dropzone-delete-icon" aria-hidden="true"/>
                                            </div>
                                </span>;
                                    })
                                }
                            </div>
                        </Dropzone>
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
