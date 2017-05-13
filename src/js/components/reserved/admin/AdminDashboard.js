import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const style = { marginLeft: 20 };

const mainStyle = {
    margin: 20
};

export default class AdminDashboard extends Component {

    render() {
        return (
            <Paper zDepth={2} style={mainStyle}>
                <div style={mainStyle}>
                    <TextField
                        hintText="Name"
                        floatingLabelText="Name of Point of Interest"
                        fullWidth
                    />
                    <TextField
                        hintText="Description"
                        floatingLabelText="Description of Point of Interest"
                        fullWidth
                        multiLine
                    />
                    <TextField
                        hintText="Hint Text"
                        floatingLabelText="Floating Label Text"
                        fullWidth
                    />
                    <TextField
                        hintText="Hint Text"
                        floatingLabelText="Floating Label Text"
                        fullWidth
                    />
                    <Divider/>
                    { /* TODO Map */ }
                </div>
            </Paper>
        );
    }
}
