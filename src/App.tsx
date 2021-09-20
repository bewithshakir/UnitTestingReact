import React, { useState } from 'react';
import { useTheme } from './contexts/Theme/Theme.context';
import { Content } from './components/UIComponents/Content/Content.component';
import { Footer } from './components/UIComponents/Footer/Footer.component';
import Input from './components/UIComponents/Input/Input';
import Select from './components/UIComponents/Select/dropdown';
import bg from './assets/images/bg_shapes.svg';

function App() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ userName: '', email: '', item: '' });
  const items = [
    { label: 'Amazon', value: 'Amazon' },
    { label: 'Nike', value: 'Nike' },
    { label: 'Flipkart', value: 'Flipkart' },
    { label: 'Apple', value: 'Apple' },
    { label: 'Hp', value: 'Hp' }
  ]

  const handleChange = (e: any) => setForm(x => ({ ...x, [e.target.name]: e.target.value }));

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
          <Footer />
        </div>
        <div className={'app__bg'}>
          <img src={bg} alt={'bg'} />
        </div>
      </div>
    </div>
  )
}


export default App;