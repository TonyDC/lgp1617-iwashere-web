import React from 'react';
import { mount } from 'enzyme';

import App from '../App';

const EXPECTED_NR_CHILDREN = 1;
const context = {
    store: {
        subscribe: (callback) => {
            return typeof callback === 'function';
        }
    }
};
const wrapper = mount(<App/>, { context });

describe('(Component) MyComponent', () => {
    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(EXPECTED_NR_CHILDREN);
    });
});
