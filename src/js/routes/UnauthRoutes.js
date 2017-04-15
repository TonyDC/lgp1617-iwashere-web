import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';

import logo from 'img/logo.png';

import 'styles/login.scss';
import 'styles/utils.scss';

export default class UnauthRoutes extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = { userStatus: reduxState.userStatus };
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
        if (typeof userStatus.isLogged === 'undefined') {
            return <div className="hor-align">
                <Loader color="#E5402A" size="50px" margin="10px"/>
            </div>;
        }

        return (
            <div className="colorAccentSecondary vert-align hor-align wrapper-fill">
                <div className="container">
                    <div className="row main">
                        <div className="main-login main-center">
                            <div className="panel-heading">
                                <div className="panel-title text-center">
                                    <img src={logo} alt="#iwashere logo"/>
                                </div>
                            </div>
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UnauthRoutes.propTypes = { children: PropTypes.object.isRequired };

// To access Redux store
UnauthRoutes.contextTypes = { store: PropTypes.object };
