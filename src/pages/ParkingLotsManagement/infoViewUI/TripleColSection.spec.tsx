import { renderWithClient } from '../../../tests/utils';
import TripleColSection from './TripleColSection.component';

const tripleSectionCompData = {
  "heading": "Pricing",
  "type": "3-col",
  "data": {
    "Diesel": {
      "key": "Diesel",
      "subKey": "(Custom name)",
      "midValue": "16.8416",
      "endValue": "OPIS Rack"
    },
    "Regular1 Retail": {
      "key": "Regular1 Retail",
      "subKey": "(Custom name)",
      "midValue": "5.4540",
      "endValue": "OPIS Retail"
    }
  }
};


describe('load triple col section component', () => {
  it('load component', async () => {
    const result = renderWithClient(<TripleColSection data={tripleSectionCompData} />);
    expect(result.container.querySelector('.sectionBox')).toBeInTheDocument();
  });
});
