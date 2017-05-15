import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList } from "material-ui/GridList";
import { Card, CardTitle } from "material-ui/Card";
import POIMosaic from "./POIMosaic";

import 'styles/route_pois.scss';

export default class POIList extends Component {

    getPoiMosaics(poiList) {
        const mosaics = [];

        poiList.forEach((poi) => {
            mosaics.push(<POIMosaic
                key={poi.poiId}
                poi={poi}
                onSelect={() => {
                    if (typeof this.props.onSelectMosaic === 'undefined') {
                        this.selectMosaic(poi.poiId);
                    } else {
                        this.props.onSelectMosaic(poi.poiId);
                    }
                }}
                onDismiss={() => {
                    if (typeof this.props.onDismissMosaic !== 'undefined') {
                        this.props.onDismissMosaic(poi.poiId);
                    }
                }}
            />);
        });

        return mosaics;
    }

    selectMosaic(poiId) {
        // TODO change to open new tab
        this.props.router.push(`/poi/${poiId}`);
    }

    render() {
        return (
            <Card className="route-pois">
                <CardTitle title={ this.props.title }/>
                <GridList>
                    {this.getPoiMosaics(this.props.pois)}
                </GridList>
            </Card>
        );
    }
}

POIList.defaultProps = { title: "Points of Interest" };

POIList.propTypes = {
    onDismissMosaic: PropTypes.func,
    onSelectMosaic: PropTypes.func,
    pois: PropTypes.array,
    router: PropTypes.object,
    title: PropTypes.string
};
