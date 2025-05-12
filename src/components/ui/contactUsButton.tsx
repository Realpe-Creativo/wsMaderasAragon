import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const ContactUsButton: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
    <button
    {...props}
    className={`
      bg-green-600 hover:bg-green-700 
      text-white font-semibold 
      py-3 px-6 rounded 
      transition-colors duration-200 
      ${className}
    `}
  >
    {children}
  </button>
);

export default ContactUsButton;
