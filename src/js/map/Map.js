import React, { Component } from 'react';

export default class Map extends Component {

    render() {
        let customMessage = null;
        if (this.props.location.state && this.props.location.state.registerOK) {
            customMessage = <div>Register Successful</div>;
        }

        return (
            <div>
                { customMessage }
                <div>This is a map</div>
            </div>
        );
    }
}

Map.propTypes = { location: React.PropTypes.object };
