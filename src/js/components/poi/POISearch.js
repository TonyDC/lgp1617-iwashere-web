import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap';
import { GridLoader as Loader } from 'halogen';

import Alerts from '../utils/Alerts';

import 'styles/panel.scss';
import 'styles/utils.scss';

export default class POIDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            results: null
        };
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

    performSearch(query, lat, lng) {
        if (!query || typeof query !== 'string') {
            throw new Error('Bad query parameter');
        }

        const entrypoint = typeof lat === 'undefined' || typeof lng === 'undefined'
            ? `/api/poi/search?query=${query}`
            : `/api/poi/search?query=${query}&lat=${lat}&lng=${lng}`;

        return fetch(entrypoint, {
            headers: { 'Accept': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            if (response.code <= 400) {
                return Promise.reject(new Error(response));
            }

            return response.json();
        });
    }

    submitSearch(event) {
        event.preventDefault();

        this.setState({ inProgress: 'Searching current location...' });

        let { search } = this.state;
        if (typeof search !== 'string') {
            this.setState({ inProgress: false });

            return;
        }

        search = search.trim();
        this.setState({ search });
        if (!search) {
            this.setState({ inProgress: false });

            return;
        }

        const geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        };
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            this.setState({ inProgress: 'Searching...' });
            this.performSearch(search, latitude, longitude).
            then((json) => {
                this.setState({
                    inProgress: false,
                    results: json.results
                });
            }).
            catch((error) => {
                this.setState({ inProgress: false });
                console.error(error);
                Alerts.createErrorAlert('Error while searching for POIs');
            });

        }, (err) => {
            console.log(err);
            Alerts.createInfoAlert('Error while retrieving current location');

            this.setState({ inProgress: 'Searching...' });
            this.performSearch(search).
            then((json) => {
                this.setState({
                    inProgress: false,
                    results: json.results
                });
            }).
            catch((error) => {
                this.setState({ inProgress: false });
                console.error(error);
                Alerts.createErrorAlert('Error while searching for POIs');
            });
        }, geoOptions);

    }

    render() {
        let searchButton = <div>
            <Loader color="#012935" className="loader"/>
            <em>{ this.state.inProgress }</em>
        </div>;
        if (!this.state.inProgress) {
            searchButton = <Button onClick={ this.submitSearch.bind(this) }><i className="fa fa-search" aria-hidden="true"/></Button>;
        }

        let resultsArea = null;
        const { results } = this.state;
        if (results) {
            if (results.length > 0) {
                resultsArea = results.map((el) => {
                    return <div>
                        <h6>Name</h6>
                        <div>{ el.name }</div>
                        <hr/>
                        <h6>Description</h6>
                        <div>{ el.description }</div>
                    </div>;
                });
            } else {
                resultsArea = <div>No results</div>;
            }
        }

        return (
            <div className="colorAccentSecondary wrapper-fill vert-align hor-align">
                <Panel header="Search" className="panel-min-width">
                    <form onSubmit={ this.state.inProgress
                        ? null
                        : this.submitSearch.bind(this) } >
                        <FormGroup controlId="formBasicText"
                                   validationState={this.getValidationState()}
                        >
                            <ControlLabel>Search by name, description or address</ControlLabel>
                            <FormControl type="text" value={ this.state.search } placeholder="Search" onChange={ this.handleText.bind(this) }/>
                        </FormGroup>
                        <br />
                        { resultsArea }
                        { searchButton }
                    </form>
                </Panel>
            </div>
        );
    }
}
