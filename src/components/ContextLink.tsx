import React from 'react';

interface ContextLinkProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const ContextLink: React.FC<ContextLinkProps> = ({
  children,
  onClick,
  className = ''
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyPress}
      className={`
        inline
        text-blue-300
        underline decoration-blue-300/40 decoration-dotted underline-offset-2
        hover:text-white hover:decoration-white/80 hover:decoration-solid
        cursor-pointer
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:ring-offset-2 focus:ring-offset-transparent
        ${className}
      `}
      role="button"
      tabIndex={0}
    >
      {children}
    </button>
  );
};
