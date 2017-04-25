import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';
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

        /*
         The <div> tags is required so that the navbar collapse menu is properly rendered
         */
        return (
            <div className="navbar-container">
                <Navbar inverse collapseOnSelect className="navbar">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img src={logoCompact} alt="#iwashere" className="app-logo"/>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem>
                                <Link to={'/'}
                                      onlyActiveOnIndex={true}
                                      className="link"
                                      activeClassName="current-link">
                                    Homepage
                                </Link>
                            </NavItem>

                            <NavItem>
                                <Link to={'/feed'}
                                      onlyActiveOnIndex={false}
                                      className="link"
                                      activeClassName="current-link">
                                    Feed
                                </Link>
                            </NavItem>

                            { signButton }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

NavBar.propTypes = { router: PropTypes.object.isRequired };

// To access Redux store
NavBar.contextTypes = { store: PropTypes.object };
