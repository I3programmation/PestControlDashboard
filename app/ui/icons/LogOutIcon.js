// components/LogOutIcon.js
import React from 'react';

const LogOutIcon = ({ fill }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Vector"
      d="M2 6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H13C13.5304 4 14.0391 4.21071 14.4142 4.58579C14.7893 4.96086 15 5.46957 15 6V8C15 8.26522 14.8946 8.51957 14.7071 8.70711C14.5196 8.89464 14.2652 9 14 9C13.7348 9 13.4804 8.89464 13.2929 8.70711C13.1054 8.51957 13 8.26522 13 8V6H4V18H13V16C13 15.7348 13.1054 15.4804 13.2929 15.2929C13.4804 15.1054 13.7348 15 14 15C14 15 14 15 14 15C14.2652 15 14.5196 15.1054 14.7071 15.2929C14.8946 15.4804 15 15.7348 15 16V18C15 18.5304 14.7893 19.0391 14.4142 19.4142C14.0391 19.7893 13.5304 20 13 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6ZM17.293 8.293C17.4805 8.10553 17.7348 8.00021 18 8.00021C18.2652 8.00021 18.5195 8.10553 18.707 8.293L21.707 11.293C21.8945 11.4805 21.9998 11.7348 21.9998 12C21.9998 12.2652 21.8945 12.5195 21.707 12.707L18.707 15.707C18.5184 15.8892 18.2658 15.99 18.0036 15.9877C17.7414 15.9854 17.4906 15.8802 17.3052 15.6948C17.1198 15.5094 17.0146 15.2586 17.0123 14.9964C17.01 14.7342 17.1108 14.4816 17.293 14.293L18.586 13H9C8.73478 13 8.48043 12.8946 8.29289 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.29289 11.2929C8.48043 11.1054 8.73478 11 9 11H18.586L17.293 9.707C17.1055 9.51947 17.0002 9.26516 17.0002 9C17.0002 8.73484 17.1055 8.48053 17.293 8.293Z"
      fill={fill || 'currentColor'}
    />
  </svg>
);

export default LogOutIcon;
