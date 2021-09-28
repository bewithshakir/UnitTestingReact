import { useState, useEffect, Fragment } from 'react';
import { DropSearchIcon as SearchIcon, Check, ArrowUp, ArrowDown, UnCheck } from '../../../assets/icons';
import './dropdown.scss';

type item = {
  label: string,
  value: string | number
}
interface props {
  name?: string;
  label: string;
  search?: boolean;
  placeholder?: string;
  multiple?: boolean;
  value?: Array<item>;
  width?: number | string;
  items: Array<item>;
  onChange: (...args: any[]) => void;
}

export const Divider = () => <div className='divider'></div>;


export default function Select(props: props) {
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [selectProps, setSelectedProps] = useState({ focusedValue: -1, isFocused: false, isOpen: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const { value } = props;
    value && value.length > 0 && setSelectedValues([...value])
  }, [])

  const onFocus = () => setSelectedProps(x => ({ ...x, isFocused: true }));
  const onClick = () => {
    const { isOpen } = selectProps;
    setSelectedProps(x => ({ ...x, isOpen: !isOpen }));
  }
  const onHoverOption = (e: any) => {
    const { items } = props;
    const { value } = e.currentTarget.dataset;
    const index = items.findIndex(i => i.value === value);
    setSelectedProps(x => ({ ...x, focusedValue: index }));
  }

  const onChange = () => {
    const { name, onChange } = props;
    let obj = {
      target: {
        name: name,
        value: selectedValues
      }
    }
    onChange(obj);
  }

  useEffect(() => onChange(), [selectedValues.length]);

  const onClickOption = (e: any) => {
    const { multiple } = props;
    const { value } = e.currentTarget.dataset;
    const index = searchResults.findIndex(i => i.value === value);
    const index1 = selectedValues.findIndex((s: any) => s.value === value);
    if (multiple) {
      if (index1 === -1) {
        selectedValues.push(searchResults[index])
      } else {
        selectedValues.splice(index1, 1)
      }
      setSelectedValues([...selectedValues]);
    } else {
      setSelectedValues([searchResults[index]]);
      setSelectedProps(x => ({ ...x, isOpen: false }));
    }
  }

  const onBlur = () => {
    const { items, multiple } = props;
    if (multiple) {
      setSelectedProps(x => ({ ...x, isOpen: false, isFocused: false, focusedValue: -1 }));
    } else {
      const value = selectedValues[0]
      let focusedValue = -1
      if (value) {
        focusedValue = items.findIndex(option => option.value === value)
      }
      setSelectedProps(x => ({ ...x, isOpen: false, isFocused: false, focusedValue: focusedValue }));
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const { items, multiple } = props
    const { isOpen } = selectProps;
    let { focusedValue } = selectProps;
    switch (e.key) {     
      case 'Esc':
        if (isOpen) {
          e.preventDefault()
          setSelectedProps(x => ({ ...x, isOpen: false }));
        }
        break
      case 'Tab':
        setSelectedProps(x => ({ ...x, isOpen: !isOpen }));
        break
      case 'Enter':
        setSelectedProps(x => ({ ...x, isOpen: true }));
        break
      case 'ArrowDown':
        e.preventDefault()
        if (focusedValue < items.length - 1) {
          focusedValue++

          if (multiple) {
            setSelectedProps(x => ({ ...x, focusedValue: focusedValue }));
          } else {
            setSelectedValues([items[focusedValue].value]);
            setSelectedProps(x => ({ ...x, focusedValue: focusedValue }));
          }
        }

        break
      case 'ArrowUp':
        e.preventDefault()
        if (focusedValue > 0) {
          focusedValue--

          if (multiple) {
            setSelectedProps(x => ({ ...x, focusedValue: focusedValue }));
          } else {
            setSelectedValues([items[focusedValue].value]);
            setSelectedProps(x => ({ ...x, focusedValue: focusedValue }));
          }
        }
        break
      default:
        e.preventDefault()
        if (isOpen) {
          if (multiple) {
            if (focusedValue !== -1) {
              const value = items[focusedValue].value
              const index = selectedValues.indexOf(value)

              if (index === -1) {
                selectedValues.push(value)
              } else {
                selectedValues.splice(index, 1)
              }
              setSelectedValues([...selectedValues]);
            }
          }
        } else {
          setSelectedProps(x => ({ ...x, isOpen: true }));
        }
        break
    }
  }


  const searchHandler = (searchTerm: string) => {
    const { items } = props;
    if (searchTerm !== '') {
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

  const getSearchTerm = (e: any) => { setSearchTerm(e.target.value); }

  useEffect(() => searchHandler(searchTerm), [searchTerm]);

  const renderSearch = () => {
    const { search } = props;
    return (
      <Fragment>
        {search && (
          <div className='ui search'>
            <div className='ui icon input'>
              <SearchIcon />
              <input
                type='text'
                placeholder='Search'
                className='prompt'
                value={searchTerm}
                onChange={getSearchTerm}
                style={{ paddingLeft: 12 }}
              />
            </div>
          </div>
        )}
      </Fragment>
    )
  }

  const renderValues = () => {
    const { placeholder, multiple } = props;
    const length = selectedValues.length;
    const ablength = length - 1;

    if (selectedValues.length === 0) {
      return (
        <div className="placeholder">
          {placeholder}
        </div>
      )
    }

    if (multiple) {
      return (
        <div className="value">
          {length === 1 && (selectedValues[0].label)}
          {length > 1 && ([selectedValues[0].label, 'and', ablength, 'more'].join(' '))}
        </div>
      )
    }

    return (
      <div className="value">
        {selectedValues[0].label}
      </div>
    )
  }

  const renderOption = (option: any, index: number) => {
    const { multiple } = props;
    const { focusedValue } = selectProps;

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
        id={props.name}
        onClick={onClickOption}
      >
        {multiple ?
          <span className="checkbox">
            {selected ? <Check /> : <UnCheck />}
          </span> :
          null
        }
        {label}
      </div>
    )
  }

  const renderOptions = () => {
    const { search, multiple } = props;
    const { isOpen } = selectProps;
    const length = selectedValues.length;

    if (!isOpen) {
      return null
    }

    return (
      <div className="options">
        {search && (<div className="opt-search">
          {renderSearch()}
          <Divider />
        </div>)}
        <div className="opt-items">
          {multiple && (<div className="selected-items">
            {length > 0 && (selectedValues.map(renderOption))}
            {length > 0 && (<Divider />)}
          </div>)}
          <div className='items'>
            {searchResults.map(renderOption)}
          </div>
        </div>
      </div>
    )
  }


  return (
    <div
      className="select-dropdown"
      style={{ width: props.width }}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink label"><b>{props.label.toUpperCase()}</b></label>
      <div className={selectProps.isOpen ? "selection open" : "selection"} onClick={onClick}>
        {renderValues()}
        <span className="arrow">
          {selectProps.isOpen ? <ArrowUp /> : <ArrowDown />}
        </span>
      </div>
      {renderOptions()}
    </div>
  )

}

Select.defaultProps = {
  search: false,
  id: "select-label",
  multiple: false,
  width: "100%",
}