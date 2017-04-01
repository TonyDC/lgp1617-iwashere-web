import React from 'react';
import { render } from 'react-dom';
import App from './js/App';

// Font Awesome
import 'font-awesome-webpack';

// React Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.css';

// Custom SASS
import './styles/index.scss';

render(<App/>, document.getElementById('main'));
