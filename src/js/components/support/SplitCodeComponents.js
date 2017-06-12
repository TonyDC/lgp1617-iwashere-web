import React from 'react';
import Async from 'react-code-splitting';

export const POIArea = (props) => {
    return <Async load={ import('./components/reserved/admin/poi/POIArea') } componentProps={props}/>;
};
export const CreatePOI = (props) => {
    return <Async load={ import('./components/reserved/admin/poi/CreatePOI') } componentProps={props}/>;
};
export const EditPOI = (props) => {
    return <Async load={ import('./components/reserved/admin/poi/EditPOI') } componentProps={props}/>;
};
export const RouteArea = (props) => {
    return <Async load={ import('./components/reserved/admin/routes/RouteArea') } componentProps={props}/>;
};
export const CreateRoute = (props) => {
    return <Async load={ import('./components/reserved/admin/routes/CreateRoute') } componentProps={props}/>;
};
export const EditRoute = (props) => {
    return <Async load={ import('./components/reserved/admin/routes/EditRoute') } componentProps={props}/>;
};


export const Register = (props) => {
    return <Async load={ import('./components/user/Register') } componentProps={props}/>;
};
export const PasswordReset = (props) => {
    return <Async load={ import('./components/user/PasswordReset') } componentProps={props}/>;
};
