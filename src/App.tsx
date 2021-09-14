import React, { useState } from 'react';
import { useTheme } from './contexts/Theme/Theme.context';
import { Content } from './components/UIComponents/Content/Content.component';
import { Footer } from './components/UIComponents/Footer/Footer.component';
import Input  from './components/UIComponents/Input/Input';
import Select from './components/UIComponents/Select/dropdown';
import bg from './assets/images/bg_shapes.svg';

function App() {
  const { theme } = useTheme();
  const [ form, setForm ] = useState({userName:'', email: '', item:'' });
  const items = [
                  {label:'xyxyz', value:'xyxyz'},
                  {label:'xyzxz', value:'xyzyz'},
                  {label:'xzyzx', value:'xzyzx'},
                  {label:'xzxzx', value:'xzxzx'},
                  {label:'xyxyx', value:'xyxyx'},
                  {label:'yzxyz', value:'yzxyz'},
                ];

 console.log(form);               

 const handleChange = (e:any) => setForm( x => ({...x, [e.target.name]: e.target.value}));

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
        label= 'User Name'
        onChange={handleChange}
        value={form.userName}
        description=''
        error
       />
       <Select
        name='item'
        label='Select item'
        value={form.item}
        //singleSelectWithCheckboxes={true}
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