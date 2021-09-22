import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { renderHook } from "@testing-library/react-hooks"

export function useCustomHook() {
  return useQuery('customHook', () => 'Hello');
}

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('renders the component', () => {
  const component = shallow(<App />);

  it('snapshot test', () => {
    expect(component).toBeDefined();
  });

  it('react query test', async () => {
    const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual("Hello");
  });
});
