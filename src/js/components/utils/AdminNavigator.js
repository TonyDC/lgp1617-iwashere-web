import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ContextSelector from './ContextSelector';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import EditorLinearScale from 'material-ui/svg-icons/editor/linear-scale';

import 'styles/panel.scss';
import 'styles/utils.scss';

const ZERO_INDEX = 0;
const POI_INDEX = 0;
const ROUTE_INDEX = 1;
const USER_INDEX = 2;

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
            '/reserved/dash/poi',
            '/reserved/dash/route',
            '/reserved/dash/user'
        ];
        const index = this.paths.indexOf(pathname.toLowerCase());
        this.state = { selectedIndex: index < ZERO_INDEX ? ZERO_INDEX : index };
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
            <div>
                <Paper>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="POIs"
                            icon={<IconLocationOn/>}
                            onTouchTap={() => {
                                this.select(POI_INDEX);
                            }}
                        />
                        <BottomNavigationItem
                            label="Routes"
                            icon={<EditorLinearScale/>}
                            onTouchTap={() => {
                                this.select(ROUTE_INDEX);
                            }}
                        />
                        { /*
                        <BottomNavigationItem
                            label="Users"
                            icon={<ActionAccountBox/>}
                            onTouchTap={() => {
                                this.select(USER_INDEX);
                            }}
                        />
                        */ }
                    </BottomNavigation>
                </Paper>
                <Paper className="context-selector">
                    <ContextSelector />
                </Paper>
            </div>
        );
    }
}

AdminNavigator.propTypes = { router: PropTypes.object.isRequired };
