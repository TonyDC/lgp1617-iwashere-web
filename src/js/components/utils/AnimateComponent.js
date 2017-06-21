import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { Motion, spring } from 'react-motion';

import 'styles/animations.scss';

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
        const { visible } = this.state;

        let content = (
            <div style={{ opacity: 0 }}>
                { this.props.children }
            </div>
        );

        if (visible) {
            content = (
                <div>
                    <Motion defaultStyle={{ xPos: 0 }} style={{ xPos: spring(1, { stiffness: 120, damping: 10, precision: 0.001 }) }}>
                        { (interpolationParameters) => {
                            return (<div style={{ transform: `scale(${interpolationParameters.xPos})` }}>
                                { this.props.children }
                            </div>);
                        }}
                    </Motion>
                </div>
            );
        }

        return (
            <Waypoint
                onEnter={this.handleWaypointEnter.bind(this)}
                onLeave={this.handleWaypointLeave.bind(this)}
            >
                { content }
            </Waypoint>
        );
    }
}

AnimateComponent.propTypes = { children: PropTypes.object };
