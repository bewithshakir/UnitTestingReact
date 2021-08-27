import React from 'react';
import { shallow } from 'enzyme';
import App from './App';


describe('renders the component', () => {
  const component = shallow(<App />);

  it('snapshot test', () => {
  expect(component).toMatchSnapshot();
  });
});
