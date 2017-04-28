import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as firebase from 'firebase';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import logoCompact from 'img/logo-compact.png';

import 'styles/navbar.scss';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            this.setState({ userStatus: reduxState.userStatus });
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

    render() {
        /*
        let signButton = <NavItem className="logButton" eventKey={1} onClick={ this.toggleUserStatus.bind(this) }>Sign in</NavItem>;

        if (this.state.userStatus && this.state.userStatus.isLogged) {
            const { userInfo } = this.state.userStatus;

            let user = userInfo.displayName;
            if (!user) {
                user = userInfo.email;
            }

            let userPicture = null;
            if (userInfo.photoURL) {
                userPicture =
                    <NavItem>
                        <img src={userInfo.photoURL} alt="user-profile-picture" className="img-circle"/>
                    </NavItem>;
            }

            signButton =
                <NavDropdown eventKey={3} title={user} id="basic-nav-dropdown">
                    {userPicture}
                    <MenuItem eventKey={3.1}>Profile</MenuItem>
                    <MenuItem divider/>
                    <MenuItem onClick={ this.toggleUserStatus.bind(this) }><div className="logButton">Sign out</div></MenuItem>
                </NavDropdown>;
        }
        */

        /*
         The <div> tag is required so that the navbar collapse menu is properly rendered
         */
        return (
            <div className="navbar-container">
                <Toolbar>
                    <ToolbarTitle text="Options">
                        <img src={logoCompact}/>
                    </ToolbarTitle>
                    <ToolbarGroup>
                        <RaisedButton label="Create Broadcast" primary/>
                        <RaisedButton label="Create Broadcast" primary/>
                        <FontIcon className="muidocs-icon-custom-sort"/>
                        <ToolbarSeparator />
                        <RaisedButton label="Create Broadcast" primary/>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

NavBar.propTypes = { router: PropTypes.object.isRequired };

// To access Redux store
NavBar.contextTypes = { store: PropTypes.object };
