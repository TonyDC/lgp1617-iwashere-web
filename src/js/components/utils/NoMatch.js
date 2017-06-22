import React, { Component } from 'react';

import 'styles/utils.scss';
import 'styles/not_found.scss';

export default class NoMatch extends Component {

    render() {
        return (
                <div className="wrapper-fill not-found-container">
                    <div className="code-wrapper">
                        <p id="code">4<span>0</span><span>4</span></p>
                    </div>
                    <div>
                    <h2>Oops!</h2>
                    <h5>The page you were looking for could not be found...</h5>
                    </div>
                </div>
        );
    }
}
