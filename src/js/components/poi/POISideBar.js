import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import POIPreview from '../poi/POIPreview';

import 'styles/utils.scss';
import 'styles/poi_detail_side.scss';

const MINIMUM_WINDOW_SIZE = 400;

export default class POISideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            poiId: null,
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
        this.updateDimensions();
    }

    componentDidUpdate() {
        if (this.props.poiId !== this.state.poiId) {
            this.updatePoiPreview();
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
        window.removeEventListener("resize", this.resizeHandler);
        this.resizeHandler = null;
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

    updatePoiPreview() {
        if (!this.componentIsMounted) {
            return;
        }

        if (this.props.poiId !== this.state.poiId) {
            this.setState({ poiId: this.props.poiId });
        }
    }

    render() {


        let poiPreview = null;
        if (this.props.poiId === this.state.poiId) {
            poiPreview = <POIPreview poiId={this.state.poiId}
                                     router={this.props.router}
                                     onClose={this.closePoiPreview.bind(this)}
                         />;
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
    router: PropTypes.object.isRequired,
};

// To access Redux store
POISideBar.contextTypes = { store: PropTypes.object };
