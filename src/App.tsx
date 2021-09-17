import React from 'react';
import { useTheme } from './contexts/Theme/Theme.context';
import { Content } from './components/UIComponents/Content/Content.component';
import { Footer } from './components/UIComponents/Footer/Footer.component';
import bg from './assets/images/bg_shapes.svg';
import { useQuery } from 'react-query';
import { fetchQueryTodos } from './actions/todos-with-query';
import { QueryComponent } from './QueryTest';

const App = () => {
  const {  data } = useQuery('repoData', fetchQueryTodos)
  console.log(data)
  const { theme } = useTheme();
  return (
    <div className="App"
      style={{
        ...theme
      } as React.CSSProperties}
    >
      <div>
        <div className={'app__main'}>
          <Content />
          <Footer />
        </div>
        <div className={'app__bg'}>
          <img src={bg} alt={'bg'} />
        </div>
      </div>
      <QueryComponent />
    </div>
  )
}

export default App



