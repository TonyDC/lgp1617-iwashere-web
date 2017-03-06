import React, { Component } from 'react';
import 'styles/card.scss';

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <header className="header">{this.props.header}</header>
                <div className="content">{this.props.children}</div>
                <footer className="footer">{this.props.footer}</footer>
            </div>
        );
    }
}