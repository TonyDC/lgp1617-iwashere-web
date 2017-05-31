import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import CommunicationFeed from 'material-ui/svg-icons/communication/rss-feed';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionBuild from 'material-ui/svg-icons/action/build';

import logoCompact from 'img/logo-compact.png';

import { Link } from 'react-router';

import { grey100 } from 'material-ui/styles/colors';

import 'styles/navbar.scss';

const styles = {
    buttons: { color: '#a3a3a3' },
    hoveredButtons: { color: '#333' }
};

import { LOG_IN_ACTION, LOG_OUT_ACTION, NEW_RESERVED_CONTEXTS } from '../../redux/actionTypes';

const NOT_FOUND = -1;
const NO_ELEMENTS = 0;

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            const { action, userStatus, reserved } = reduxState;
            if ([LOG_IN_ACTION, LOG_OUT_ACTION, NEW_RESERVED_CONTEXTS].indexOf(action) === NOT_FOUND) {
                return;
            }
            this.setState({
                reserved,
                userStatus
            });
        });
    }

    componentWillUnmount() {
        this.reduxListenerUnsubscribe();
    }

    toggleUserStatus(event) {
        event.preventDefault();

        // 'userStatus' not yet initialized
        if (this.state.userStatus) {
            if (this.state.userStatus.isLogged) {
                firebase.auth().signOut();
                this.props.router.push('/');

            } else {
                this.props.router.push('/user/login');
            }
        }
    }

    goToPage(url) {
        if (typeof url !== 'string' || this.props.router.getCurrentLocation().pathname === url) {
            return;
        }

        this.props.router.push(url);
    }

    render() {
        const { userStatus, reserved } = this.state;
        let userActionButton =
            <IconButton iconStyle={styles.buttons} onTouchTap={this.toggleUserStatus.bind(this)} tooltip={<div>Log in</div>}>
                <SocialPerson hoverColor={grey100}/>
            </IconButton>;

        if (userStatus && userStatus.isLogged) {
            userActionButton =
                <IconButton iconStyle={styles.buttons} onTouchTap={this.toggleUserStatus.bind(this)} tooltip={<div>Log out</div>}>
                    <ActionExitToApp hoverColor={grey100}/>
                </IconButton>;
        }

        let reservedAreaButton = null;
        if (reserved && Array.isArray(reserved.contexts) && reserved.contexts.length > NO_ELEMENTS) {
            reservedAreaButton = (
                <IconButton iconStyle={styles.buttons} onTouchTap={this.goToPage.bind(this, '/reserved/dash')} tooltip={<div>Reserved Area</div>}>
                    <ActionBuild hoverColor={grey100}/>
                </IconButton>
            );
        }

        /*
         The <div> tag is required so that the navbar collapse menu is properly rendered
         */

        /*
        Add a <div> tag at the bottom, if one wants a submenu, for responsive submenu
         */
        return (
            <div className="navbar-container">
                <Toolbar className="toolbar-custom-style">
                    <Link to="/" className="vert-align"><img src={logoCompact} className="app-logo"/></Link>
                    <ToolbarGroup>
                        <IconButton iconStyle={styles.buttons} onTouchTap={this.goToPage.bind(this, '/')} tooltip={<div>Home</div>}>
                            <ActionHome hoverColor={grey100}/>
                        </IconButton>
                        <IconButton iconStyle={styles.buttons} onTouchTap={this.goToPage.bind(this, '/search')} tooltip={<div>Search</div>}>
                            <ActionSearch hoverColor={grey100}/>
                        </IconButton>
                        <IconButton iconStyle={styles.buttons} onTouchTap={this.goToPage.bind(this, '/feed')} tooltip={<div>Feed</div>}>
                            <CommunicationFeed hoverColor={grey100}/>
                        </IconButton>
                        { reservedAreaButton }
                        <ToolbarSeparator className="toolbar-separator-custom-style"/>
                        { userActionButton }
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

NavBar.propTypes = { router: PropTypes.object.isRequired };

// To access Redux store
NavBar.contextTypes = { store: PropTypes.object };
