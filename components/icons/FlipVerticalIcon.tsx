import React from 'react';

// FIX: Changed to a named export.
export const FlipVerticalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12H3m18 0l-5-5m5 5l-5 5M12 3v18"
    />
  </svg>
);
