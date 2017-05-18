import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import Tags from '../../../utils/MyTags';
import RouteMap from '../../../route/RouteMap';
import POIList from './POIList';
import Alerts from '../../../utils/Alerts';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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

export default class ReservedRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPois: [],
            location: null,
            mapCoords: null,
            route: this.props.route
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillReceiveProps(nextProps) {
        const { route } = nextProps;
        if (this.componentIsMounted && !this.propsReceived) {
            this.propsReceived = true;
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
        then((pois) => {
            if (!this.componentIsMounted) {
                return;
            }

            const { allPois } = this.state;
            const poiIds = this.state.allPois.map((poi) => {
                return poi.poiId;
            });
            pois.forEach((poi) => {
                if (poiIds.indexOf(poi.poiId) === NOT_FOUND) {
                    allPois.push(poi);
                }
            });

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
            const { route } = this.state;
            route.name = event.target.value;
            this.setState({ route });
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
            const { route } = this.state;
            route.pois = poiList.map((poi) => {
                return poi.poiId;
            });
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
        const route = this.state.route
            ? this.state.route
            : this.props.route;

        const routePois = this.state.allPois.filter((poi) => {
            return route.pois.indexOf(poi.poiId) !== NOT_FOUND;
        });

        const routeMap = <RouteMap onPoiSelected={this.handleAddPoi.bind(this)}
                                   onMapChanged={this.fetchPOIs.bind(this)}
                                   poiList={this.state.allPois}
                                   router={this.props.router}
                                   zoom={0}/>;

        return (
            <div style={mainStyle}>
                <div style={mainStyle}>
                    <h3 style={titleStyle}>{this.props.title}</h3>
                    <Divider style={titleDividerStyle}/>
                    <TextField hintText="Name"
                               floatingLabelText="Name of the route"
                               fullWidth
                               value={route.name}
                               onChange={this.handleName.bind(this)}/>
                    <TextField hintText="Description"
                               floatingLabelText="Description of the route"
                               fullWidth
                               defaultValue={route.description}
                               multiLine
                               onChange={this.handleDescription.bind(this)}/>
                    <Tags title="Add tag..."
                          tags={route.tags}
                          onAddTag={this.handleAddTag.bind(this)}
                          onRemoveTag={this.handleRemoveTag.bind(this)}/>
                    <TextField hintText="Additional information"
                               floatingLabelText="Additional information"
                               fullWidth
                               multiLine
                               onChange={ this.handleMetaInfo.bind(this) }/>
                    <h5>Select points of interest</h5>
                    <Paper zDepth={2} style={mapContainerStyle}>
                        {routeMap}
                    </Paper>
                    <POIList pois={routePois}
                             onSelectMosaic={this.handleAddPoi.bind(this)}
                             onDismissMosaic={this.handleRemovePoi.bind(this)}
                             onMoveMosaic={this.handleReorderPoi.bind(this)}/>
                </div>
                <RaisedButton label="Submit"
                              style={buttonStyle}
                              onTouchTap={() => {
                                  this.props.onSave(this.state.route);
                              }} />
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
