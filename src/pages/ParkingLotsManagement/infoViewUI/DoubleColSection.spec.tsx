import { renderWithClient } from '../../../tests/utils';
import TwoColSection from './TwoColSection.component';

const doubleSectionCompData = {
  "heading": "Lot Details",
  "type": "2-col",
  "data": {
    "Lot Name": "Barun Demo 5",
    "Name": "Barun Demo 5",
    "Address": "77 Green Acres Rd S,  Green Acres Rd S,,   Green Acres Rd S, USA",
    "City": "Valley Stream",
    "State": "NY",
    "Zip Code": "11581"
  }
};

describe('load double col section component', () => {
  it('load component', async () => {
    const result = renderWithClient(<TwoColSection data={doubleSectionCompData} />);
    expect(result.container.querySelector('.sectionBox')).toBeInTheDocument();
  });
});