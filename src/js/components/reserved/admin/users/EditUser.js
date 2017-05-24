import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import firebase from 'firebase';
import httpCodes from 'http-status-codes';
import Alerts from '../../../utils/Alerts';
import Helmet from 'react-helmet';
import { GridLoader as Loader } from 'halogen';

import Paper from 'material-ui/Paper';

import UserForm from './UserForm';

import { getContext } from '../../../../functions/store';
import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';

import 'styles/utils.scss';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = { marginLeft: 40 };

const USER_API_URL = '/api/reserved/admin/user/';

export default class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = { fetchInProgress: true };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.fetchUserInfo();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchUserInfo() {
        const { router } = this.props;
        const { userID } = router.params;       // TODO colocar no router
        const { store } = this.context;

        const headers = {
            'Accept': 'application/json',
            'X-user-context': getContext(store)
        };
        const body = {};

        nProgress.start();

        return authenticatedFetch(`${USER_API_URL}/${encodeURIComponent(userID)}`, body, headers, 'GET').
        then(checkFetchResponse).
        then((json) => {
            if (!this.componentIsMounted) {
                return;
            }

            // NOTE: password is never revealed
            const { email, name, role, context, suspended } = json;
            this.setState({
                fetchInProgress: false,
                user: {
                    context,
                    email,
                    name,
                    role,
                    suspended
                }
            });

            // Note: so that the fetched information and the submitted information are related to the same POI
            this.userID = userID;
        }).
        catch((err) => {
            const { status } = err;
            let text = 'Error while fetching the user information. Please, try again later.';
            if (status === httpCodes.UNAUTHORIZED) {
                text = 'You are not allowed to edit the information of this user.';
            } else if (status === httpCodes.NO_CONTENT) {
                text = 'User not found.';
            }
            Alerts.createErrorAlert(text);
            this.props.router.push('/reserved/dash/user');
        }).
        then(() => {
            nProgress.done();
        });
    }

    handleSave(data) {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
            throw new Error('Bad user object');
        }

        const { userID } = this;
        const { email, password, name, role, context } = data;
        const { store } = this.context;

        const headers = { 'X-user-context': getContext(store) };
        const body = {
            context,
            email,
            name,
            password,
            role
        };

        return authenticatedFetch(`${USER_API_URL}/${encodeURIComponent(userID)}`, body, headers, 'PUT').
        then(checkFetchResponse);
    }

    handleDelete(toDelete) {
        if (typeof toDelete !== 'boolean') {
            throw new Error('Bad parameter (it should be a boolean value)');
        }

        const { userID } = this;
        const { store } = this.context;

        const body = { suspended: toDelete };
        const headers = { 'X-user-context': getContext(store) };

        return authenticatedFetch(`${USER_API_URL}/${encodeURIComponent(userID)}`, body, headers, 'POST').
        then(checkFetchResponse);
    }

    render() {
        const { user, fetchInProgress } = this.state;

        let userForm = null;
        if (fetchInProgress === false && user) {
            userForm = (
                <UserForm
                    initialValues={ user }
                    onSave={ this.handleSave.bind(this) }
                    onDelete={ this.handleDelete.bind(this) }
                />
            );
        } else {
            userForm = (
                <div className="hor-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Edit User</title>
                </Helmet>
                <h3 style={titleStyle}>Edit User</h3>
                { userForm }
            </Paper>
        );
    }
}

EditUser.propTypes = { router: PropTypes.object.isRequired };

EditUser.contextTypes = { store: PropTypes.object };
