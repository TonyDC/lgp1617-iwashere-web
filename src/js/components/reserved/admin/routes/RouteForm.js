import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';

import RouteMap from '../../../route/RouteMap';
import POIList from './POIList';
import Alerts from '../../../utils/Alerts';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import { blue500 as POIColor } from 'material-ui/styles/colors';

import Pin from '../../../map/Pin';

import Tags from '../../../utils/MyTags';

import 'styles/utils.scss';
import 'styles/map.scss';


const ONE_ELEMENT = 1;
const NOT_FOUND = -1;

const buttonStyle = { marginLeft: 20 };

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = { marginLeft: 30 };

const titleDividerStyle = {
    marginLeft: 30,
    width: 300
};

const mapContainerStyle = {
    height: 400,
    position: 'relative',
    width: 400
};

const SelectedLocation = (props) => {
    return <Pin lat={ props.lat } lng={ props.lng }>
        <div className="pin">
            <IconButton>
                <CommunicationLocationOn color={ POIColor }/>
            </IconButton>
        </div>
    </Pin>;
};

SelectedLocation.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
};

export default class ReservedRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPois: [],
            location: null,
            mapCoords: null
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.setState({ route: this.props.route });
    }

    componentWillReceiveProps(nextProps) {
        const { route } = nextProps;
        if (this.componentIsMounted) {
            this.setState({ route });
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchPOIs(borders) {
        const latitudeRange = borders.f,
            longitudeRange = borders.b;
        const currentMaxLat = latitudeRange.b,
            currentMaxLng = longitudeRange.f,
            currentMinLat = latitudeRange.f,
            currentMinLng = longitudeRange.b;

        if (typeof this.state.area === 'object') {
            const { maxLat, maxLng, minLat, minLng } = this.state.area;

            if (currentMinLat >= minLat && currentMaxLat <= maxLat && currentMinLng >= minLng && currentMaxLng <= maxLng) {
                return;
            }
        }

        fetch(`/api/poi/range/${currentMinLat}/${currentMaxLat}/${currentMinLng}/${currentMaxLng}`).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((response) => {
            if (!this.componentIsMounted) {
                return;
            }

            const allPois = this.state.allPois.concat(response);
            this.setState({
                allPois,
                area: {
                    maxLat: currentMaxLat,
                    maxLng: currentMaxLng,
                    minLat: currentMinLat,
                    minLng: currentMinLng
                }
            });
        }).
        catch(() => {
            if (!this.isPOIsErrorsLaunched) {
                Alerts.createErrorAlert('Error while retrieving points of interest. Please, try again later.');
                this.isPOIsErrorsLaunched = true;
            }
        });
    }

    handleName(event) {
        event.preventDefault();
        if (this.componentIsMounted) {
            this.setState({ name: event.target.value });
        }
    }

    handleAddTag(tagId) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            const tagIndex = route.tags.indexOf(tagId);
            if (tagIndex === NOT_FOUND) {
                route.tags.push(tagId);
            }
            this.setState({ route });
        }
    }

    handleRemoveTag(tagId) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            const tagIndex = route.tags.indexOf(tagId);
            if (tagIndex !== NOT_FOUND) {
                route.tags.splice(tagIndex, ONE_ELEMENT);
            }
            this.setState({ route });
        }
    }

    handleAddPoi(poiId) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            const poiIndex = route.pois.indexOf(poiId);
            if (poiIndex === NOT_FOUND) {
                route.pois.push(poiId);
            }
            this.setState({ route });
        }
    }

    handleReorderPoi(poiList) {
        if (this.componentIsMounted) {
            console.log(poiList);
            const { route } = this.state;
            route.pois = poiList;
            this.setState({ route });
        }
    }

    handleRemovePoi(poiId) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            const poiIndex = route.pois.indexOf(poiId);
            if (poiIndex !== NOT_FOUND) {
                route.pois.splice(poiIndex, ONE_ELEMENT);
            }
            this.setState({ route });
        }
    }

    handleDescription(event) {
        event.preventDefault();
        if (this.componentIsMounted) {
            const { route } = this.state;
            route.description = event.target.value;
            this.setState({ route });
        }
    }

    handleMetaInfo(event) {
        event.preventDefault();
        if (this.componentIsMounted) {
            const { route } = this.state;
            route.metaInfo = event.target.value;
            this.setState({ route });
        }
    }

    render() {
        const routeMap = <RouteMap onPoiSelected={this.handleAddPoi.bind(this)}
                                   onMapChanged={this.fetchPOIs.bind(this)}
                                   poiList={this.state.allPois}
                                   router={this.props.router} />;

        const route = this.state.route
                    ? this.state.route
                    : this.props.route;

        const poisSelected = this.state.allPois.filter((poi) => {
            return route.pois.indexOf(poi.poiId) !== NOT_FOUND;
        });

        return (
            <div style={mainStyle}>
                <div style={mainStyle}>
                    <h3 style={titleStyle}>Create Route</h3>
                    <Divider style={titleDividerStyle}/>
                    <TextField
                        hintText="Name"
                        floatingLabelText="Name of the route"
                        fullWidth
                        onChange={ this.handleName.bind(this) }
                    />
                    <TextField
                        hintText="Description"
                        floatingLabelText="Description of the route"
                        fullWidth
                        multiLine
                        onChange={ this.handleDescription.bind(this) }
                    />
                    <Tags title="Add tag..." tags={route.tags}
                          onAddTag={ this.handleAddTag.bind(this) }
                          onRemoveTag={ this.handleRemoveTag.bind(this) }
                    />
                    <TextField
                        hintText="Additional information"
                        floatingLabelText="Additional information"
                        fullWidth
                        multiLine
                        onChange={ this.handleMetaInfo.bind(this) }
                    />
                    <h5>Select points of interest</h5>
                    <Paper zDepth={2} style={mapContainerStyle}>
                        {routeMap}
                    </Paper>
                    <POIList pois={poisSelected} />
                </div>
                <RaisedButton label="Submit" style={buttonStyle} />
            </div>
        );
    }
}

ReservedRoute.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    route: {
        description: '',
        lat: null,
        lng: null,
        metaInfo: '',
        name: '',
        pois: [],
        routeId: null,
        tags: []
    },
    zoom: 17
};

ReservedRoute.propTypes = {
    center: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    router: PropTypes.object,
    title: PropTypes.string.isRequired,
    zoom: PropTypes.number.isRequired
};
