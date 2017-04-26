import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import POIPreview from '../poi/POIPreview';

import 'styles/utils.scss';
import 'styles/poi_detail_side.scss';

const MINIMUM_WINDOW_SIZE = 700;

export default class POISideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            size: '30%'
        };
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        this.componentIsMounted = true;
        
        // The same function object must be used when binding and unbinding the event listener
        this.resizeHandler = this.updateDimensions.bind(this);
        window.addEventListener("resize", this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
        this.resizeHandler = null;
        this.componentIsMounted = false;
    }

    updateDimensions() {
        let size = '30%';

        if (window.innerWidth < MINIMUM_WINDOW_SIZE) {
            size = '100%';
        }

        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ size });
    }

    closePoiPreview() {
        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ open: false });
        this.props.onClose();
    }

    render() {
        let poiPreview = null;
        if (this.props.poiId) {
            poiPreview = <POIPreview poiId={this.props.poiId}
                                     router={this.props.router}
                                     onClose={this.closePoiPreview.bind(this)}/>;
        }

        return (
            <Drawer className="side-drawer" open={this.state.open} containerClassName="side-container" width={this.state.size}>
                {poiPreview}
            </Drawer>
        );
    }
}

POISideBar.propTypes = {
    onClose: PropTypes.func.isRequired,
    poiId: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired
};

// To access Redux store
POISideBar.contextTypes = { store: PropTypes.object };
