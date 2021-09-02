import React from 'react';
import { Button as ButtonField } from "@material-ui/core";
import './Button.style.scss';

type ButtonType = 'primary' | 'secondary' | 'save' | 'edit' | 'delete' | 'download' | 'cancel';

interface ButtonFieldProps {
  type: ButtonType;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  startIcon?: React.ReactNode;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick: (...args: any[]) => void;
}

export const Button: React.FC<ButtonFieldProps> = ({ style, type, disabled, variant = "contained", startIcon, onClick, children }) => {
  return (
    <ButtonField
      variant={variant}
      disabled={disabled}
      className={`btn btn-${type}`}
      onClick={onClick}
      style={{ ...style }}
      startIcon={startIcon}
    >
      {children}
    </ButtonField>
  )
}