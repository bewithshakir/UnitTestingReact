import React from 'react';
import { Button as ButtonField } from "@material-ui/core";
import './Button.style.scss';

type ButtonType = 'primary' | 'secondary' | 'save' | 'edit' | 'delete' | 'download' | 'cancel';

interface ButtonFieldProps {
  type: ButtonType;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  startIcon?: React.ReactNode;
  onClick: (...args: any[]) => void;
}

export const Button: React.FC<ButtonFieldProps> = ({ type, disabled, variant = "contained", startIcon, onClick, children }) => (
  <ButtonField
    variant={variant}
    disabled={disabled}
    className={`btn btn-${type}`}
    style={{}}
    onClick={onClick}
    startIcon={startIcon}
  >
    {children}
  </ButtonField>
)