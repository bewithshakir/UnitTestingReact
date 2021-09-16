import React from 'react';
import { Button as ButtonField, ButtonProps } from "@material-ui/core";
import './Button.style.scss';

type ButtonType = '' | 'primary' | 'secondary'
  | 'save' | 'edit' | 'delete' | 'download' | 'cancel'
  | 'accordian' | 'showmore' | 'sortby' | 'listmemu' | 'profile';
interface ButtonFieldProps extends ButtonProps {
  types?: ButtonType;
}

export const Button: React.FC<ButtonFieldProps> = (props) => {
  const { types, className = '', color = "default", variant = "contained", children, ...rest } = props;
  return (
    <ButtonField
      variant={variant}
      color={types ? undefined : color}
      className={types ? `btn-${types} ${className}` : className}
      {...rest}
    >
      {children}
    </ButtonField>
  )
}