import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridLoader as Loader } from 'halogen';
import { GridList } from "material-ui/GridList";
import { Card, CardTitle } from "material-ui/Card";
import POIMosaic from "../feed/PostMosaic";

import 'styles/route_pois.scss';

const POI_LIST_TITLE = 'Related points of interest';

export default class RoutePOIs extends Component {

    getPoiMosaics(poiList) {
        const mosaics = [];

        poiList.forEach((poi) => {
            mosaics.push(<POIMosaic
                key={poi.poiId}
                poi={poi}
                onSelect={() => {
                    this.selectMosaic(poi.poiId);
                }}
            />);
        });

        return mosaics;
    }

    selectMosaic(poiId) {
        this.props.router.push(`/poi/${poiId}`);
    }

    render() {

        let poiList =
            <div className="hor-align vert-align">
                <Loader color="#012935" className="loader"/>
            </div>;

        if (this.props.poiList) {
            poiList =
                <GridList>
                    {this.getPoiMosaics()}
                </GridList>;
        }

        return (
            <Card className="route-pois">
                <CardTitle title={POI_LIST_TITLE}/>
                {poiList}
            </Card>
        );
    }
}

RoutePOIs.propTypes = {
    poiList: PropTypes.array,
    router: PropTypes.object
};
