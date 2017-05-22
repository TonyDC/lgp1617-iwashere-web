import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from 'react-graph-vis';

var graph = {
    nodes: [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
    ],
    edges: [
        {from: 1, to: 2},
        {from: 1, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5}
    ]
};

var options = {
    layout: {
        hierarchical: true
    },
    edges: {
        color: "#000000",
        chosen: false
    }
};

var events = {
    select: function(event) {
        var { nodes, edges } = event;
        console.log(nodes);
    }
}

export default class ContextTree extends Component {

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.Network.fit();
                }} >aaaaa</button>
            <Graph ref={(a) => this.Network = a.Network } graph={graph} options={options} events={events} />
            </div>
        );
    }
}

ContextTree.propTypes = {
    userContext: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
};
