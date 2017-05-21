import React from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './js/redux/reducers';

import App from './js/App';
import Checker from './js/Checker';

// Font Awesome
import 'font-awesome-webpack';

// React Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Bootstrap Social
import 'bootstrap-social';

// Custom CSS
import './styles/index.scss';

// Initialize Firebase
import { FIREBASE_CONFIG } from '../config';
firebase.initializeApp(FIREBASE_CONFIG);

// Material Design
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Inject onTouchTap event
import injectTapEventPlugin from 'react-tap-event-plugin';

import Test from './js/components/reserved/Dashboard';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Initialize Redux container
const store = createStore(reducers);

render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
        <Checker>
            <App/>
        </Checker>
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('main'));
