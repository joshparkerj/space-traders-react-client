import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Client from './Client';
import reportWebVitals from './reportWebVitals';

const appElement = React.createElement(Client, { key: 'client' });
const strictModeElement = React.createElement(React.StrictMode, {}, appElement);

ReactDOM.render(
  strictModeElement,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
