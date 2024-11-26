"use client";

import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 