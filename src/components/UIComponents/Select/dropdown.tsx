import React, { useState, useEffect, Fragment } from 'react';
import './dropdown.scss';

interface props {
  name?: string;
  label: string;
  id?: string;
  search?: boolean;
  placeholder?: string;
  multiple?: boolean;
  value?: string | number;
  width?: number;
  items: Array<any>;
  onChange?: (...args: any[]) => void;
}

export default  function Select (props: props) {
  const [ selectedValues, setSelectedValues ] = useState<any>([]);
  const [selectProps, setSelectedProps] = useState({focusedValue: -1, isFocused: false, isOpen: false});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const onFocus = () => setSelectedProps(x => ({ ...x, isFocused: true }));
  const onClick = () => {
    const { isOpen } = selectProps;
    setSelectedProps(x => ({ ...x, isOpen: !isOpen}));
  }
  const onHoverOption = (e: any) => {
    const { items } = props;
    const { value } = e.currentTarget.dataset;
    const index = items.findIndex(i => i.value === value);
    setSelectedProps(x => ({ ...x, focusedValue: index }));
  }

  const stopPropagation = (e: any) => e.stopPropagation();

  const onClickOption = (e: any) => {
    const { multiple, items } = props;
    const { value } = e.currentTarget.dataset;
    const index = searchResults.findIndex(i => i.value === value);
    if(!multiple){
      setSelectedValues([searchResults[index]]);
      setSelectedProps(x => ({ ...x, isOpen: false }));
    }
    const index1 = selectedValues.findIndex((s:any) => s.value === value);
    if (index1 === -1) {
      selectedValues.push(searchResults[index])
    } else {
      selectedValues.splice(index1, 1)
    }
    setSelectedValues([...selectedValues]);
  }

  const searchHandler = (searchTerm:string) => {
    const { items } = props;
    if (searchTerm !== ''){
      const newOptionList = items.filter((items) => {
        return Object.values(items)
        .join('')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newOptionList);
    } else {
      setSearchResults(items);
    }
  }

  const getSearchTerm = (e:any) => {setSearchTerm(e.target.value);}

  useEffect(()=> {searchHandler(searchTerm)}, [searchTerm])


  const renderSearch = () => {
    const { search } = props;
    return(
    <Fragment> 
    {search && (   
    <div className='ui search'>
      <div className='ui icon input'>
        <SearchIcon/>
        <input
            type='text'
            placeholder='Search'
            className='prompt'
            value={searchTerm}
            onChange={getSearchTerm}
            style={{paddingLeft:12}}
            />
      </div>
    </div>
    )}
    </Fragment>
    )
  }

  const renderValues = () => {
    const { placeholder, multiple } = props;

    if (selectedValues.length === 0) {
      return (
        <div className="placeholder">
          {placeholder}
        </div>
      )
    }

    if (multiple) {
      return selectedValues.map((x:any) => {
        return (
          <span
            key={x.value}
            onClick={stopPropagation}
            className="multiple value"
          >
            {x.label}
            <span
              data-value={x.value}
              //onClick={onDeleteOption}
              className="delete"
            >
              <X />
            </span>
          </span>
        )
      })
    }

    return (
      <div className="value">
        {selectedValues[0].label}
      </div>
    )
  }

 const renderOption = (option: any , index:number) => {
    const { multiple } = props;
    const {  focusedValue } = selectProps;

    const { value, label } = option;

   const selected = selectedValues.includes(option);

    let className = "option"
    if (selected) className += " selected"
    if (index === focusedValue) className += " focused"

    return (
      <div
        key={value}
        data-value={value}
        className={className}
        onMouseOver={onHoverOption}
        onClick={onClickOption}
      >
        {multiple ?
          <span className="checkbox">
            {selected ? <Check /> : null}
          </span> :
          null
        }
        {label}
      </div>
    )
  }

  const renderOptions = () => {
    const { isOpen } = selectProps;

    if (!isOpen) {
      return null
    }

    return (
      <div className="options">
        {renderSearch()}
        {searchResults.map(renderOption)}
      </div>
    )
  }

  
  return (
    <div
      className="select"
      onFocus={onFocus}
    >
      <label className="label">{props.label}</label>
      <div className="selection" onClick={onClick}>
        {renderValues()}
        <span className="arrow">
          {selectProps.isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      {renderOptions()}
    </div>
  )
  
}


const ChevronDown = () => (
  <svg viewBox="0 0 10 7">
    <path d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z" transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-6.000000, -3.207107) " />
  </svg>
)

const ChevronUp = () => (
  <svg viewBox="0 0 10 8">
    <path d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z" transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-3.000000, -4.000000) " />
  </svg>
)

const X = () => (
  <svg viewBox="0 0 16 16">
    <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
  </svg>
)

const Check = () => (
  <svg viewBox="0 0 16 16">
    <path d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z" transform="translate(0 1)" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox='0 0 21 21'>
    <path d="M33.52,33.52a7.182,7.182,0,1,1,0-10.162,7.139,7.139,0,0,1,0,10.162m6.3,5.406-4.983-4.983a8.463,8.463,0,1,0-.89.89l4.983,4.983a.629.629,0,0,0,.89-.89" transform="translate(-20 -20)" />
  </svg>
)
Select.defaultProps = {
  search: true,
  id: "select-label",
  multiple: true,
}