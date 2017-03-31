import React, { Component } from 'react';
import 'styles/register.scss';

export default class Register extends Component {
    render() {
        return (
            <div className="Register">
                <div className="row">
                    <div className="col left">
                        <h1>Sign up #iwashere</h1>
                        <p><small>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non neque vel tortor bibendum mattis.
                        </small></p>
                    </div>
                    <div className="col right">
                        <button className="btn facebook" data-provider="facebook"><i></i><span>Facebook</span></button>
                        <button className="btn plus" data-provider="google plus"><span className="i"><i></i></span><span>Google Plus</span></button>
                    </div>
                </div>
            </div>
        );
    }
}
