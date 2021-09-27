import React from 'react';
import { shallow } from 'enzyme';
import Input from './SearchInput';

describe('Rendering of Search Input Component', () => {

    const component = shallow(<Input/>);

    it('Search Input Snapshot testing', () => {
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

});