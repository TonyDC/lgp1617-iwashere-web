import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormGroup, Button } from 'react-bootstrap';

export default class MyButton extends Component {

    render() {
        return (
            <Link to={ this.props.url } >
                <FormGroup className="box">
                    <Button className="btn btn-block btn-md">{ this.props.children }</Button>
                </FormGroup>
            </Link>
        );
    }
}

MyButton.propTypes = {
    children: PropTypes.any.isRequired,
    url: PropTypes.string.isRequired
};
