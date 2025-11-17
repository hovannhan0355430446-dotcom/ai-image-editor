import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: React.ReactNode;
  active?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ children, label, className, active, ...props }) => {
  return (
    <button
      aria-label={label}
      title={label}
      className={`flex items-center justify-center p-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${active ? 'bg-primary text-white' : 'bg-gray-700 text-text-secondary hover:bg-gray-600 hover:text-text-primary'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;