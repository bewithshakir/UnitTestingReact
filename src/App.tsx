
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools';
import { useTheme } from './contexts/Theme/Theme.context';
import SideBarDrawer from './components/UIComponents/SideBarMenu/SideBarMenu.component';
import './AppStyle.scss';


const App = (): JSX.Element => {
  const { theme } = useTheme();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Router>

        <div style={{
          ...theme
        } as React.CSSProperties}>
          <SideBarDrawer />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
