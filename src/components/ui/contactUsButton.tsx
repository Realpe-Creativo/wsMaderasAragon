import React from 'react';

type ContactUsButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children: React.ReactNode;
};

const ContactUsButton: React.FC<ContactUsButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <a
    href="https://wa.me/573125085185"
    target="_blank"
    rel="noopener noreferrer"
    className={`
      bg-green-600 hover:bg-green-700 
      text-white font-semibold 
      py-3 px-6 rounded 
      transition-colors duration-200 
      ${className}
    `}
    {...props}
  >
    {children}
  </a>
);

export default ContactUsButton;
