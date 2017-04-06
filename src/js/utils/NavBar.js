import React, { Component } from 'react';
import Alert from 'react-s-alert';

import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

import logo from 'img/logo.png';

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
        if (this.state.user) {
            userAction = <div className="logButton">Sign out</div>;
        } else {
            userAction = <div className="logButton">Sign in</div>;
        }

        return (
            <Navbar inverse collapseOnSelect className="navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src={logo} alt="#iwashere" className="app-logo"/>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Link</NavItem>
                        <NavItem eventKey={2} href="#">Link</NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Link Right</NavItem>
                        <NavItem eventKey={2} href="#">Link Right</NavItem>
                        <NavItem onClick={ this.toggleUserStatus.bind(this) }>{ userAction }</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavBar.propTypes = { history: React.PropTypes.object };
