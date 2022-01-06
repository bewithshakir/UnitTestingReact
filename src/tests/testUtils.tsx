import { shallow } from "enzyme";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "react-router-dom";

/**
 * Returns node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute to search. 
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper: any, val: any)=> wrapper.find(`[data-test="${val}"]`);

export const findByIdAttr = (wrapper: any, val: any)=> wrapper.find(`#${val}`);

export const HOCSetup = (props: any, route: any)=> {
    const queryClient = new QueryClient();
    const history = createMemoryHistory();
    if (route) {
        history(route);
    }
    return (
        <QueryClientProvider client={queryClient}>
                <Router history={history}>
                    {props.children}
                </Router>
        </QueryClientProvider>
    );
};


export const renderWithRouter = (renderComponent: any, route: any) => {
    const navigate = createMemoryHistory();
  
    if(route){
        navigate(route);
    }
  
    return {
      ...shallow(<Router history={history}>{renderComponent()}</Router>), history
    };
};