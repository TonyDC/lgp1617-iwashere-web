import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
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
                if (this.componentIsMounted) {
                    this.setState({
                        inProgress: false,
                        results
                    });
                }
            }).
            catch(() => {
                if (this.componentIsMounted) {
                    this.setState({ inProgress: false });
                    Alerts.closeAll();
                    Alerts.createErrorAlert('Error while searching for routes.');
                }
            });

        }
    }

    getResultItem(element) {
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
        if (results && Array.isArray(results)) {
            if (results.length > NO_ELEMENTS) {
                if (results.length > TWO_SIZE) {
                    resultsArea =
                        <InfiniteScroll containerHeight={200} elementHeight={40}>
                            {
                                results.map((item) => {
                                    return this.getResultItem(item);
                                })
                            }
                        </InfiniteScroll>;
                } else {
                    resultsArea = <List>
                        {
                            results.map((item) => {
                                return this.getResultItem(item);
                            })
                        }
                    </List>;
                }
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

RouteSearch.contextTypes = { store: PropTypes.object };

RouteSearch.propTypes = {
    onRouteSelected: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
};
