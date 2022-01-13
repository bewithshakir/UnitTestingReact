import * as React from 'react';
import { mount, shallow } from 'enzyme';
import AssetManagementLandingContent from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
// import { sortByOptions } from "./config";
const sortByOptions = [
    'assetManagement.sortBy.payment in progress',
    'assetManagement.sortBy.recently added asset',
  ];
const queryClient = new QueryClient();
describe('Rendering of Asset Management landing page Component', () => {
  const component = mount(
    <QueryClientProvider client={queryClient}>
      <AssetManagementLandingContent version='1' />
    </QueryClientProvider>
  );

  it('Asset Management landing page component Snapshot testing when', () => {
    expect(component).toMatchSnapshot();
  });

  it('Search Textbox Data Enter ', () => {
    const component = shallow(
      <QueryClientProvider client={queryClient}>
        <AssetManagementLandingContent onChange={() => jest.fn()} />
      </QueryClientProvider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});

describe('Given Sortby Menu on Asset Management landing Page', () => {
  test('Render Sortby Menu', () => {
    const AssetSortbyMenu = shallow(
      <SortbyMenu
        options={sortByOptions.map((sortByItem) => sortByItem)}
        onSelect={() => jest.fn()}
      />
    );
    expect(AssetSortbyMenu).toMatchSnapshot();
  });

  test('Sortby Menu Menu With Options', () => {
    const AssetSortbyMenu = shallow(
      <SortbyMenu
        options={sortByOptions.map((sortByItem) => sortByItem)}
        onSelect={() => jest.fn()}
      />
    );
    AssetSortbyMenu.find('.btn-sortby').simulate('click');
    expect(AssetSortbyMenu.find('.btn-sortby').hasClass('active')).toBe(true);
    expect(AssetSortbyMenu.find('.sortby-popper').exists()).toBe(true);
  });
});
