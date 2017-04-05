import React from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';

import App from './js/App';

// Font Awesome
import 'font-awesome-webpack';

// React Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Bootstrap Social
import 'bootstrap-social';

// Custmom CSS
import './styles/utils.scss';
import './styles/index.scss';
import 'styles/navbar.scss';

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

render(<App/>, document.getElementById('main'));
