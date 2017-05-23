import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import nProgress from 'nprogress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { getContext } from '../../../../functions/store';
import Tree from '../../../utils/ContextTree';
import Alerts from '../../../utils/Alerts';
import RoleSelector from './RoleSelector';

import 'styles/utils.scss';
import 'styles/map.scss';
import 'styles/dropzone.scss';

const ROLE_FIRST_ID = 1;
const NO_ELEMENTS = 0;
const MINIMUM_PASSWORD_SIZE = 6;

// TODO refactor
const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};
const buttonContainerStyle = { marginTop: 20 };
const buttonStyle = { marginRight: 20 };

export default class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            password: '',
            passwordError: false,
            name: '',
            nameError: false,
            role: null,
            context: null,
            submitInProgress: false,
            suspended: null
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleName(event) {
        event.preventDefault();
        if (this.componentIsMounted) {
            this.setState({ name: event.target.value });
        }
    }

    handlePassword(event) {
        event.preventDefault();
        if (this.componentIsMounted) {
            this.setState({ password: event.target.value });
        }
    }

    handleEmail(event) {
        event.preventDefault();
        if (this.componentIsMounted) {
            this.setState({ email: event.target.value });
        }
    }

    handleContextSelection(event) {
        const { nodes, edges } = event;
        const [selectedIndex] = nodes;
        if (typeof selectedIndex === 'number') {
            this.setState({ context: selectedIndex });
        } else {
            this.setState({ context: null });
        }
    }

    handleRoleSelector(roleID) {
        if (this.componentIsMounted) {
            this.setState({ role: roleID });
        }
    }

    checkParams() {
        let error = false;
        let { email, name } = this.state;
        const { password, role, context } = this.state;

        name = name.trim();
        if (name.length === NO_ELEMENTS) {
            this.setState({
                name,
                nameError: 'Name must not be empty'
            });
            error = true;
        }

        email = email.trim();
        if (email.length === NO_ELEMENTS) {
            this.setState({
                email,
                emailError: 'Email must not be empty'
            });
            error = true;
        }

        // TODO password strenght
        if (password.length === NO_ELEMENTS) {
            this.setState({ passwordError: 'A password must be provided' });
            error = true;
        } else if (password.length < MINIMUM_PASSWORD_SIZE) {
            this.setState({ passwordError: `A password must have, at least, ${MINIMUM_PASSWORD_SIZE} characters` });
            error = true;
        }

        if (role < ROLE_FIRST_ID) {
            this.setState({ selectedTypeError: 'Bad selected type' });
            error = true;
        }

        if (context === null) {
            if (this.contextErrorAlert) {
                Alerts.close(this.contextErrorAlert);
                this.contextErrorAlert = null;
            }
            this.contextErrorAlert = Alerts.createErrorAlert('A context must be chosen from the tree');
            error = true;
        }

        return !error;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.checkParams()) {
            return;
        }

        const { onSave, resetAfterSubmit } = this.props;
        if (typeof onSave !== 'function') {
            throw new Error('onSave function not defined');
        }

        this.setState({ submitInProgress: true });
        nProgress.start();
        onSave(this.state).
        then(() => {
            if (this.componentIsMounted && resetAfterSubmit) {
                this.resetFields();
            }
            Alerts.createInfoAlert('User information successfully submitted');
        }).
        catch((error) => {
            if (this.formFetchError) {
                Alerts.close(this.formFetchError);
                this.formFetchError = null;
            }

            const { status } = error;
            let alertText = 'Error in submitting the information. Please, try again later.';
            if (status === httpCodes.UNAUTHORIZED) {
                alertText = 'You are not authorized to submit the request';
            }
            this.formFetchError = Alerts.createErrorAlert(alertText);
        }).
        then(() => {
            if (this.componentIsMounted) {
                this.setState({ submitInProgress: false });
            }
            nProgress.done();
        });
    }

    handleDelete(event) {
        event.preventDefault();

        const { onDelete } = this.props;
        if (typeof onDelete !== 'function') {
            throw new Error('onDelete function not defined');
        }

        const { suspended } = this.state;
        if (typeof suspended !== 'boolean') {
            throw new Error('Edit mode not activated');
        }

        this.setState({ submitInProgress: true });
        nProgress.start();
        onDelete(!suspended).
        then(() => {
            const statusMessage = suspended ? 'visible' : 'hidden';
            if (this.deleteInfoAlert) {
                Alerts.close(this.deleteInfoAlert);
                this.deleteInfoAlert = null;
            }
            this.deleteInfoAlert = Alerts.createInfoAlert(`User is now ${statusMessage}`);
            if (this.componentIsMounted) {
                this.setState({ suspended: !suspended });
            }
        }).
        catch((error) => {
            console.error(error);

            if (this.formFetchError) {
                Alerts.close(this.formFetchError);
                this.formFetchError = null;
            }

            const { status } = error;
            let alertText = 'Error in submitting the information. Please, try again later.';
            if (status === httpCodes.UNAUTHORIZED) {
                alertText = 'You are not authorized to submit the request';
            }
            this.formFetchError = Alerts.createErrorAlert(alertText);
        }).
        then(() => {
            if (this.componentIsMounted) {
                this.setState({ submitInProgress: false });
            }
            nProgress.done();
        });
    }

    resetFields() {
        this.setState({
            email: '',
            emailError: false,
            password: '',
            passwordError: false,
            name: '',
            nameError: false,
            role: null,
            context: null,
            submitInProgress: false,
            suspended: null
        });
        const { tree } = this.refs;
        tree.clearSelection();
    }

    render() {
        const { email, emailError, password, passwordError, name, nameError, role, context, submitInProgress, suspended } = this.state;
        const { store } = this.context;

        let deleteButton = null;
        if (this.props.onDelete) {
            let label = "Suspend User";
            if (suspended) {
                label = "Activate User";
            }
            deleteButton = <RaisedButton style={buttonStyle} label={label} secondary disabled={ submitInProgress } onTouchTap={ this.handleDelete.bind(this) } />;
        }

        return (
            <div style={mainStyle}>
                <TextField id="name" hintText="Name" floatingLabelText="Display name of the user" fullWidth
                           errorText={ nameError ? nameError : null } value={name} onChange={ this.handleName.bind(this) }
                />
                <TextField id="password" type="password" hintText="Password" floatingLabelText="User password" fullWidth
                           errorText={ passwordError ? passwordError : null } value={password} onChange={ this.handlePassword.bind(this) }
                />
                <TextField id="email" type="email" hintText="Email" floatingLabelText="User email" fullWidth
                           errorText={ emailError ? emailError : null } value={email} onChange={ this.handleEmail.bind(this) }
                />
                <Tree userContext={ getContext(store) } initialSelectedNode={context} onSelect={ this.handleContextSelection.bind(this) }/>
                <RoleSelector onSelect={ this.handleRoleSelector.bind(this) } initialRoleValue={role} />
                <div style={buttonContainerStyle}>
                    <RaisedButton style={ buttonStyle } label="Submit" primary disabled={ submitInProgress } onTouchTap={ this.handleSubmit.bind(this) }/>
                    { deleteButton }
                </div>
            </div>
        );
    }
}

UserForm.propTypes = {
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    resetAfterSubmit: PropTypes.bool
};
