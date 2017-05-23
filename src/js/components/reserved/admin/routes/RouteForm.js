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
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { Card, CardHeader } from "material-ui/Card";
import RaisedButton from 'material-ui/RaisedButton';

import 'styles/utils.scss';
import 'styles/map.scss';

const ONE_ELEMENT = 1;
const NOT_FOUND = -1;

const mainStyle = {
    margin: 40,
    paddingBottom: 40
};

const titleDividerStyle = { width: "auto" };

export default class ReservedRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPois: [],
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

        // TODO pass context?
        fetch(`/api/poi/range/${currentMinLat}/${currentMaxLat}/${currentMinLng}/${currentMaxLng}`).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((pois) => {
            if (this.componentIsMounted) {
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
            }
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
                this.setState({ route });
            }
        }
    }

    handleRemoveTag(tagId) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            const tagIndex = route.tags.indexOf(tagId);
            if (tagIndex !== NOT_FOUND) {
                route.tags.splice(tagIndex, ONE_ELEMENT);
                this.setState({ route });
            }
        }
    }

    handleAddPoi(poiId) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            const poiIndex = route.pois.indexOf(poiId);
            if (poiIndex === NOT_FOUND) {
                route.pois.push(poiId);
                this.setState({ route });
            }
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

    handleDeleteStatus(event, deletedStatus) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            route.deleted = !deletedStatus;

            this.props.onDelete(route, (success) => {
                if (!success) {
                    route.deleted = !route.deleted;
                }

                this.setState({ route });
            });
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

        let visibilityElement = null;
        if (route.routeId) {
            const visibilityLabel = route.deleted
                                  ? "Hidden"
                                  : "Visible";
            visibilityElement =
                <Checkbox
                    label={visibilityLabel}
                    checked={!route.deleted}
                    checkedIcon={<Visibility />}
                    uncheckedIcon={<VisibilityOff />}
                    onCheck={this.handleDeleteStatus.bind(this)}/>;
        }

        return (
            <div style={mainStyle}>
                <div>
                    <h3>{this.props.title}</h3>
                    <Divider style={titleDividerStyle}/>
                    {visibilityElement}
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
                    <Card>
                        <CardHeader subtitle={ "Add Points of Interest..." }/>
                        <Paper zDepth={2} className="route-map">
                            {routeMap}
                        </Paper>
                        <POIList pois={routePois}
                                 onSelectMosaic={this.handleAddPoi.bind(this)}
                                 onDismissMosaic={this.handleRemovePoi.bind(this)}
                                 onMoveMosaic={this.handleReorderPoi.bind(this)}/>
                    </Card>
                </div>
                <div className="button-container">
                    <RaisedButton label="Save"
                                  disabled={this.props.inProgress}
                                  className="button-style"
                                  onTouchTap={() => {
                                      this.props.onSave(this.state.route);
                                  }} />

                    <RaisedButton label="Cancel"
                                  className="button-style"
                                  disabled={this.props.inProgress}
                                  onTouchTap={() => {
                                      this.props.router.push('/reserved/dash/route');
                                  }} />
                </div>
            </div>
        );
    }
}

ReservedRoute.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    inProgress: false,
    zoom: 10
};

ReservedRoute.propTypes = {
    center: PropTypes.object.isRequired,
    inProgress: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    router: PropTypes.object,
    title: PropTypes.string.isRequired,
    zoom: PropTypes.number.isRequired
};
