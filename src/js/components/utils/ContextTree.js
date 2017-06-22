import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import Graph from 'react-graph-vis';
import { Card, CardHeader, CardMedia } from "material-ui/Card";
import RaisedButton from 'material-ui/RaisedButton';

import { checkFetchResponse, authenticatedFetch } from '../../functions/fetch';

import 'styles/utils.scss';

const NO_ELEMENTS = 0;
const DECIMAL_BASE = 10;
const NOT_FOUND = -1;

const containerStyle = {
    display: 'inline-block',
    position: 'relative'
};
const buttonStyle = { position: 'absolute' };

export default class ContextTree extends Component {

    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.fetchData();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    processData(data) {
        if (!data || !Array.isArray(data) || data.length === NO_ELEMENTS) {
            throw new Error('Bad input data');
        }

        const nodes = data.map((element) => {
            const { contextId, name } = element;

            return {
                color: {
                    background: '#E5402A',
                    border: '#922b1e',
                    highlight: {
                        background: '#ff988a',
                        border: '#cc786c'
                    }
                },
                id: contextId,
                label: name,
                shape: 'box'
            };
        });
        const edges = data.map((element) => {
            const { contextId, parentId } = element;
            if (['undefined', 'object'].indexOf(typeof parentId) !== NOT_FOUND) {
                // NOTE: typeof null === 'object'
                // root element
                return {};
            }

            return {
                from: parentId,
                to: contextId
            };
        });

        return {
            edges,
            nodes
        };
    }

    fetchData() {
        const { userContext, selectedContext } = this.props;
        if (['number', 'string'].indexOf(typeof userContext) === NOT_FOUND) {
            throw new Error('Bad user context');
        }

        const headers = { 'X-user-context': userContext };

        return authenticatedFetch('/api/reserved/utils/child-types', null, headers, 'GET').
        then(checkFetchResponse).
        then((data) => {
            if (this.componentIsMounted) {
                const graph = this.processData(data);
                this.setState({
                    fetchOK: true,
                    graph
                }, () => {
                    if (typeof selectedContext === 'number') {
                        this.setSelected(selectedContext);
                    }
                });
            }
        }).
        catch(() => {
            if (this.componentIsMounted) {
                this.setState({ fetchOK: false });
            }
        });
    }

    getContentName(contextId) {
        let selectedContext = null;

        if (this.state.graph) {
            this.state.graph.nodes.some((context) => {
                if (parseInt(context.id, DECIMAL_BASE) === parseInt(contextId, DECIMAL_BASE)) {
                    selectedContext = context.label;
                }

                return selectedContext !== null;
            });
        }

        return selectedContext;
    }

    setSelected(contextId) {
        if (this.Network && this.componentIsMounted) {
            this.setState({ selectedContext: this.getContentName(contextId) });
            this.Network.selectNodes([contextId]);
        }
    }

    clearSelection() {
        if (this.Network) {
            this.Network.selectNodes([]);
        }
    }

    handleButton() {
        const { Network } = this;
        if (!Network) {
            return;
        }
        this.Network.fit({ animation: true });
    }

    handleGraphRef(graphRef) {
        if (!graphRef) {
            return;
        }
        this.Network = graphRef.Network;
        this.Network.selectNodes([parseInt(this.props.selectedContext, DECIMAL_BASE)]);
    }

    getGraphEvents() {
        const { onSelect } = this.props;
        if (!onSelect) {
            return {};
        }

        return { select: onSelect };
    }

    getGraphOptions() {
        return {
            edges: {
                chosen: false,
                color: "#000000"
            },
            layout: { hierarchical: true }
        };
    }

    handleExpandChange(expanded) {
        if (this.componentIsMounted) {
            this.setState({ expanded });
        }
    }

    render() {
        const { graph, fetchOK } = this.state;

        if (fetchOK) {
            return (
            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange.bind(this)}>
                <CardHeader title="Context"
                            subtitle={this.getContentName(this.props.selectedContext)}
                            actAsExpander showExpandableButton/>
                <CardMedia expandable>
                <div style={containerStyle}>
                    <RaisedButton label="Center" style={buttonStyle} onTouchTap={ this.handleButton.bind(this) }/>
                    <Graph ref={ this.handleGraphRef.bind(this) } graph={graph} options={ this.getGraphOptions() } events={ this.getGraphEvents() } />
                </div>
                    </CardMedia>
            </Card>
            );
        }

        const content = typeof fetchOK === 'boolean' ? <i className="fa fa-exclamation-triangle" aria-hidden="true"/> : <Loader/>;

        return (
            <div style={containerStyle}>
                { content }
            </div>
        );
    }
}

ContextTree.propTypes = {
    onSelect: PropTypes.func,
    selectedContext: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    userContext: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
};
