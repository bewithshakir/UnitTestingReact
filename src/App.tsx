import React from 'react';
import { useTheme } from './contexts/Theme/Theme.context';
import { Content } from './components/UIComponents/Content/Content.component';
import { Footer } from './components/UIComponents/Footer/Footer.component';
import { useQuery } from 'react-query';
import { fetchQueryTodos } from './actions/todos-with-query';
import { QueryComponent } from './QueryTest';
import HorizontalBar from './components/UIComponents/NevigationBar/HorizontalBar';

const App = () => {
  const { data } = useQuery('repoData', fetchQueryTodos)
  console.log(data)
  const { theme } = useTheme();

  function onClickBack() {
    // history.push('/customer');
  }

  return (
    <div className="App"
      style={{
        ...theme
      } as React.CSSProperties}
    >
      <div>
        <div className={'app__main'}>
          <HorizontalBar
            version='v3'
            onBack={onClickBack}
          />
          <Content />
          <Footer />
        </div>
      </div>
      <QueryComponent />
    </div>
  )
}

export default App



