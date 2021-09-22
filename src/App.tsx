import React, { useState, useEffect } from 'react';
import { useTheme } from './contexts/Theme/Theme.context';
import { Content } from './components/UIComponents/Content/Content.component';
import { Footer } from './components/UIComponents/Footer/Footer.component';
import Input from './components/UIComponents/Input/Input';
import Select from './components/UIComponents/Select/dropdown';
import SearchInput from './components/UIComponents/SearchInput/SearchInput';
import useDebounce from './utils/useDebounce';
import bg from './assets/images/bg_shapes.svg';
import { useQuery } from 'react-query';
import { fetchQueryTodos } from './actions/todos-with-query';
import { QueryComponent } from './QueryTest';

const App = () => {
  const { data } = useQuery('repoData', fetchQueryTodos)
  console.log(data)
  const { theme } = useTheme();
  const [form, setForm] = useState({ userName: '', email: '', item: '', searchTerm: '' });
  const debouncedValue = useDebounce<string>(form.searchTerm, 1000);
  const items = [
    { label: 'Amazon', value: 'Amazon' },
    { label: 'Nike', value: 'Nike' },
    { label: 'Flipkart', value: 'Flipkart' },
    { label: 'Apple', value: 'Apple' },
    { label: 'Hp', value: 'Hp' }
  ]

  const handleChange = (e: any) => setForm(x => ({ ...x, [e.target.name]: e.target.value }));

  useEffect(() => { console.log('Debounced Value:', debouncedValue) }, [debouncedValue]);

  return (
    <div className="App"
      style={{
        ...theme
      } as React.CSSProperties}
    >
      <div>
        <div className={'app__main'}>
          <Content />
          <Input name='userName'
            label='User Name'
            type='text'
            onChange={handleChange}
            value={form.userName}
            description=''
            helperText='User Name'
            error
          />
          <Select
            name='item'
            label='Select item'
            value={form.item}
            placeholder='Choose'
            items={items}
            onChange={handleChange}
          />
          <Input name='email'
            label='Email'
            onChange={handleChange}
            value={form.email}
            description=''
            required
          />
          <SearchInput
            name='searchTerm'
            value={form.searchTerm}
            onChange={handleChange}
          />
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

export default App;
