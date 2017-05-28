import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import Helmet from 'react-helmet';

import Paper from 'material-ui/Paper';

import UserForm from './UserForm';

import { getContext } from '../../../../functions/store';
import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = { marginLeft: 40 };

export default class CreateUser extends Component {

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleSave(data) {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
            throw new Error('Bad user object');
        }

        const { email, password, name, role, context } = data;
        const { store } = this.context;

        const body = {
                context,
                email,
                name,
                password,
                role
            },
            headers = { 'X-user-context': getContext(store) };

        return authenticatedFetch('/api/reserved/admin/user/', body, headers, 'POST').
        then(checkFetchResponse);
    }

    render() {
        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Create User</title>
                </Helmet>

                <h3 style={titleStyle}>Create User</h3>
                <UserForm onSave={ this.handleSave.bind(this) } resetAfterSubmit/>
            </Paper>
        );
    }
}

CreateUser.contextTypes = { store: PropTypes.object };
