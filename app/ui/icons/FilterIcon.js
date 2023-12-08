import React from 'react';

const FilterIcon = ({ size, color }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 59 60" fill="white"  xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="48.75" height="50" rx="5" fill={color} />
      <rect x="5.5" y="5.5" width="47.75" height="49" rx="4.5" stroke="#EFEFEF" strokeOpacity="0.5" />
      <rect x="13.75" y="23.75" width="31.25" height="1.875" fill="black" />
      <circle cx="24.375" cy="24.375" r="4.875" fill="white" stroke="black" strokeWidth="1.5" />
      <rect x="13.75" y="35" width="31.25" height="1.875" fill="black" />
      <circle cx="34.375" cy="35.625" r="4.875" fill="white" stroke="black" strokeWidth="1.5" />
    </svg>
  );
};

export default FilterIcon;
