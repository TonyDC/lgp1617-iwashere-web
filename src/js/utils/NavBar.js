import React, { Component } from 'react';
import Alert from 'react-s-alert';

import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

import logoCompact from 'img/logo-compact.png';

export default class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = { user: firebase.auth().currentUser };

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({user});

            if (user) {
                Alert.closeAll();
                Alert.info(`You are signed in as ${user.displayName}`, {
                    effect: 'slide',
                    position: 'bottom-right',
                    timeout: 5000
                });
            } else {
                Alert.closeAll();
                Alert.info('You are signed out.', {
                    effect: 'slide',
                    position: 'bottom-right',
                    timeout: 5000
                });
            }
        });
    }

    toggleUserStatus(event) {
        event.preventDefault();

        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
            this.props.history.push('/');
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        let userAction = null;
        let userPicture = null;
        let userProfile = null;
        let user = "Sign in";

        if (this.state.user) {
            user = this.state.user.displayName;
            userAction = <div className="logButton">Sign out</div>;

            if (this.state.user.photoURL) {
                userPicture = <NavItem><img src={this.state.user.photoURL} alt="user-profile-picture"
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
                                <MenuItem divider />
                                <MenuItem onClick={ this.toggleUserStatus.bind(this) }>{ userAction }</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        );
    }
}

NavBar.propTypes = { history: React.PropTypes.object };
