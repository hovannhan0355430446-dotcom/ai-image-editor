import React from 'react';

// FIX: Changed to a named export.
export const FlipHorizontalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M12 21V3m0 18l5-5m-5 5l-5-5M3 12h18"
    />
  </svg>
);
