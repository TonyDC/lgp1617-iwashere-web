import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkFetchResponse } from '../../../../functions/fetch';
import Tags from '../../../utils/MyTags';
import RouteMap from '../../../route/RouteMap';
import POIList from './POIList';
import Alerts from '../../../utils/Alerts';
import ContextTree from '../../../utils/ContextTree';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { Card, CardHeader } from "material-ui/Card";
import RaisedButton from 'material-ui/RaisedButton';
import { blue500 as DEFAULT_COLOR } from 'material-ui/styles/colors';

import 'styles/utils.scss';
import 'styles/map.scss';

const ONE_ELEMENT = 1;
const NOT_FOUND = -1;
const SELECTED_COLOR = '#E5402A';

const mainStyle = {
    margin: 40,
    paddingBottom: 40
};

const titleDividerStyle = { width: "auto" };

export default class ReservedRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPois: props.allPois,
            route: this.props.route
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchPOIs(borders) {
        const eastCorner = borders.getNorthEast(),
            westCorner = borders.getSouthWest();

        const currentMaxLat = eastCorner.lat(),
            currentMaxLng = eastCorner.lng(),
            currentMinLat = westCorner.lat(),
            currentMinLng = westCorner.lng();

        if (typeof this.state.area === 'object') {
            const { maxLat, maxLng, minLat, minLng } = this.state.area;
            if (currentMinLat >= minLat && currentMaxLat <= maxLat && currentMinLng >= minLng && currentMaxLng <= maxLng) {
                return;
            }
        }

        fetch(`/api/poi/range/${currentMinLat}/${currentMaxLat}/${currentMinLng}/${currentMaxLng}`).
        then(checkFetchResponse).
        then((pois) => {
            if (pois && this.componentIsMounted) {
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
            if (route.tags.indexOf(tagId) === NOT_FOUND) {
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

    handleAddPoi(poi) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            if (route.pois.indexOf(poi.poiId) === NOT_FOUND) {
                route.pois.push(poi.poiId);
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

    handleRemovePoi(poi) {
        if (this.componentIsMounted) {
            const { route } = this.state;
            const poiIndex = route.pois.indexOf(poi.poiId);
            if (poiIndex !== NOT_FOUND) {
                poi.color = null;
                route.pois.splice(poiIndex, ONE_ELEMENT);
                this.setState({ route });
            }
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

    handleContextSelection(event) {
        const [selectedIndex] = event.nodes;
        const { route } = this.state;
        if (this.componentIsMounted && typeof selectedIndex === 'number') {
            route.contextId = selectedIndex;
            this.setState({ route });
        }
    }

    render() {
        const route = this.state.route ? this.state.route : this.props.route;
        const routePois = [];
        route.pois.forEach((poiId) => {
            this.state.allPois.some((poi) => {
                if (poiId === poi.poiId) {
                    poi.color = SELECTED_COLOR;
                    routePois.push(poi);
                }

                return poiId === poi.poiId;
            });
        });

        const routeMap = <RouteMap onPoiSelected={this.handleAddPoi.bind(this)}
                                   onMapChanged={this.fetchPOIs.bind(this)}
                                   defaultColor={DEFAULT_COLOR}
                                   allPois={this.state.allPois}
                                   poiList={routePois}
                                   router={this.props.router}/>;

        const visibilityElement = route.routeId
                              ? <Checkbox label={route.deleted ? "Hidden" : "Visible"}
                                          checked={!route.deleted}
                                          checkedIcon={<Visibility />}
                                          uncheckedIcon={<VisibilityOff />}
                                          onCheck={this.handleDeleteStatus.bind(this)}/>
                              : null;

        const contextId = route.contextId ? route.contextId : this.props.userContext;

        return (
            <div style={mainStyle}>
                <div>
                    <h3>{this.props.title}</h3>
                    <Divider style={titleDividerStyle}/>
                    {visibilityElement}
                    <ContextTree expandable ref="tree"
                                 userContext={this.props.userContext}
                                 selectedContext={contextId}
                                 onSelect={ this.handleContextSelection.bind(this) }/>
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
                          fullWidth
                          onAddTag={this.handleAddTag.bind(this)}
                          onRemoveTag={this.handleRemoveTag.bind(this)}/>
                    <Card>
                        <CardHeader title="Points of Interest"/>
                        <Paper zDepth={2} className="route-map">
                            {routeMap}
                        </Paper>
                        <POIList pois={routePois}
                                 onDismissMosaic={this.handleRemovePoi.bind(this)}
                                 onMoveMosaic={this.handleReorderPoi.bind(this)}/>
                    </Card>
                </div>
                <div className="button-container">
                    <RaisedButton label="Save"
                                  primary
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
    allPois: [],
    inProgress: false,
    zoom: 10
};

ReservedRoute.propTypes = {
    allPois: PropTypes.array,
    inProgress: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    router: PropTypes.object,
    title: PropTypes.string.isRequired,
    userContext: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    zoom: PropTypes.number.isRequired
};
