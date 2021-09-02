import React, { Fragment } from "react";
import { ThemeProvider } from '../src/contexts/Theme/Theme.context';
import ThemeSelect from "./ThemeSelect";

const ThemeChanger = ({ children }) => (
        <Fragment>
            <ThemeProvider>
                <ThemeSelect>
                    {children}
                </ThemeSelect>
            </ThemeProvider>
        </Fragment>
);


export const decorators = [(Story) => <ThemeChanger><Story /></ThemeChanger>];
