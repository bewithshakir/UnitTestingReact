import React from 'react';
import { Button as ButtonField, ButtonProps } from "@material-ui/core";
import './Button.style.scss';

type ButtonType = '' | 'primary' | 'secondary' | 'filter'
  | 'save' | 'edit' | 'delete' | 'delete2' | 'download' | 'cancel'
  | 'accordian' | 'showmore' | 'sortby' | 'listmemu' | 'profile' | 'grid-action';
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
  );
};