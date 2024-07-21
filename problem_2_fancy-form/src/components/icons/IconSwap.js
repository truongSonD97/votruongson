// src/components/IconSwap.js
import React from 'react';
import PropTypes from 'prop-types';

const IconSwap = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    width={24}
    color='#5E6673'
    {...props}
  >
    <path
      d="M7.5 3h3v18.5l-7-7h4V3zM16.5 21h-3V2.5l7 7h-4V21z"
      fill="currentColor"
    ></path>
  </svg>
);

IconSwap.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  viewBox: PropTypes.string,
  xmlns: PropTypes.string,
  color:PropTypes.string,
  className:PropTypes.string
};



export default IconSwap;
