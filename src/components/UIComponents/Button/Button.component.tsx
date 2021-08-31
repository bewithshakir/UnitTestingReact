import React from 'react';
import { Button as ButtonField } from "@material-ui/core";

import './Button.style.scss';

type ButtonType = 'primary' | 'secondary';

interface ButtonFieldProps {
  type: ButtonType;
  disabled?: boolean;
  onClick: (...args: any[]) => void;
}

export const Button: React.FC<ButtonFieldProps> = ({ type, disabled, onClick, children }) => (
  <ButtonField
    variant="contained"
    disabled={disabled}
    className={`btn btn-${type}`}
    style={{}}
    onClick={onClick}
  >
    {children}
  </ButtonField>
)