import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

export default class MyDialog extends Component {

    constructor(props) {
        super(props);

        this.state = { open: false };
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
            <div>
                <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField hintText="Hint Text"
                               />
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
