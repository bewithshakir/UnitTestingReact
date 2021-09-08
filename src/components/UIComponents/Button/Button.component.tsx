import React from 'react';
import { Button as ButtonField } from "@material-ui/core";
import './Button.style.scss';

type ButtonType = '' | 'primary' | 'secondary'
  | 'save' | 'edit' | 'delete' | 'download' | 'cancel'
  | 'accordian' | 'showmore' | 'sortby' | 'listmemu' | 'profile';
type Color = 'inherit' | 'primary' | 'secondary' | 'default';
interface ButtonFieldProps {
  type?: ButtonType;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: Color;
  startIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  onClick: (...args: any[]) => void;
}

export const Button: React.FC<ButtonFieldProps> = ({ type, className = '', color = "default", size, disabled, variant = "contained", startIcon, onClick, children }) => {
  return (
    <ButtonField
      variant={variant}
      color={type ? undefined : color}
      disabled={disabled}
      size={size}
      className={type ? `btn-${type} ${className}` : className}
      onClick={onClick}
      startIcon={startIcon}
    >
      {children}
    </ButtonField>
  )
}