import React from 'react';
import { useTheme } from './contexts/Theme/Theme.context';
import { Content } from './components/UIComponents/Content/Content.component';
import { Footer } from './components/UIComponents/Footer/Footer.component';
import bg from './assets/images/bg_shapes.svg';
import { useQuery } from 'react-query';
import { fetchQueryTodos } from './actions/todos-with-query';
import { QueryComponent } from './containers/QueryTest';
import Home from './containers/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const {  data } = useQuery('repoData', fetchQueryTodos)
  console.log(data)
  const { theme } = useTheme();
  return (
    <Router>
    <div className="App"
      style={{
        ...theme
      } as React.CSSProperties}
    >
        <ul>
          <li>
            <Link to="/queryTestData">Query Data</Link>
          </li>
        </ul>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/queryTestData">
            <QueryComponent />
          </Route>
        </Switch>
    </div>
    </Router>
  )
}

export default App



