import React, { useState } from "react"
import useTimeout from "./useTimeout"
import { shallow } from 'enzyme';

type props = {
    value : number;
}

//example
function TimeoutComponent(props : props) {
    const [count, setCount] = useState(10)
    const { clear, reset } = useTimeout(() => setCount(props.value), 1000)

    return (
        <div>
            <div className={`d-${count}`}>{count}</div>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <button onClick={clear}>Clear Timeout</button>
            <button onClick={reset}>Reset Timeout</button>
        </div>
    )
}

//testcases
describe('renders the component with the values provided above', () => {
    const component = shallow(<TimeoutComponent value={0} />);
    const component1 = shallow(<TimeoutComponent value={1} />);

    it('test initial rendering', ()=> {
        setTimeout(() => {
            expect(component.find('.d-0').length).toEqual(0);
            expect(component1.find('.d-10').length).toEqual(10);
        }, 1001);
    });

    it('test on click of Increment', () => {
        component.find('button').at(0).simulate('click')
        setTimeout(() => {
            expect(component.find('.d-1').length).toEqual(1);
            expect(component1.find('.d-11').length).toEqual(11);
        }, 1001);
        
    });

    it('test on click of clear', async() => {
        component.find('button').at(1).simulate('click');
        setTimeout(() => {
            expect(component.find('.d-0').length).toEqual(0);
            expect(component1.find('.d-10').length).toEqual(10);
        }, 1001);
    });

    it('test on click of reset', () => {
        component.find('button').at(2).simulate('click')
        setTimeout(() => {
            expect(component.find('.d-0').length).toEqual(0);
            expect(component1.find('.d-10').length).toEqual(10);
        }, 1001);
    });
});
