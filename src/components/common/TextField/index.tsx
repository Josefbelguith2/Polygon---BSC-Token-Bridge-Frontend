import React from 'react';
import classes from './textfield.module.scss';

interface TextFieldInterface
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value: string | number;
  type: string;
  title?: string;
  placeholder?: string;
  inputClassName?: string;
  onChange: (a?: any) => any;
}

export default function TextField({
  value,
  type,
  onChange,
  title,
  placeholder,
  inputClassName,
  ...rest
}: TextFieldInterface) {
  return (
    <div className={classes.container}>
      {title && <p className={classes.label}>{title}</p>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
    </div>
  );
}
