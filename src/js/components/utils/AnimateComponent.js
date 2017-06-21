import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

export default class AnimateComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    handleWaypointEnter() {
        this.setState({ visible: true });
    }

    handleWaypointLeave() {
        this.setState({ visible: false });
    }

    render() {
        const { onHideClassName, onShowClassName } = this.props;
        const { visible } = this.state;

        let content = (
            <div className={onHideClassName}>
                { this.props.children }
            </div>
        );

        if (visible) {
            content = (
                <div className={onShowClassName}>
                    { this.props.children }
                </div>
            );
        }

        return (
            <Waypoint
                onEnter={this.handleWaypointEnter.bind(this)}
                onLeave={this.handleWaypointLeave.bind(this)}
                bottomOffset={50}
            >
                { content }
            </Waypoint>
        );
    }
}

AnimateComponent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onHideClassName: PropTypes.string,
    onShowClassName: PropTypes.string
};
