
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


const App = ({ routes }: any) => {
  const { theme } = useTheme();
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div style={{
          ...theme
        } as React.CSSProperties}>
          <Suspense fallback={<>Loading...</>}>
            <Switch>
              {routes.map((route: any) => (
                <Route key={route.path} path={route.path} exact={route.exact}>
                  <Page route={route} />
                </Route>
              ))}
            </Switch>
          </Suspense>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default App;
