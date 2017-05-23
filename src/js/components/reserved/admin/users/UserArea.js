import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import UserSearch from './UserSearch';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';

import 'styles/panel.scss';
import 'styles/utils.scss';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const dividerStyle = {
    marginBottom: 40,
    marginTop: 40,
    width: 'auto'
};

export default class UserArea extends Component {

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleCreateUser(event) {
        event.preventDefault();
        this.props.router.push('/reserved/dash/route/create');
    }

    handleUserSelection(user) {
        const { uid } = user;
        this.props.router.push(`/reserved/dash/user/${uid}`);
    }

    render() {
        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - User area</title>
                </Helmet>
                <div style={mainStyle}>
                    <h4>Search for an existing user</h4>
                    <UserSearch onUserSelected={ this.handleUserSelection.bind(this) }/>
                    <Divider style={dividerStyle}/>
                    <h4>or create a new Point of Interest</h4>
                    <RaisedButton label="Create User" icon={<SocialPersonAdd/>} onTouchTap={ this.handleCreateUser.bind(this) } />
                </div>
            </Paper>
        );
    }
}

UserArea.propTypes = { router: PropTypes.object.isRequired };
