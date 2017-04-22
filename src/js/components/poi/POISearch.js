import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap';

import Alerts from '../utils/Alerts';

import 'styles/panel.scss';
import 'styles/utils.scss';

export default class POIDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.geolocationSupport = false;
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            this.geolocationSupport = true;
        }

        if (!this.geolocationSupport) {
            Alerts.createWarningAlert('The browser does not support geo location. Queries will not consider the current location');
        }
    }

    handleText(event) {
        event.preventDefault();

        this.setState({ search: event.target.value });
    }

    getValidationState() {
        let { search } = this.state;

        if (typeof search === 'undefined') {
            return null;
        } else if (!search) {
            return 'error';
        }

        search = search.trim();
        if (search) {
            return 'success';
        }

        return 'error';
    }

    submitSearch(event) {
        event.preventDefault();

        let { search } = this.state;
        if (typeof search === 'undefined') {
            return null;
        } else if (!search) {
            return 'error';
        }

        search = search.trim();
        this.setState({ search });
        if (search) {
            return 'success';
        }

        const geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        };
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            fetch('/api/poi/search?')
        }, (error) => {

        }, geoOptions);
    }

    render() {
        return (
            <div className="colorAccentSecondary wrapper-fill vert-align hor-align">
                <Panel header="Search" className="panel-min-width">
                    <form onSubmit={ this.submitSearch.bind(this) } >
                        <FormGroup controlId="formBasicText"
                                   validationState={this.getValidationState()}
                        >
                            <ControlLabel>Search by name, description or address</ControlLabel>
                            <FormControl type="text" value={ this.state.search } placeholder="Search" onChange={ this.handleText.bind(this) }/>
                        </FormGroup>
                        <br />
                        <Button onClick={ this.submitSearch.bind(this) }><i className="fa fa-search" aria-hidden="true"/></Button>
                    </form>
                </Panel>
            </div>
        );
    }
}
