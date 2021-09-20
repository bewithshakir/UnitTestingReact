import React, { Fragment } from "react";
import { ThemeProvider, useTheme } from '../src/contexts/Theme/Theme.context';
import ThemeSelect from "./ThemeSelect";

const ThemeChanger = ({ children }) => {
    const { theme, setCurrentTheme } = useTheme();

    return (
        <Fragment>
            <ThemeProvider>
                <div style={{ ...theme }}>
                    {children}
                </div>
                {/* To Enable Theme Changer Dropdown Just comment above <div> block and uncomment <ThemeSelect> block  */}
                {/* <ThemeSelect>
                    {children}
                </ThemeSelect> */}
            </ThemeProvider>
        </Fragment>
    )
};


export const decorators = [(Story) => <ThemeChanger><Story /></ThemeChanger>];
