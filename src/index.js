import React from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './js/redux/reducers';

import App from './js/App';

// Font Awesome
import 'font-awesome-webpack';

// React Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Bootstrap Social
import 'bootstrap-social';

// Custom CSS
import './styles/index.scss';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBBFDyYUUxcpXJLyqX0lzIi7EvMJ8Ygy3A",
    authDomain: "iwashere-mobile.firebaseapp.com",
    databaseURL: "https://iwashere-mobile.firebaseio.com",
    messagingSenderId: "870991185151",
    projectId: "iwashere-mobile",
    storageBucket: "iwashere-mobile.appspot.com"
};
firebase.initializeApp(firebaseConfig);

// Material Design
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Inject onTouchTap event
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Initialize Redux container
const store = createStore(reducers);

render(
    <MuiThemeProvider>
    <Provider store={store}>
        <App/>
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('main'));
