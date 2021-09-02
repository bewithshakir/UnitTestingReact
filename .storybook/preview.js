import React from "react";
import { ThemeProvider, useTheme } from '../src/contexts/Theme/Theme.context';
import ThemeSelect from "./ThemeSelect";

const ThemeChanger = ({ children }) => {
    const { theme } = useTheme();

    return (
        <>
            <ThemeProvider>
                <ThemeSelect>
                    {children}
                </ThemeSelect>
            </ThemeProvider>
        </>
    );
};

export const decorators = [(Story) => <ThemeChanger><Story /></ThemeChanger>];
