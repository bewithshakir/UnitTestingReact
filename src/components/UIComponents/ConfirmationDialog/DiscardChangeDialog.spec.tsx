import { shallow } from 'enzyme';
import DiscardDialog from './DiscardChangesDialog.component';

describe('renders discard dialog properly', () => {
    let discardDialog
    const discardClick = jest.fn();
    const noClick = jest.fn();
    beforeAll(() => {        
        discardDialog = shallow(
            <DiscardDialog
                title='Discard dialog'
                content='content'
                open={true}
                handleConfirm={() => discardClick()}
                handleToggle={() => noClick()}
            />);
    })

    it('snapshot testing', ()=>{
        expect(discardDialog).toMatchSnapshot();
    });
    it('verifies the main class exists',()=>{
       expect(discardDialog.find('.discard-dialog-container')).toBeDefined();
    });
    it('verifies Action buttons present', ()=>{
        expect(discardDialog.find('.action-yes')).toHaveLength(1);
        expect(discardDialog.find('.action-no')).toHaveLength(1);
    });
    it('verifies discard click', ()=>{
        const discardBtn = discardDialog.find('.action-yes');
        discardBtn.simulate('click');
        expect(discardClick).toHaveBeenCalled();
    });
    it('verifies cancel click', ()=>{
        const cancelBtn = discardDialog.find('.action-no');
        cancelBtn.simulate('click');
        expect(noClick).toHaveBeenCalled();
    });
})