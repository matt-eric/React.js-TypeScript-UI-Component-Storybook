import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: () => void;
  rounded?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, onClick, rounded, variant = 'contained', ...props }, ref) => {
    // TODO: This value is temporary and will be replaced when the theme is implemented.
    const color: string = 'green';

    const classes: {
      contained: string;
      outlined: string;
      text: string;
    } = {
      contained: `bg-${color}-500 hover:brightness-90 shadow-md hover:shadow-xl`,
      outlined: `border border-${color}-500 hover:bg-${color}-100`,
      text: `hover:bg-${color}-100`,
    };

    return (
      <button
        className={`${classes[variant]} rounded${
          rounded && '-full h-8 w-8'
        } p-2 transition ease-in-out duration-300 filter cursor-pointer flex justify-center items-center select-none`}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);