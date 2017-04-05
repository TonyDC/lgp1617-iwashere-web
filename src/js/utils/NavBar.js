import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button } from 'react-bootstrap';
import * as firebase from 'firebase';

import 'styles/utils.scss';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser
        };

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({user});
        });
    }

    toggleUserStatus(event) {
        event.preventDefault();

        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
            this.props.history.push('/');
        } else {
            this.props.history.push('/login/');
        }
    }

    render() {
        let userStatus = null;
        if (this.state.user) {
            userStatus = <div>Sign out</div>;
        } else {
            userStatus = <div>Sign in</div>;
        }

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">#iwashere</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
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
                        <NavItem><Button onClick={ this.toggleUserStatus.bind(this) }>{ userStatus }</Button></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

