
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'
import {  Suspense } from 'react';
import { RouteConfig } from  "./infrastructure/RoutesConfigHelper"
import { routes } from './routes';


const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Suspense fallback={<>Loading...</>}>   
          <Switch>
          {routes.map((route:any, i) => (
            <RouteConfig key={i} {...route} />
          ))}
          </Switch> 
        </Suspense>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default App



