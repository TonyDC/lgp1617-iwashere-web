import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import httpCodes from 'http-status-codes';
import TextField from 'material-ui/TextField';
import InfiniteScroll from 'react-infinite';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';

import Alerts from '../../../utils/Alerts';

import 'styles/panel.scss';
import 'styles/utils.scss';

const API_ROUTE_URL = '/api/reserved/content-editor/route/';
const NO_ELEMENTS = 0;
const TWO_SIZE = 2;

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

    getContext() {
        const { reserved: reservedPropStore } = this.context.store.getState();
        const { contexts, selectedIndex: selectedContextIndex } = reservedPropStore;
        if (!contexts || !Array.isArray(contexts) || typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
            throw new Error('Bad user context selected.');
        }

        return contexts[selectedContextIndex].contextId;
    }

    performSearch(query) {
        if (!query || typeof query !== 'string') {
            throw new Error('Bad query parameter');
        }

        const headers = { 'X-user-context': this.getContext() };

        return authenticatedFetch(`${API_ROUTE_URL}search?query=${query}`, {}, headers, 'GET').
        then(checkFetchResponse);
    }

    submitSearch(event) {
        event.preventDefault();

        if (this.componentIsMounted && !this.state.inProgress) {
            if (this.searchErrorAlert) {
                Alerts.close(this.searchErrorAlert);
                this.searchErrorAlert = null;
            }

            if (typeof this.state.search !== 'string') {
                this.setState({ searchError: true });

                return;
            }

            const search = this.state.search.trim();
            if (search.length === NO_ELEMENTS) {
                this.setState({ searchError: true });

                return;
            }

            this.setState({
                inProgress: true,
                search,
                searchError: false
            });
            nProgress.start();
            this.performSearch(search).then((results) => {
                if (this.componentIsMounted) {
                    this.setState({
                        inProgress: false,
                        results
                    });
                }
            }).
            catch((error) => {
                if (this.componentIsMounted) {
                    this.setState({ inProgress: false });
                    const alertText = error.status === httpCodes.BAD_REQUEST
                        ? 'Error while searching for Routes. Please, try again later.'
                        : 'Bad search input. Please, provide the keywords to search for.';

                    this.searchErrorAlert = Alerts.createErrorAlert(alertText);
                }
            }).
            then(() => {
                nProgress.done();
            });
        }
    }

    renderResultsArea() {
        // Show the results while search may be in place
        const { results } = this.state;

        let resultsArea = null;
        if (results && Array.isArray(results)) {
            if (results.length > NO_ELEMENTS) {
                const resultsList = results.map((element) => {
                    return <div key={element.routeId}>
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
                    </div>;
                });

                if (results.length > TWO_SIZE) {
                    resultsArea = (
                        <List>
                            <InfiniteScroll containerHeight={200} elementHeight={40}>
                                { resultsList }
                            </InfiniteScroll>
                        </List>
                    );
                } else {
                    resultsArea = (
                        <List>
                            { resultsList }
                        </List>
                    );
                }
            } else {
                resultsArea = (
                    <List>
                        <ListItem
                            primaryText="No results were found."
                            secondaryText={ <p>Try a different search...</p> }
                            disabled
                            secondaryTextLines={2}
                        />
                    </List>
                );
            }
        }

        return resultsArea;
    }

    render() {
        const { inProgress, search, searchError } = this.state;

        return (
            <form onSubmit={ inProgress ? null : this.submitSearch.bind(this) } >
                <input type="hidden" value="something"/>
                <TextField
                    autoComplete="off"
                    hintText="Keywords"
                    floatingLabelText="Search Route"
                    value={ search }
                    onChange={ this.handleSearchInput.bind(this) }
                    fullWidth
                    errorText={ searchError ? "Invalid search terms" : null }
                />
                <br />
                <RaisedButton
                    label="Search"
                    icon={<ActionSearch />}
                    onTouchTap={ this.submitSearch.bind(this) }
                    disabled={inProgress}
                />
                { this.renderResultsArea() }
            </form>

        );
    }
}

RouteSearch.contextTypes = { store: PropTypes.object };

RouteSearch.propTypes = {
    onRouteSelected: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
};
