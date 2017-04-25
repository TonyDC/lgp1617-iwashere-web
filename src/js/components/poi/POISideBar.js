import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import POIPreview from '../poi/POIPreview';

import 'styles/utils.scss';
import 'styles/poi_detail_side.scss';

export default class POISideBar extends Component {

    constructor(props) {
        super(props);

        this.state = { open: true };
    }

    closePoiPreview() {
        this.setState({ open: false });
    }

    render() {
        let poiPreview = null;
        if (this.props.poiId) {
            poiPreview = <POIPreview poiId={this.props.poiId}
                                     router={this.props.router}
                                     onClose={this.closePoiPreview.bind(this)}/>;
        }

        return (
            <Drawer open={this.state.open} containerClassName="side_container">
                {poiPreview}
            </Drawer>
        );
    }
}

POISideBar.propTypes = {
    poiId: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired
};

// To access Redux store
POISideBar.contextTypes = { store: PropTypes.object };
