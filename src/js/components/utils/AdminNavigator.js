import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import EditorLinearScale from 'material-ui/svg-icons/editor/linear-scale';

const ZERO_INDEX = 0;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
export default class AdminNavigator extends Component {

    constructor(props) {
        super(props);
        const { pathname } = props.router.location;
        this.paths = [
            '/reserved/dash/a',
            '/reserved/dash/b',
            '/reserved/dash/c'
        ];
        const index = this.paths.indexOf(pathname.toLowerCase());
        this.state = {
            selectedIndex: index < ZERO_INDEX
            ? ZERO_INDEX
            : index
        };
    }

    select(selectedIndex) {
        this.setState({ selectedIndex });
        let path = '/reserved/dash';
        if (selectedIndex < this.paths.length) {
            path = this.paths[selectedIndex];
        }
        this.props.router.push(path);
    }

    render() {
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="POI"
                        icon={<IconLocationOn/>}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Routes"
                        icon={<EditorLinearScale/>}
                        onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem
                        label="Accounts"
                        icon={<ActionAccountBox/>}
                        onTouchTap={() => this.select(2)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}

AdminNavigator.propTypes = { router: PropTypes.object.isRequired };
