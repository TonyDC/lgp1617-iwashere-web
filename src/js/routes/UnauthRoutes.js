import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GridLoader as Loader } from 'halogen';

import UserLogin from '../components/user/Login';
import UserRegister from '../components/user/Register';
import UserPasswordReset from '../components/user/PasswordReset';

export default class UnauthRoutes extends Component {

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

    render() {
        const { userStatus } = this.state;
        if (!userStatus) {
            return <div className="hor-align">
                <Loader color="#E5402A" size="50px" margin="10px"/>
            </div>;

        } else if (userStatus.isLogged) {
            return <Redirect to="/"/>;
        }

        return (
            <Switch>
                <Route path="/login" component={ UserLogin }/>
                <Route path="/register" component={ UserRegister }/>
                <Route path="/password-reset" component={ UserPasswordReset }/>
            </Switch>
        );
    }
}

// To access Redux store
UnauthRoutes.contextTypes = { store: React.PropTypes.object };
