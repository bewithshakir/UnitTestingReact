import { shallow } from 'enzyme';
import FileUploadComponent from './FileUpload.component';

describe('Rendering of File Upload Component', () => {

    it('File Upload component Snapshot testing', () => {
        const component = shallow(<FileUploadComponent onDrop={() => { }} />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('Renders children properly', () => {
        const component = shallow((<FileUploadComponent onDrop={() => { }}>
            <button>Browse</button>
        </FileUploadComponent>));
        
        expect(component).toBeDefined();
        expect(component.contains(<button>Browse</button>)).toBeTruthy();
    });

});