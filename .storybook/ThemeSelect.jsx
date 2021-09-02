import React, { useEffect, useState } from 'react'
import { useTheme } from '../src/contexts/Theme/Theme.context';

export default function ThemeSelect({ children }) {
    const [selectedTheme, setselectedTheme] = useState()
    const { theme, setCurrentTheme } = useTheme();

    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme
            ? JSON.parse(savedTheme) : 'USA';
    }

    useEffect(() => {
        const currentTheme = getInitialTheme();
        setselectedTheme(currentTheme);
    }, []);

    const onThemeChange = (e) => {
        setCurrentTheme(e.target.value);
        setselectedTheme(e.target.value);
    };

    return (
        <div style={{ ...theme }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                <select value={selectedTheme} onChange={onThemeChange}>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
            </div>
            {children}
        </div>
    )
}
