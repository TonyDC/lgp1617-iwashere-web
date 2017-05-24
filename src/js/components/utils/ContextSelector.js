import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { selectContext } from '../../redux/action creators/reserved';
import { SELECTED_RESERVED_CONTEXT, NEW_RESERVED_CONTEXTS } from '../../redux/actionTypes';

const NOT_FOUND = -1;
const NO_ELEMENTS_SIZE = 0;
const ZERO_INDEX = 0;

export default class ContextSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.componentIsMounted = true;
        // When entering, process the current state of the store
        this.handleStoreEvents(false);
        this.reduxListenerUnsubscribe = this.context.store.subscribe(this.handleStoreEvents.bind(this));
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
        this.reduxListenerUnsubscribe();
    }

    handleStoreEvents(filterAction = true) {
        const reduxState = this.context.store.getState();
        const { action, reserved } = reduxState;
        if (filterAction && [SELECTED_RESERVED_CONTEXT, NEW_RESERVED_CONTEXTS].indexOf(action) === NOT_FOUND) {
            return;
        }

        const { contexts, selectedIndex } = reserved;
        if (this.componentIsMounted && contexts && Array.isArray(contexts) && contexts.length > NO_ELEMENTS_SIZE) {
            this.setState({
                contexts,
                selectedIndex
            });
        }
    }
    handleSelectedContextChange(event, index, value) {
        this.context.store.dispatch(selectContext(value));
    }

    render() {
        let result = null;
        const { contexts, selectedIndex } = this.state;
        if (typeof selectedIndex === typeof ZERO_INDEX) {
            result = <SelectField floatingLabelText="Context" value={selectedIndex}
                                  onChange={this.handleSelectedContextChange.bind(this)}>
                {
                    contexts.map((element, index) => {
                        const { roleName, contextName } = element;

                        return <MenuItem key={index} value={index} primaryText={`${contextName} - ${roleName}`} />;
                    })
                }
            </SelectField>;
        }

        return result;
    }
}

ContextSelector.contextTypes = { store: PropTypes.object };
