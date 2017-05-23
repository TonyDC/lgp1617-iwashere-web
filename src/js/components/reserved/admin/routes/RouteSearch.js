import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import httpCodes from 'http-status-codes';

import Alerts from '../../../utils/Alerts';

import 'styles/panel.scss';
import 'styles/utils.scss';

const NO_ELEMENTS = 0;

export default class RouteSearch extends Component {

    constructor(props) {
        super(props);
        this.state = { search: "" };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleSearchInput(event) {
        event.preventDefault();

        if (this.componentIsMounted) {
            this.setState({ search: event.target.value });
        }
    }

    performSearch(query) {
        if (!query || typeof query !== 'string') {
            throw new Error('Bad query parameter');
        }

        return fetch(`/api/route/search?query=${query}`, {
            headers: { 'Accept': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        });
    }

    submitSearch(event) {
        event.preventDefault();

        if (this.componentIsMounted) {
            this.setState({ inProgress: 'Searching...' });

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

            this.setState({ inProgress: 'Searching...' });
            this.performSearch(search).
            then((results) => {
                if (!this.componentIsMounted) {
                    return;
                }

                // TODO: filter results by user context?

                this.setState({
                    inProgress: false,
                    results
                });
            }).
            catch(() => {
                if (!this.componentIsMounted) {
                    return;
                }

                this.setState({ inProgress: false });
                Alerts.createErrorAlert('Error while searching for routes.');
            });

        }
    }

    render() {
        let searchButton = <div className="hor-align vert-align">
            <Loader color="#012935" className="loader"/>
            <em>{ this.state.inProgress }</em>
        </div>;
        if (!this.state.inProgress) {
            searchButton = <RaisedButton
                label="Search"
                icon={<ActionSearch />}
                onTouchTap={ this.submitSearch.bind(this) }
            />;
        }

        let resultsArea = null;
        const { results } = this.state;
        if (results && !this.state.inProgress) {
            if (results.length > NO_ELEMENTS) {
                resultsArea = <List>
                    { results.map((element, index) => {
                        return (
                            <div key={index}>
                                <ListItem
                                    primaryText={ element.name }
                                    secondaryText={
                                        <p>{ element.description }</p>
                                    }
                                    secondaryTextLines={2}
                                    onTouchTap={() => {
                                        this.props.onRouteSelected(element.routeId);
                                    }}
                                />
                                <Divider inset/>
                            </div>
                        );
                    }) }
                </List>;
            } else {
                resultsArea = <List>
                    <ListItem
                        primaryText="No results were found."
                        secondaryText={
                            <p>Try a different search...</p>
                        }
                        disabled
                        secondaryTextLines={2}
                    />
                </List>;
            }
        }

        return (
            <form onSubmit={ this.state.inProgress
                ? null
                : this.submitSearch.bind(this) } >
                <TextField
                    hintText="Keywords"
                    floatingLabelText="Search route"
                    value={ this.state.search }
                    onChange={ this.handleSearchInput.bind(this) }
                    fullWidth
                    errorText={ null }
                />
                <br />
                { resultsArea }
                { searchButton }
            </form>

        );
    }
}

RouteSearch.propTypes = {
    onRouteSelected: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
};
