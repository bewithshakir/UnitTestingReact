import React, { useEffect, useState } from 'react'
import { useTheme } from '../src/contexts/Theme/Theme.context';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  


export default function ThemeSelect({ children }) {
    const classes = useStyles();
    const [selectedTheme, setselectedTheme] = useState('USA')
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
            <FormControl variant='filled' className={classes.formControl}>
            <InputLabel id="select-label">Theme</InputLabel>
            <Select
                labelId="select-label"
                id="open-select"
                value={selectedTheme}
                onChange={onThemeChange}
            >
           <MenuItem value="USA">USA</MenuItem>
           <MenuItem value="UK">UK</MenuItem>
           </Select>
           </FormControl>
            </div>
            {children}
        </div>
    )
}
