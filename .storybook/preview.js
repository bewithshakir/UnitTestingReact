import react from "react";
import { ThemeProvider, useTheme } from '../src/contexts/Theme/Theme.context';
 
const ThemeChanger = ({ children }) => {
 const { theme, setCurrentTheme } = useTheme();
 
 const onThemeChange = (value) => {
 setCurrentTheme(value);
 };
 
 return (
 <>
 <ThemeProvider>
 <div style={{...theme}}>    
 <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ccc', marginBottom: '10px'}}>
 <select defaultValue="USA" onChange={onThemeChange}>
 <option value="USA">USA</option>
 <option value="UK">UK</option>
 </select>
 </div>
 {children}
 </div>
 </ThemeProvider>
 </>
 );
};
 
export const decorators = [(Story) => <ThemeChanger><Story /></ThemeChanger>];