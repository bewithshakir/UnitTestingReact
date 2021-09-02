import { useState } from "react";
import { ThemeProvider, useTheme } from '../src/contexts/Theme/Theme.context';

const ThemeChanger = ({ children }) => {
    const [themeContext, setTheme] = useState('USA');
    const { theme } = useTheme();
    const onThemeChange = (value) => {
        setTheme(value);
    };

    return (
        <>
            <ThemeProvider theme={themeContext}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                    <select defaultValue="USA" onChange={onThemeChange}>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                    </select>
                </div>
                {children}
            </ThemeProvider>
        </>
    );
};

export const decorators = [(Story) => <ThemeChanger><Story style={{ ...useTheme().theme }} /></ThemeChanger>];