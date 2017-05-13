import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const style = {
    border: '1px solid #000'
}

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const layout = { lg: [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ], md: [
            {i: 'a', x: 0, y: 0, w: 1, h: 1, static: true},
            {i: 'b', x: 1, y: 0, w: 1, h: 1, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 1}
        ], sm: [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ], xs: [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 0, y: 2, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 0, y: 4, w: 1, h: 2}
        ], xxs: [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 0, y: 2, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 0, y: 4, w: 1, h: 2}
        ]
    };

        return (
            <ResponsiveReactGridLayout layout={layout}
                                       breakpoints={{lg: 1200, md: 906, sm: 768, xs: 480, xxs: 0}}
                                       cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                <div style={style} key="a"  onClick={() => console.log('asd')}>a</div>
                <div style={style} key="b" >b</div>
                <div style={style} key="c" >c</div>
            </ResponsiveReactGridLayout>
        );
    }
};

Dashboard.propTypes = { router: PropTypes.object };
