
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Suspense } from 'react';
import { useTheme } from './contexts/Theme/Theme.context';
import Page from './navigation/Page';
import SideBarDrawer from './components/UIComponents/SideBarMenu/SideBarMenu.component';


const App = ({ routes }: any) => {
  const { theme } = useTheme();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
 
        <div style={{
          ...theme
        } as React.CSSProperties}>
          <SideBarDrawer/>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default App;
