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

import { getContext } from '../../../../functions/store';
import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';

import Alerts from '../../../utils/Alerts';

import 'styles/panel.scss';
import 'styles/utils.scss';

const USER_API_URL = '/api/reserved/admin/user';

const NO_ELEMENTS = 0;
const TWO_SIZE = 2;

export default class UserSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            search: "",
            searchError: false
        };
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
            this.setState({
                search: event.target.value,
                searchError: false
            });
        }
    }

    handleUserSelection(user) {
        const { onUserSelected } = this.props;
        if (typeof onUserSelected !== 'function') {
            return;
        }

        onUserSelected(user);
    }

    performSearch(query) {
        if (!query || typeof query !== 'string') {
            throw new Error('Bad query parameter');
        }

        const { store } = this.context;

        const headers = { 'X-user-context': getContext(store) };

        return authenticatedFetch(`${USER_API_URL}/search?email=${encodeURIComponent(query)}`, {}, headers, 'GET').
        then(checkFetchResponse);
    }

    submitSearch(event) {
        event.preventDefault();

        const { inProgress } = this.state;
        if (!this.componentIsMounted || inProgress) {           // TODO check this in the remaining components
            return;
        }

        if (this.searchErrorAlert) {
            Alerts.close(this.searchErrorAlert);
            this.searchErrorAlert = null;
        }

        let { search } = this.state;
        if (typeof search !== 'string') {
            this.setState({ searchError: true });

            return;
        }

        search = search.trim();
        this.setState({ search });
        if (search.length === NO_ELEMENTS) {
            this.setState({ searchError: true });

            return;
        }

        this.setState({
            inProgress: true,
            searchError: false
        });
        nProgress.start();
        this.performSearch(search).
        then((results) => {
            if (this.componentIsMounted) {
                this.setState({
                    inProgress: false,
                    results
                });
            }
        }).
        catch((error) => {
            const { status } = error;
            if (this.componentIsMounted) {
                this.setState({ inProgress: false });
                let alertText = 'Error while searching for users. Please, try again later.';
                if (status === httpCodes.BAD_REQUEST) {
                    alertText = 'Bad search input. Please, provide the email to search for.';
                }
                this.searchErrorAlert = Alerts.createErrorAlert(alertText);
            }
        }).
        then(() => {
            nProgress.done();
        });
    }

    renderResultsArea() {
        // Show the results while search may be in place
        const { results } = this.state;

        let resultsArea = null;
        if (results && Array.isArray(results)) {
            if (results.length > NO_ELEMENTS) {
                const resultsList = results.map((element) => {
                    // NOTE: uid is primary key -> unique and not null
                    const { uid, name, email } = element;

                    return (
                        <div key={uid}>
                            <ListItem
                                primaryText={ name }
                                secondaryText={ <p>{ email }</p> }
                                secondaryTextLines={2}
                                onTouchTap={(event) => {
                                    event.preventDefault();
                                    this.handleUserSelection(element);
                                }}
                            />
                            <Divider inset/>
                        </div>
                    );
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
        // <input type="hidden" value="something"/> -> to disable autocomplete

        return (
            <form onSubmit={ inProgress ? null : this.submitSearch.bind(this) } >
                <input type="hidden" value="something"/>
                <TextField
                    autoComplete="off"
                    hintText="email"
                    floatingLabelText="Search users"
                    value={ search }
                    onChange={ this.handleSearchInput.bind(this) }
                    fullWidth
                    errorText={ searchError ? "Invalid email" : null }
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

UserSearch.contextTypes = { store: PropTypes.object };

UserSearch.propTypes = { onUserSelected: PropTypes.func.isRequired };
