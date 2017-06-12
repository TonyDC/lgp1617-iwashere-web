/* eslint no-process-env: "off" */

import React from 'react';
import Async from 'react-code-splitting';

export const AdminShell = (props) => {
    return <Async load={ import('../utils/AdminShell') } componentProps={props}/>;
};
export const POIArea = (props) => {
    return <Async load={ import('../reserved/admin/poi/POIArea') } componentProps={props}/>;
};
export const CreatePOI = (props) => {
    return <Async load={ import('../reserved/admin/poi/CreatePOI') } componentProps={props}/>;
};
export const EditPOI = (props) => {
    return <Async load={ import('../reserved/admin/poi/EditPOI') } componentProps={props}/>;
};
export const RouteArea = (props) => {
    return <Async load={ import('../reserved/admin/routes/RouteArea') } componentProps={props}/>;
};
export const CreateRoute = (props) => {
    return <Async load={ import('../reserved/admin/routes/CreateRoute') } componentProps={props}/>;
};
export const EditRoute = (props) => {
    return <Async load={ import('../reserved/admin/routes/EditRoute') } componentProps={props}/>;
};


export const Register = (props) => {
    return <Async load={ import('../user/Register') } componentProps={props}/>;
};
export const PasswordReset = (props) => {
    return <Async load={ import('../user/PasswordReset') } componentProps={props}/>;
};
