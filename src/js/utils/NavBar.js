import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import * as firebase from 'firebase';

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

        // 'userStatus' not initialized
        if (!this.state.userStatus) {
            return;

        } else if (this.state.userStatus.isLogged) {
            firebase.auth().signOut();
            this.props.history.push('/');

        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        let user = "Sign in",
            userAction = null,
            userPicture = null,
            userProfile = null;

        if (this.state.userStatus && this.state.userStatus.isLogged) {
            const { userInfo } = this.state.userStatus;
            user = userInfo.displayName;
            if (!user) {
                user = userInfo.email;
            }

            userAction = "Sign out";

            if (userInfo.photoURL) {
                userPicture = <NavItem><img src={userInfo.photoURL} alt="user-profile-picture"
                                            className="img-circle"/></NavItem>;
            }

            userProfile = <MenuItem eventKey={3.1}>Profile</MenuItem>;

        } else {
            userAction = <div className="logButton">Sign in</div>;
        }

        return (
            <Navbar inverse collapseOnSelect className="navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src={logoCompact} alt="#iwashere" className="app-logo"/>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={user} id="basic-nav-dropdown">
                            {userPicture}
                            {userProfile}
                            <MenuItem divider/>
                            <MenuItem onClick={ this.toggleUserStatus.bind(this) }> <div className="logButton">{ userAction }</div></MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavBar.propTypes = { history: React.PropTypes.object };

// To access Redux store
NavBar.contextTypes = { store: React.PropTypes.object };
