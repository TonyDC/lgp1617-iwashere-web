import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList } from "material-ui/GridList";
import { Card, CardTitle } from "material-ui/Card";
import POIMosaic from "../poi/POIMosaic";

const POI_LIST_TITLE = 'Points of interest';

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
            <Card>
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
