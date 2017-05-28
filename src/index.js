import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from './js/redux/reducers';

import App from './js/App';

// Font Awesome
import 'font-awesome-webpack';

// React Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Bootstrap Social
import 'bootstrap-social';

// Material Design
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Inject onTouchTap event
import injectTapEventPlugin from 'react-tap-event-plugin';

import { addReservedContexts } from 'js/redux/action creators/reserved';

import Checker from 'js/Checker';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Initialize Redux container
const store = process.env.NODE_ENV === 'production' ? createStore(reducers) : createStore(reducers, applyMiddleware(logger));

Checker.
then((results) => {
    const [contexts] = results;
    if (contexts) {
        const { availableContexts, selectedIndex } = contexts;
        store.dispatch(addReservedContexts(availableContexts, selectedIndex));
    }

    // Render App

    render(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Provider store={store}>
                <App/>
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('main'));

}).
catch((error) => {
    console.log(error);
});


