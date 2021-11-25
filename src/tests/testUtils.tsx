import { shallow } from "enzyme";
import { createMemoryHistory } from "history";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "react-router-dom";
import { i18n } from "../i18n/i18n";

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
        history.push(route);
    }
    return (
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <Router history={history}>
                    {props.children}
                </Router>
            </I18nextProvider>
        </QueryClientProvider>
    );
};


export const renderWithRouter = (renderComponent: any, route: any) => {
    const history = createMemoryHistory();
  
    if(route){
      history.push(route)
    }
  
    return {
      ...shallow(<Router history={history}>{renderComponent()}</Router>), history
    }
};