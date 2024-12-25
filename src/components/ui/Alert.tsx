import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'warning' | 'info';
  children: React.ReactNode;
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Alert({ 
  variant = 'default', 
  className = '', 
  children, 
  ...props 
}: AlertProps) {
  const variantStyles = {
    default: 'bg-gray-50 text-gray-900 border-gray-200',
    destructive: 'bg-red-50 text-red-900 border-red-200',
    warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    info: 'bg-blue-50 text-blue-900 border-blue-200'
  };

  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ 
  className = '', 
  children, 
  ...props 
}: AlertDescriptionProps) {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
}

export function AlertDescription({ 
  className = '', 
  children, 
  ...props 
}: AlertDescriptionProps) {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Alert;