import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const ROLE_API_ENDPOINT = '/api/reserved/admin/available-roles';
const ROLE_LANG_SEPARATOR = ';';

import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';

const NO_ELEMENTS = 0;
const ONE_ELEMENT = 1;

const ZERO_INDEX = 0;

const ROLE_FIRST_ID = 1;
const DECIMAL_RADIX = 10;

export default class RoleSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: [
                {
                    name: 'Fetching...;A buscar...',
                    poiTypeId: -1
                },
                {
                    name: 'No roles found;Sem roles para mostrar',
                    poiTypeId: -2
                },
                {
                    name: 'Error fetching roles;Erro ao buscar os roles',
                    poiTypeId: -3
                }
            ],
            selectedRole: -1
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.fetchRoles();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    getContext() {
        const { reserved: reservedPropStore } = this.context.store.getState();
        const { contexts, selectedIndex: selectedContextIndex } = reservedPropStore;
        if (!contexts || !Array.isArray(contexts) || contexts.length === NO_ELEMENTS) {
            throw new Error('No contexts available.');
        } else if (typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
            throw new Error('Bad user context selected.');
        }

        return contexts[selectedContextIndex].contextId;
    }

    handleSelection(event, index, selectedRole) {
        if (this.componentIsMounted) {
            this.setState({ selectedRole });
        }
        this.handleOnSelectProp();
    }

    handleOnSelectProp() {
        const { onSelect } = this.props;
        if (typeof onSelect !== 'function') {
            return;
        }

        const { selectedRole } = this.state;
        onSelect(selectedRole);
    }

    fetchRoles() {
        const body = {},
            headers = { 'X-user-context': this.getContext() };

        return authenticatedFetch(ROLE_API_ENDPOINT, body, headers, 'GET').
        then(checkFetchResponse).
        then((roles) => {
            if (!roles) {
                return Promise.reject(new Error('Invalid type object'));
            }

            if (!this.componentIsMounted) {
                return null;
            }

            if (!Array.isArray(roles) || roles.length === NO_ELEMENTS) {
                this.setState({ selectedType: -2 });

                return null;
            }

            const { initialRoleValue } = this.props;
            let initialSelectedType = ROLE_FIRST_ID;
            if (initialRoleValue) {
                initialSelectedType = parseInt(initialRoleValue, DECIMAL_RADIX);
                if (isNaN(initialSelectedType)) {
                    initialSelectedType = ROLE_FIRST_ID;
                }
            }
            this.setState({
                roles,
                selectedRole: initialSelectedType
            });

            return null;
        }).
        catch(() => {
            if (this.componentIsMounted) {
                this.setState({ selectedType: -3 });
            }
        }).
        then(this.handleOnSelectProp.bind(this));
    }

    render() {
        const { errorMessage } = this.props;
        const { selectedRole, types } = this.state;

        return (
            <SelectField floatingLabelText="Role" fullWidth
                         value={selectedRole}
                         errorText={ typeof errorMessage === 'string' ? errorMessage : null }
                         onChange={ this.handleSelection.bind(this) }
                         disabled={ selectedRole < ROLE_FIRST_ID }
            >
                {
                    types.map((element, index) => {
                        const { roleId, name: roleName } = element;
                        const renderName = roleName.split(ROLE_LANG_SEPARATOR);

                        return (<MenuItem key={index}
                                          value={roleId}
                                          primaryText={renderName.length > ONE_ELEMENT
                                              ? renderName[ZERO_INDEX]
                                              : roleName } />);
                    })
                }
            </SelectField>
        );
    }
}

RoleSelector.propTypes = {
    children: PropTypes.object,
    errorMessage: PropTypes.string,
    initialRoleValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onSelect: PropTypes.func
};
