import { mount, shallow } from "enzyme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Btn from "./Btn";

const queryClient = new QueryClient();

it('renders btn without error', () => {
    // const wrapper = shallow(<MemoryRouter initialEntries={["/btn"]}>
    //     <Btn/>
    // </MemoryRouter>);
    const wrapper = mount(
    <QueryClientProvider client={queryClient}>
        <Btn/>
    </QueryClientProvider>
    )
    const cm = wrapper.find('[data-test="component-btn"]').text();
    // const cmAtt = cm.find('[data-test="component-btn"]');
    console.log('btn wrapper cmAtt', cm);
});
