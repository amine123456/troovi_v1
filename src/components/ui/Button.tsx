import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'default', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'hover:bg-gray-100'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ 
  variant = 'default', 
  className = '', 
  children, 
  ...props 
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-200 text-gray-800'
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors
        ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default { Button, Badge };