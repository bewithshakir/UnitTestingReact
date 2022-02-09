// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { setupServer } from 'msw/node';
import { handlers } from './tests/utils';
import { setLogger } from 'react-query';

Enzyme.configure({ adapter: new Adapter() });

export const serverMsw = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => serverMsw.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => serverMsw.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => serverMsw.close());

// Turn off network error logging. 
// When testing we want to suppress network errors being logged to the console.
// silence react-query errors
setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
});

jest.mock("react-i18next", () => ({
    useTranslation: () => ({ 
        t: (key: any) => key,
        i18n: { changeLanguage: jest.fn() }
    }),
    Trans: ({ children }: any) => children
}));

