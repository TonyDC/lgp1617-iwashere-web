import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import POIPreview from '../poi/POIPreview';

import 'styles/utils.scss';
import 'styles/poi_detail_side.scss';

export default class POISideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            poiId: null
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.updatePoiPreview();
    }

    componentDidUpdate() {
        if (this.props.poiId !== this.state.poiId) {
            this.updatePoiPreview();
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
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
            <Drawer className="side-drawer" open={this.state.open} containerClassName="side-container">
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
