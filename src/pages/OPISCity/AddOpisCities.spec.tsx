import { mount } from 'enzyme';
import Add from "./AddOpisCities";
import { QueryClient, QueryClientProvider } from 'react-query';
import Select from '../../components/UIComponents/Select/SingleSelect';
import Input from '../../components/UIComponents/Input/Input';
import { Button } from '../../components/UIComponents/Button/Button.component';

const queryClient = new QueryClient();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));


describe('Given OPIS Add Page', () => {
    const Page = mount(<QueryClientProvider client={queryClient}>
        <Add version="Breadcrumbs-Single" />
    </QueryClientProvider>
    );
    it('Page contain  2-Select, 1-Input, 2-Button elements', () => {
        expect(Page.find(Select)).toBeDefined();
        expect(Page.find(Select)).toHaveLength(2);
        expect(Page.find(Input)).toBeDefined();
        expect(Page.find(Input)).toHaveLength(1);
        expect(Page.find(Input).prop('disabled')).toBe(true);
        expect(Page.find(Button)).toBeDefined();
        expect(Page.find(Button)).toHaveLength(2);
        expect(Page.find(Button).at(1).prop('disabled')).toBe(true);
    });
});

