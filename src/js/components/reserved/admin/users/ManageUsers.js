import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import * as firebase from 'firebase';
import Alerts from '../../../utils/Alerts';

import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import UserForm from './UserForm';

import 'styles/utils.scss';
import 'styles/map.scss';

const API_USER_URL = '/api/route/auth/';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

export default class ManageUsers extends Component {

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    updateUserRole(user) {
        const userLoggedIn = firebase.auth().currentUser;
        if (this.componentIsMounted && userLoggedIn) {
            this.setState({ inProgress: true });

            userLoggedIn.getToken().then((token) => {
                return fetch(API_USER_URL, {
                    body: JSON.stringify(user),
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'POST'
                });
            }).
            then((response) => {
                if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                    return Promise.reject(new Error(response.statusText));
                }

                Alerts.createInfoAlert("User role updated.");

                return null;
            }).
            catch(() => {
                if (this.componentIsMounted) {
                    this.setState({ inProgress: false });
                }
                this.errorAlert = Alerts.createErrorAlert('Error while updating the user\'s role.');
            });
        }
    }

    render() {
        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Reserved - Users</title>
                </Helmet>

            </Paper>
        );
    }
}

ManageUsers.propTypes = { router: PropTypes.object };
