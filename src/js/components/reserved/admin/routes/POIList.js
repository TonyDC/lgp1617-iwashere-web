import React, { Component } from "react";
import PropTypes from "prop-types";
import DragSortableList from 'react-drag-sortable';
import { Card, CardTitle } from "material-ui/Card";
import POIMosaic from "./POIMosaic";

import 'styles/route_pois.scss';

export default class POIList extends Component {

    getPoiMosaic(poi) {
        return (<POIMosaic
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
    }

    selectMosaic(poiId) {
        this.props.router.push(`/poi/${poiId}`);
    }

    render() {
        const poiList = this.props.pois.map((poi) => {
            return {
                content: this.getPoiMosaic(poi),
                poi
            };
        });

        return (
            <Card>
                <CardTitle title={ this.props.title }/>
                <DragSortableList items={poiList}
                                  type="grid"
                                  onSort={(newList) => {
                                      this.props.onMoveMosaic(newList.map((entry) => {
                                          return entry.poi;
                                      }));
                                  }}
                />
            </Card>
        );
    }
}

POIList.defaultProps = { title: "Points of Interest" };

POIList.propTypes = {
    onDismissMosaic: PropTypes.func,
    onMoveMosaic: PropTypes.func,
    onSelectMosaic: PropTypes.func,
    pois: PropTypes.array,
    router: PropTypes.object,
    title: PropTypes.string
};
