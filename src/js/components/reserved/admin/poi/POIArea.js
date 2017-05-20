import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

import ActionSearch from 'material-ui/svg-icons/action/search';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const dividerStyle = {
    marginTop: 30,
    marginBottom: 10,
    width: 'auto'
};

export default class POIArea extends Component {

    constructor(props) {
        super(props);
        this.state = { searchText: '' };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleSearch(event) {
        event.preventDefault();
        if (this.componentIsMounted) {
            this.setState({ searchText: event.target.value });
        }
    }

    // TODO a pesquisa de POIs deve ter em atenção o contexto com que o utilizador se está a autenticar
    submitSearch(event) {
        event.preventDefault();

        fetch(`/api/poi/search?query=${query}`, {
            headers: { 'Accept': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        });
    }

    handleCreatePOI(event) {
        event.preventDefault();
        this.props.router.push('/reserved/dash/poi/create');
    }

    render() {
        const { searchText } = this.state;

        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - POI area</title>
                </Helmet>
                <div style={mainStyle}>
                        <h4>Search for an existing Point of Interest</h4>
                        { /* TODO autocomplete component */ }
                        <TextField
                            id="search-poi-text-field"
                            hintText="Keywords"
                            floatingLabelText="Search for POI"
                            fullWidth
                            multiLine
                            value={ searchText }
                            onChange={ this.handleSearch.bind(this) }
                        />
                    { /*
                    <AutoComplete
                        floatingLabelText="Search for Points of Interest"
                        hintText="Keywords"
                        openOnFocus
                        filter={AutoComplete.noFilter}
                        dataSource={null}
                        dataSourceConfig={null}
                        onChange={ this.handleSearch.bind(this) }
                    />
                    */ }
                        <RaisedButton type="submit" label="Submit" icon={<ActionSearch/>} onTouchTap={ this.submitSearch.bind(this) } />
                        <Divider style={dividerStyle}/>
                        <h4>or create a new Point of Interest</h4>
                        <RaisedButton label="Create POI" icon={<MapsAddLocation/>} onTouchTap={ this.handleCreatePOI.bind(this) } />
                </div>
            </Paper>
        );
    }
}

POIArea.propTypes = { router: PropTypes.object.isRequired };
